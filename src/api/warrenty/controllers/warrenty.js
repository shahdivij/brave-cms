'use strict';

/**
 * warrenty controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::warrenty.warrenty', ({ strapi }) => ({
  async create(ctx) {
    try {
      // Get data from request body
      const requestData = ctx.request.body.data || ctx.request.body;
      const { SerialNumber, Invoice, ...otherData } = requestData;

      // Validate that SerialNumber is provided
      if (!SerialNumber) {
        return ctx.badRequest('SerialNumber is required');
      }

      // Check if the SerialNumber exists in the serial-numbers collection
      const serialNumberExists = await strapi.documents('api::serial-number.serial-number').findMany({
        filters: { serial_number: SerialNumber }
      });

      if (!serialNumberExists || serialNumberExists.length === 0) {
        return ctx.send({
          error: {
            status: 410,
            name: 'GoneError',
            message: 'Invalid SerialNumber. The serial number does not exist in our records.',
            code: 'INVALID_SERIAL_NUMBER'
          }
        }, 410);
      }

      // Check if warranty already exists for this serial number
      const existingWarranty = await strapi.documents('api::warrenty.warrenty').findMany({
        filters: { SerialNumber: SerialNumber }
      });

      if (existingWarranty && existingWarranty.length > 0) {
        return ctx.send({
          error: {
            status: 409,
            name: 'ConflictError',
            message: 'A warranty already exists for this serial number.',
            code: 'WARRANTY_ALREADY_EXISTS'
          }
        }, 409);
      }

      // Handle Invoice URL - download and save to server
      let uploadedFileId = null;
      if (Invoice && typeof Invoice === 'string' && Invoice.startsWith('http')) {
        try {
          const fs = require('fs');
          const path = require('path');
          const crypto = require('crypto');
          
          // Download the file from the URL
          const response = await fetch(Invoice);
          if (!response.ok) {
            throw new Error(`Failed to download file: ${response.statusText}`);
          }
          
          const arrayBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          
          // Get content type and extension
          const contentType = response.headers.get('content-type') || 'image/jpeg';
          const ext = contentType.split('/')[1] || 'jpg';
          
          // Generate unique filename
          const hash = crypto.randomBytes(16).toString('hex');
          const fileName = `invoice_${hash}.${ext}`;
          
          // Save to public/uploads folder
          const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }
          
          const filePath = path.join(uploadsDir, fileName);
          fs.writeFileSync(filePath, buffer);
          
          // Create file entry in database
          const fileEntry = await strapi.query('plugin::upload.file').create({
            data: {
              name: fileName,
              alternativeText: 'Invoice',
              caption: 'Invoice',
              width: null,
              height: null,
              formats: null,
              hash: hash,
              ext: `.${ext}`,
              mime: contentType,
              size: (buffer.length / 1024).toFixed(2),
              url: `/uploads/${fileName}`,
              previewUrl: null,
              provider: 'local',
              provider_metadata: null,
            },
          });
          
          uploadedFileId = fileEntry.id;
          
        } catch (uploadError) {
          return ctx.badRequest(`Failed to process invoice file: ${uploadError.message}`);
        }
      }

      // Prepare data for creation
      const dataToCreate = {
        SerialNumber,
        ...otherData
      };

      // Add the uploaded file ID if file was uploaded
      if (uploadedFileId) {
        dataToCreate.Invoice = uploadedFileId;
      }

      // Update ctx.request.body.data
      ctx.request.body.data = dataToCreate;

      // Create the warranty record using the default create method
      const response = await super.create(ctx);

      return response;
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}));
