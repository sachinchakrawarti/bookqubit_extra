/**
 * SQLite Database Adapter
 */

const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

class SQLiteAdapter {
  constructor(config) {
    this.config = config;
    this.db = null;
  }

  async connect() {
    this.db = await open({
      filename: this.config.connection.filename,
      driver: sqlite3.Database
    });
    return this.db;
  }

  async disconnect() {
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
  }

  async query(sql, params = []) {
    if (!this.db) {
      await this.connect();
    }
    return this.db.all(sql, params);
  }

  async run(sql, params = []) {
    if (!this.db) {
      await this.connect();
    }
    return this.db.run(sql, params);
  }

  async get(sql, params = []) {
    if (!this.db) {
      await this.connect();
    }
    return this.db.get(sql, params);
  }

  async transaction(callback) {
    if (!this.db) {
      await this.connect();
    }
    return this.db.transaction(callback);
  }

  async getTables() {
    const result = await this.query(
      "SELECT name FROM sqlite_master WHERE type='table'"
    );
    return result.map(row => row.name);
  }

  async getTableSchema(tableName) {
    return this.query(`PRAGMA table_info(${tableName})`);
  }

  async backup(backupPath) {
    const fs = require('fs-extra');
    const source = this.config.connection.filename;
    await fs.copy(source, backupPath);
    return backupPath;
  }

  async restore(backupPath) {
    const fs = require('fs-extra');
    const target = this.config.connection.filename;
    await fs.copy(backupPath, target);
    await this.disconnect();
    await this.connect();
    return true;
  }
}

module.exports = SQLiteAdapter;