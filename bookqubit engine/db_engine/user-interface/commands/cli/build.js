/**
 * Build Command
 * Builds the database schema
 */

const chalk = require('chalk');
const ora = require('ora');
const config = require('../config');
const logger = require('../utils/logger');
const Database = require('../core/database');
const Schema = require('../core/schema');

async function buildCommand(options) {
  const spinner = ora('Building database...').start();
  
  try {
    const { env = 'development', schema, all = false } = options;
    
    // Set environment
    process.env.NODE_ENV = env;
    
    // Connect to database
    await Database.connect();
    
    if (schema) {
      // Build specific schema
      spinner.text = `Building schema: ${schema}`;
      await Schema.build(schema);
    } else if (all) {
      // Build all schemas
      spinner.text = 'Building all schemas...';
      const schemas = config.schemas;
      for (const [category, schemaList] of Object.entries(schemas)) {
        for (const schemaName of schemaList) {
          spinner.text = `Building: ${schemaName}`;
          await Schema.build(schemaName);
        }
      }
    } else {
      // Build default - all core schemas
      spinner.text = 'Building core schemas...';
      const coreSchemas = config.schemas['01_core'] || [];
      for (const schemaName of coreSchemas) {
        spinner.text = `Building: ${schemaName}`;
        await Schema.build(schemaName);
      }
    }
    
    spinner.succeed(chalk.green('✅ Database built successfully!'));
    
    // Disconnect
    await Database.disconnect();
    
  } catch (error) {
    spinner.fail(chalk.red(`❌ Build failed: ${error.message}`));
    logger.error('Build failed:', error);
    throw error;
  }
}

module.exports = buildCommand;