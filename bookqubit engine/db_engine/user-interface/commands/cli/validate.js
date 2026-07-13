/**
 * Validate Command
 * Validates database schema
 */

const chalk = require('chalk');
const ora = require('ora');
const config = require('../config');
const logger = require('../utils/logger');
const Database = require('../core/database');
const Schema = require('../core/schema');

async function validateCommand(options) {
  const spinner = ora('Validating schemas...').start();
  
  try {
    const { schema, all = false, fix = false } = options;
    
    await Database.connect();
    
    const results = [];
    
    if (schema) {
      // Validate specific schema
      const result = await Schema.validate(schema, { fix });
      results.push(result);
    } else if (all) {
      // Validate all schemas
      const schemas = Object.values(config.schemas).flat();
      for (const schemaName of schemas) {
        const result = await Schema.validate(schemaName, { fix });
        results.push(result);
        spinner.text = `Validated: ${schemaName}`;
      }
    } else {
      // Validate core schemas
      const coreSchemas = config.schemas['01_core'] || [];
      for (const schemaName of coreSchemas) {
        const result = await Schema.validate(schemaName, { fix });
        results.push(result);
        spinner.text = `Validated: ${schemaName}`;
      }
    }
    
    await Database.disconnect();
    
    spinner.stop();
    
    // Print results
    console.log(chalk.bold.cyan('\n📊 Validation Report\n'));
    console.log(chalk.gray('═'.repeat(60)));
    
    let totalErrors = 0;
    let totalWarnings = 0;
    
    for (const result of results) {
      const status = result.errors.length === 0 ? chalk.green('✅') : chalk.red('❌');
      console.log(`${status} ${result.schema}`);
      
      if (result.errors.length > 0) {
        result.errors.forEach(err => {
          console.log(chalk.red(`  ✖ ${err}`));
          totalErrors++;
        });
      }
      
      if (result.warnings && result.warnings.length > 0) {
        result.warnings.forEach(warn => {
          console.log(chalk.yellow(`  ⚠ ${warn}`));
          totalWarnings++;
        });
      }
    }
    
    console.log(chalk.gray('\n' + '═'.repeat(60)));
    console.log(chalk.cyan(`\n📊 Summary: ${results.length} schemas`));
    console.log(chalk.red(`  ✖ ${totalErrors} errors`));
    console.log(chalk.yellow(`  ⚠ ${totalWarnings} warnings`));
    console.log();
    
    return { results, totalErrors, totalWarnings };
    
  } catch (error) {
    spinner.fail(chalk.red(`❌ Validation failed: ${error.message}`));
    logger.error('Validation failed:', error);
    throw error;
  }
}

module.exports = validateCommand;