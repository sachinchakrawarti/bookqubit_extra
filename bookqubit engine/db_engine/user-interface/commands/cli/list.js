/**
 * List Command
 * Lists all schemas
 */

const chalk = require('chalk');
const config = require('../config');
const logger = require('../utils/logger');

async function listCommand(options) {
  try {
    const { category, details = false } = options;
    
    console.log(chalk.bold.cyan('\n📊 Available Schemas\n'));
    console.log(chalk.gray('═'.repeat(60)));
    
    let total = 0;
    const schemas = config.schemas;
    
    for (const [cat, schemaList] of Object.entries(schemas)) {
      if (category && cat !== category) continue;
      
      console.log(chalk.bold.yellow(`\n${cat}/`));
      
      for (const schema of schemaList) {
        total++;
        console.log(chalk.green(`  ├── ${schema}`));
        
        if (details) {
          const schemaPath = Schema.getSchemaPath(schema);
          console.log(chalk.gray(`  │   └── ${schemaPath}`));
        }
      }
    }
    
    console.log(chalk.gray('\n' + '═'.repeat(60)));
    console.log(chalk.cyan(`\n📊 Total: ${total} schemas\n`));
    
    return { total, schemas };
    
  } catch (error) {
    console.error(chalk.red(`❌ List failed: ${error.message}`));
    logger.error('List failed:', error);
    throw error;
  }
}

module.exports = listCommand;