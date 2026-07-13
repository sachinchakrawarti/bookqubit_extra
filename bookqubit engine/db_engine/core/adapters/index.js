/**
 * Database Adapter Registry
 * Exports all database adapters
 */

const SQLiteAdapter = require('./sqlite');
const MySQLAdapter = require('./mysql');
const PostgreSQLAdapter = require('./postgres');

module.exports = {
  SQLiteAdapter,
  MySQLAdapter,
  PostgreSQLAdapter,
  
  getAdapter(type) {
    switch (type) {
      case 'sqlite':
        return SQLiteAdapter;
      case 'mysql':
        return MySQLAdapter;
      case 'postgres':
        return PostgreSQLAdapter;
      default:
        throw new Error(`Unknown adapter type: ${type}`);
    }
  }
};