/**
 * Doctor Command
 * Checks database health
 */

const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs-extra');
const config = require('../config');
const logger = require('../utils/logger');
const Database = require('../core/database');

async function doctorCommand(options) {
  const spinner = ora('Checking database health...').start();
  
  try {
    const { fix = false } = options;
    const issues = [];
    const fixes = [];
    
    // Check 1: Database file exists
    const dbPath = config.database.connection.filename;
    if (!await fs.pathExists(dbPath)) {
      issues.push('Database file does not exist');
      if (fix) {
        await fs.ensureFile(dbPath);
        fixes.push('Created missing database file');
      }
    }
    
    // Check 2: Database connection
    try {
      await Database.connect();
      const tables = await Database.getTables();
      spinner.text = `Connected - ${tables.length} tables found`;
      
      // Check 3: Required tables exist
      const requiredTables = ['sqlite_master'];
      for (const table of requiredTables) {
        if (!tables.includes(table)) {
          issues.push(`Required table missing: ${table}`);
        }
      }
      
      await Database.disconnect();
    } catch (error) {
      issues.push(`Connection failed: ${error.message}`);
    }
    
    // Check 4: Directory permissions
    const dirs = ['backups', 'database', 'logs', 'cache'];
    for (const dir of dirs) {
      const dirPath = config.paths[dir] || path.join(config.paths.root, dir);
      if (await fs.pathExists(dirPath)) {
        try {
          await fs.access(dirPath, fs.constants.W_OK);
        } catch {
          issues.push(`No write permission: ${dir}`);
        }
      } else {
        if (fix) {
          await fs.ensureDir(dirPath);
          fixes.push(`Created missing directory: ${dir}`);
        }
        issues.push(`Directory missing: ${dir}`);
      }
    }
    
    spinner.stop();
    
    // Print report
    console.log(chalk.bold.cyan('\n📊 Health Report\n'));
    console.log(chalk.gray('═'.repeat(50)));
    
    if (issues.length === 0) {
      console.log(chalk.green('✅ All checks passed!'));
    } else {
      console.log(chalk.yellow(`⚠️  ${issues.length} issues found:\n`));
      issues.forEach((issue, i) => {
        console.log(chalk.yellow(`  ${i + 1}. ${issue}`));
      });
    }
    
    if (fixes.length > 0) {
      console.log(chalk.green(`\n✅ Fixed ${fixes.length} issues:\n`));
      fixes.forEach((fix, i) => {
        console.log(chalk.green(`  ${i + 1}. ${fix}`));
      });
    }
    
    console.log(chalk.gray('\n' + '═'.repeat(50) + '\n'));
    
    return { issues, fixes };
    
  } catch (error) {
    spinner.fail(chalk.red(`❌ Doctor check failed: ${error.message}`));
    logger.error('Doctor check failed:', error);
    throw error;
  }
}

module.exports = doctorCommand;