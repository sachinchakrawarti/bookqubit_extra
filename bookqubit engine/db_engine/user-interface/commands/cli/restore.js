/**
 * Restore Command
 * Restores database from backup
 */

const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs-extra');
const path = require('path');
const config = require('../config');
const logger = require('../utils/logger');
const Database = require('../core/database');

async function restoreCommand(options) {
  const spinner = ora('Restoring database...').start();
  
  try {
    const { file, latest = false } = options;
    let backupPath = file;
    
    if (latest) {
      // Find latest backup
      const backupDir = path.join(config.paths.backups, 'manual');
      const backups = await fs.readdir(backupDir);
      const dbFiles = backups.filter(f => f.endsWith('.db'));
      
      if (dbFiles.length === 0) {
        throw new Error('No backups found');
      }
      
      // Sort by date (newest first)
      dbFiles.sort((a, b) => {
        return fs.statSync(path.join(backupDir, b)).mtime - 
               fs.statSync(path.join(backupDir, a)).mtime;
      });
      
      backupPath = path.join(backupDir, dbFiles[0]);
    }
    
    if (!backupPath || !await fs.pathExists(backupPath)) {
      throw new Error(`Backup file not found: ${backupPath}`);
    }
    
    // Restore database
    await Database.restore(backupPath);
    
    spinner.succeed(chalk.green(`✅ Database restored from: ${backupPath}`));
    
  } catch (error) {
    spinner.fail(chalk.red(`❌ Restore failed: ${error.message}`));
    logger.error('Restore failed:', error);
    throw error;
  }
}

module.exports = restoreCommand;