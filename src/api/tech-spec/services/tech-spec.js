'use strict';

/**
 * tech-spec service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tech-spec.tech-spec');
