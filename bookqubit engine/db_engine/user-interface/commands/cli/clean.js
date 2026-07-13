/**
 * Clean Command
 * Cleans project artifacts
 */

const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs-extra');
const path = require('path');
const config = require('../config');
const logger = require('../utils/logger');

async function cleanCommand(options) {
  const spinner = ora('Cleaning project...').start();
  
  try {
    const { dryRun = false, all = false } = options;
    
    const cleanPaths = [
      'engine/logs',
      'engine/cache',
      'database/*.db',
      'database/*.db-shm',
      'database/*.db-wal'
    ];
    
    if (all) {
      cleanPaths.push(
        'backups/*',
        'node_modules',
        'package-lock.json'
      );
    }
    
    if (dryRun) {
      spinner.warn(chalk.yellow('Dry run mode - no files deleted'));
      console.log(chalk.gray('\nFiles that would be deleted:'));
      cleanPaths.forEach(p => console.log(chalk.gray(`  - ${p}`)));
      return;
    }
    
    // Clean each path
    for (const cleanPath of cleanPaths) {
      const fullPath = path.join(config.paths.root, cleanPath);
      if (await fs.pathExists(fullPath)) {
        await fs.remove(fullPath);
        spinner.text = `Cleaned: ${cleanPath}`;
      }
    }
    
    spinner.succeed(chalk.green('✅ Project cleaned successfully!'));
    
  } catch (error) {
    spinner.fail(chalk.red(`❌ Clean failed: ${error.message}`));
    logger.error('Clean failed:', error);
    throw error;
  }
}

module.exports = cleanCommand;