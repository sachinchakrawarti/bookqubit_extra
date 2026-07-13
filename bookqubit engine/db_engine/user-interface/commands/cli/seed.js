/**
 * Seed Command
 * Seeds database with data
 */

const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs-extra');
const path = require('path');
const config = require('../config');
const logger = require('../utils/logger');
const Database = require('../core/database');

async function seedCommand(options) {
  const spinner = ora('Seeding database...').start();
  
  try {
    const { schema, all = false, file } = options;
    
    await Database.connect();
    
    if (file) {
      // Seed from specific file
      const seedData = await fs.readJson(file);
      await Database.seed(seedData);
      spinner.text = `Seeded from: ${file}`;
    } else if (schema) {
      // Seed specific schema
      await Database.seedSchema(schema);
      spinner.text = `Seeded: ${schema}`;
    } else if (all) {
      // Seed all schemas
      const schemas = Object.values(config.schemas).flat();
      for (const schemaName of schemas) {
        await Database.seedSchema(schemaName);
        spinner.text = `Seeded: ${schemaName}`;
      }
    } else {
      // Seed core schemas
      const coreSchemas = config.schemas['01_core'] || [];
      for (const schemaName of coreSchemas) {
        await Database.seedSchema(schemaName);
        spinner.text = `Seeded: ${schemaName}`;
      }
    }
    
    await Database.disconnect();
    
    spinner.succeed(chalk.green('✅ Database seeded successfully!'));
    
  } catch (error) {
    spinner.fail(chalk.red(`❌ Seeding failed: ${error.message}`));
    logger.error('Seeding failed:', error);
    throw error;
  }
}

module.exports = seedCommand;