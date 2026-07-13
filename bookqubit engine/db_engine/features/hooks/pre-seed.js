/**
 * Pre-Seed Hook
 */

const logger = require('../utils/logger');

async function preSeed(context) {
  logger.info('Pre-seed hook started');
  
  // Validate seed data
  // Backup database
  // Clean existing data
  
  logger.info('Pre-seed hook completed');
  return context;
}

module.exports = preSeed;