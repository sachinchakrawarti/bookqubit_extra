#!/usr/bin/env node

/**
 * Main Engine Entry Point
 */

const chalk = require('chalk');
const config = require('./config');
const logger = require('./utils/logger');

console.log(chalk.bold.cyan('\n⚙️  BookQbit Database Engine\n'));

module.exports = {
  version: require('./package.json').version,
  config,
  logger,
  core: require('./core'),
  utils: require('./utils'),
  commands: require('./commands'),
  generators: require('./generators'),
  errors: require('./errors')
};

// Run CLI if executed directly
if (require.main === module) {
  require('./cli');
}