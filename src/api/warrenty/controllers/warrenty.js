'use strict';

/**
 * warrenty controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::warrenty.warrenty', ({ strapi }) => ({
  async create(ctx) {
    try {
      // Log the entire request for debugging
      console.log('=== WARRANTY CREATE REQUEST ===');
      console.log('ctx.request.body:', JSON.stringify(ctx.request.body, null, 2));
      console.log('ctx.request.files:', ctx.request.files);
      console.log('ctx.request.body.data:', ctx.request.body.data);
      
      // Get data from request body
      const requestData = ctx.request.body.data || ctx.request.body;
      const { SerialNumber, InvoiceBase64, InvoiceFileName, InvoiceMimeType, ...otherData } = requestData;
      
      console.log('Extracted SerialNumber:', SerialNumber);
      console.log('Extracted InvoiceBase64 (first 100 chars):', InvoiceBase64 ? InvoiceBase64.substring(0, 100) : 'null');
      console.log('Extracted InvoiceFileName:', InvoiceFileName);
      console.log('Extracted InvoiceMimeType:', InvoiceMimeType);

      // Validate that SerialNumber is provided
      if (!SerialNumber) {
        return ctx.badRequest('SerialNumber is required');
      }

      // Check if the SerialNumber exists in the serial-numbers collection
      const serialNumberExists = await strapi.documents('api::serial-number.serial-number').findMany({
        filters: { serial_number: SerialNumber }
      });

      if (!serialNumberExists || serialNumberExists.length === 0) {
        return ctx.badRequest('Invalid SerialNumber. The serial number does not exist in our records.');
      }

      // Check if warranty already exists for this serial number
      const existingWarranty = await strapi.documents('api::warrenty.warrenty').findMany({
        filters: { SerialNumber: SerialNumber }
      });

      if (existingWarranty && existingWarranty.length > 0) {
        return ctx.badRequest('A warranty already exists for this serial number.');
      }

      // Handle base64 file upload if provided
      let uploadedFileId = null;
      if (InvoiceBase64) {
        try {
          // Remove data URL prefix if present (e.g., "data:image/jpeg;base64,")
          const base64Data = InvoiceBase64.replace(/^data:([A-Za-z-+\/]+);base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');
          
          // Create a file object
          const fileName = InvoiceFileName || `invoice_${Date.now()}.jpg`;
          const mimeType = InvoiceMimeType || 'image/jpeg';
          
          // Upload the file using Strapi's upload service
          const uploadedFiles = await strapi.plugins.upload.services.upload.uploadFileAndPersist({
            name: fileName,
            type: mimeType,
            size: buffer.length,
            buffer: buffer,
          });
          
          if (uploadedFiles) {
            uploadedFileId = uploadedFiles.id;
          }
        } catch (uploadError) {
          console.error('Error uploading base64 file:', uploadError);
          return ctx.badRequest('Failed to upload invoice file');
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
      console.error('Error creating warranty:', err);
      ctx.throw(500, err);
    }
  }
}));
