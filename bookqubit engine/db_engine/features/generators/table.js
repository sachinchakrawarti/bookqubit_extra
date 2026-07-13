/**
 * Table Generator
 */

const fs = require('fs-extra');
const path = require('path');
const logger = require('../utils/logger');
const { SchemaError } = require('../errors');

class TableGenerator {
  constructor() {
    this.templatePath = path.join(__dirname, '../templates/sql/table.sql');
  }

  async generate(tableName, schemaName, columns = [], options = {}) {
    try {
      const template = await fs.readFile(this.templatePath, 'utf8');
      
      // Build table definition
      const columnDefinitions = columns.map(col => {
        return `  ${col.name} ${col.type}${col.constraints ? ' ' + col.constraints : ''}`;
      }).join(',\n');
      
      const sql = template
        .replace(/\{\{tableName\}\}/g, tableName)
        .replace(/\{\{schemaName\}\}/g, schemaName)
        .replace(/\{\{columns\}\}/g, columnDefinitions);
      
      logger.info(`✅ Table generated: ${tableName}`);
      return sql;
    } catch (error) {
      throw new SchemaError(`Table generation failed: ${error.message}`);
    }
  }
}

module.exports = new TableGenerator();