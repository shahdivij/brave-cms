'use strict';

/**
 * warrenty controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::warrenty.warrenty', ({ strapi }) => ({
  async create(ctx) {
    try {
      // Handle both JSON and multipart/form-data requests
      let requestData;
      
      if (ctx.request.body.data) {
        // If data is a string (from form-data), parse it
        requestData = typeof ctx.request.body.data === 'string' 
          ? JSON.parse(ctx.request.body.data) 
          : ctx.request.body.data;
      } else {
        // If no data wrapper, use body directly
        requestData = ctx.request.body;
      }

      const { SerialNumber } = requestData;

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

      // Handle file upload if present
      let uploadedFileId = null;
      if (ctx.request.files && ctx.request.files['files.Invoice']) {
        const file = ctx.request.files['files.Invoice'];
        
        // Upload the file using Strapi's upload service
        const uploadedFiles = await strapi.plugins.upload.services.upload.upload({
          data: {},
          files: file,
        });
        
        if (uploadedFiles && uploadedFiles.length > 0) {
          uploadedFileId = uploadedFiles[0].id;
        }
      }

      // Prepare data for creation
      const dataToCreate = {
        ...requestData
      };

      // Add the uploaded file ID if file was uploaded
      if (uploadedFileId) {
        dataToCreate.Invoice = uploadedFileId;
      }

      // Update ctx.request.body.data with the file ID
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
