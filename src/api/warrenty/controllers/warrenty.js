'use strict';

/**
 * warrenty controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::warrenty.warrenty', ({ strapi }) => ({
  async create(ctx) {
    try {
      const { SerialNumber, ...otherData } = ctx.request.body.data;

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

      // Create the warranty record using the default create method
      const response = await super.create(ctx);

      return response;
    } catch (err) {
      console.error('Error creating warranty:', err);
      ctx.throw(500, err);
    }
  }
}));
