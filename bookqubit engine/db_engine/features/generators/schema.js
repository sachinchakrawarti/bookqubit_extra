/**
 * Schema Generator
 */

const fs = require('fs-extra');
const path = require('path');
const config = require('../config');
const logger = require('../utils/logger');
const { SchemaError } = require('../errors');

class SchemaGenerator {
  constructor() {
    this.templatePath = path.join(config.paths.templates, 'schema');
  }

  async generate(schemaName, options = {}) {
    const { template = 'core_template', output, overwrite = false } = options;
    
    const templateDir = path.join(this.templatePath, template);
    const outputDir = output || path.join(config.paths.schemas, '01_core', schemaName);
    
    if (!await fs.pathExists(templateDir)) {
      throw new SchemaError(`Template not found: ${template}`);
    }
    
    if (await fs.pathExists(outputDir) && !overwrite) {
      throw new SchemaError(`Schema already exists: ${schemaName}`);
    }
    
    // Copy template
    await fs.copy(templateDir, outputDir, { overwrite });
    
    // Process template files
    await this.processTemplate(outputDir, schemaName);
    
    logger.info(`✅ Schema generated: ${schemaName}`);
    return outputDir;
  }

  async processTemplate(outputDir, schemaName) {
    // Process files in the template
    const files = await this.walk(outputDir);
    
    for (const file of files) {
      const content = await fs.readFile(file, 'utf8');
      const processed = content.replace(/\{\{schemaName\}\}/g, schemaName);
      await fs.writeFile(file, processed);
    }
  }

  async walk(dir) {
    let results = [];
    const list = await fs.readdir(dir);
    
    for (const file of list) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      
      if (stat.isDirectory()) {
        results = results.concat(await this.walk(filePath));
      } else {
        results.push(filePath);
      }
    }
    
    return results;
  }
}

module.exports = new SchemaGenerator();