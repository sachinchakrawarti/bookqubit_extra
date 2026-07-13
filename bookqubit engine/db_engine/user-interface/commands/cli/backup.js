/**
 * Backup Command
 * Creates database backup
 */

const chalk = require('chalk');
const ora = require('ora');
const path = require('path');
const fs = require('fs-extra');
const dayjs = require('dayjs');
const config = require('../config');
const logger = require('../utils/logger');

async function backupCommand(options) {
  const spinner = ora('Creating database backup...').start();

  try {
    const { type = 'full', name, destination } = options;
    
    // Generate backup name
    const timestamp = dayjs().format('YYYY-MM-DD_HH-mm-ss');
    const backupName = name || `backup_${timestamp}`;
    const backupDir = destination || path.join(config.paths.backups, 'manual');
    
    // Ensure backup directory exists
    await fs.ensureDir(backupDir);
    
    const backupPath = path.join(backupDir, `${backupName}.db`);
    
    // Copy database file
    const dbPath = config.database.connection.filename;
    await fs.copy(dbPath, backupPath);
    
    // Create metadata
    const metadata = {
      name: backupName,
      type,
      timestamp,
      size: (await fs.stat(backupPath)).size,
      source: dbPath,
      created: new Date().toISOString()
    };
    
    await fs.writeJson(
      path.join(backupDir, `${backupName}.meta.json`),
      metadata,
      { spaces: 2 }
    );
    
    spinner.succeed(chalk.green(`✅ Backup created: ${backupPath}`));
    console.log(chalk.gray(`   Size: ${(metadata.size / 1024 / 1024).toFixed(2)} MB`));
    
    return backupPath;
  } catch (error) {
    spinner.fail(chalk.red(`❌ Backup failed: ${error.message}`));
    logger.error('Backup failed:', error);
    throw error;
  }
}

module.exports = backupCommand;