/**
 * Generate Command
 * Generates database schemas
 */

const chalk = require('chalk');
const ora = require('ora');
const config = require('../config');
const logger = require('../utils/logger');
const Schema = require('../core/schema');

async function generateCommand(options) {
  const spinner = ora('Generating schemas...').start();
  
  try {
    const { schema, all = false, dryRun = false, overwrite = false } = options;
    
    if (dryRun) {
      spinner.warn(chalk.yellow('Dry run mode - no files created'));
      console.log(chalk.gray('\nSchemas that would be generated:'));
      
      if (schema) {
        console.log(chalk.gray(`  - ${schema}`));
      } else if (all) {
        for (const [category, schemas] of Object.entries(config.schemas)) {
          console.log(chalk.gray(`  ${category}:`));
          schemas.forEach(s => console.log(chalk.gray(`    - ${s}`)));
        }
      }
      return;
    }
    
    if (schema) {
      // Generate specific schema
      await Schema.create(schema, { overwrite });
      spinner.text = `Generated: ${schema}`;
    } else if (all) {
      // Generate all schemas
      let count = 0;
      for (const [category, schemas] of Object.entries(config.schemas)) {
        for (const schemaName of schemas) {
          await Schema.create(schemaName, { overwrite });
          spinner.text = `Generated: ${schemaName} (${++count}/${Object.values(config.schemas).flat().length})`;
        }
      }
    } else {
      // Generate core schemas only
      const coreSchemas = config.schemas['01_core'] || [];
      for (const schemaName of coreSchemas) {
        await Schema.create(schemaName, { overwrite });
        spinner.text = `Generated: ${schemaName}`;
      }
    }
    
    spinner.succeed(chalk.green('✅ Schemas generated successfully!'));
    
  } catch (error) {
    spinner.fail(chalk.red(`❌ Generation failed: ${error.message}`));
    logger.error('Generation failed:', error);
    throw error;
  }
}

module.exports = generateCommand;