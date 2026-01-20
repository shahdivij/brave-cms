'use strict';

/**
 * pc-mode service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pc-mode.pc-mode');
