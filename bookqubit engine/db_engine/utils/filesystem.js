/**
 * File System Utilities
 */

const fs = require('fs-extra');
const path = require('path');
const config = require('../config');

class FileSystem {
  constructor() {
    this.rootPath = config.paths.root;
  }

  async ensureDir(dirPath, silent = false) {
    const fullPath = path.join(this.rootPath, dirPath);
    if (!await fs.pathExists(fullPath)) {
      await fs.ensureDir(fullPath);
      if (!silent) {
        console.log(`📁 Created: ${dirPath}`);
      }
      return true;
    }
    return false;
  }

  async writeFile(filePath, content, silent = false) {
    const fullPath = path.join(this.rootPath, filePath);
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, content);
    if (!silent) {
      console.log(`📄 Created: ${filePath}`);
    }
    return true;
  }

  async readFile(filePath) {
    const fullPath = path.join(this.rootPath, filePath);
    return fs.readFile(fullPath, 'utf8');
  }

  async readJson(filePath) {
    const fullPath = path.join(this.rootPath, filePath);
    return fs.readJson(fullPath);
  }

  async writeJson(filePath, data, options = {}) {
    const { spaces = 2, silent = false } = options;
    const fullPath = path.join(this.rootPath, filePath);
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeJson(fullPath, data, { spaces });
    if (!silent) {
      console.log(`📄 Created: ${filePath}`);
    }
    return true;
  }

  async copy(src, dest, options = {}) {
    const { overwrite = false, silent = false } = options;
    const srcPath = path.join(this.rootPath, src);
    const destPath = path.join(this.rootPath, dest);
    
    if (!await fs.pathExists(srcPath)) {
      throw new Error(`Source not found: ${src}`);
    }
    
    if (await fs.pathExists(destPath) && !overwrite) {
      if (!silent) {
        console.log(`⏭️  Skipping: ${dest} (already exists)`);
      }
      return false;
    }
    
    await fs.copy(srcPath, destPath, { overwrite });
    if (!silent) {
      console.log(`📋 Copied: ${src} -> ${dest}`);
    }
    return true;
  }

  async delete(dirPath, options = {}) {
    const { dryRun = false, silent = false } = options;
    const fullPath = path.join(this.rootPath, dirPath);
    
    if (!await fs.pathExists(fullPath)) {
      return false;
    }
    
    if (dryRun) {
      if (!silent) {
        console.log(`[DRY RUN] Would delete: ${dirPath}`);
      }
      return true;
    }
    
    await fs.remove(fullPath);
    if (!silent) {
      console.log(`🗑️  Deleted: ${dirPath}`);
    }
    return true;
  }

  async exists(filePath) {
    const fullPath = path.join(this.rootPath, filePath);
    return fs.pathExists(fullPath);
  }

  async walk(dirPath) {
    const fullPath = path.join(this.rootPath, dirPath);
    if (!await fs.pathExists(fullPath)) {
      return [];
    }
    
    let results = [];
    const list = await fs.readdir(fullPath);
    
    for (const item of list) {
      const itemPath = path.join(fullPath, item);
      const stat = await fs.stat(itemPath);
      
      if (stat.isDirectory()) {
        results = results.concat(await this.walk(path.join(dirPath, item)));
      } else {
        results.push(path.join(dirPath, item));
      }
    }
    
    return results;
  }

  async getFileSize(filePath) {
    const fullPath = path.join(this.rootPath, filePath);
    if (!await fs.pathExists(fullPath)) {
      return 0;
    }
    const stat = await fs.stat(fullPath);
    return stat.size;
  }
}

module.exports = new FileSystem();