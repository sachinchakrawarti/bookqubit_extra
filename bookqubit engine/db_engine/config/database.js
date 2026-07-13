/**
 * Database Configuration
 */

const path = require('path');

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: process.env.DB_PATH || path.join(__dirname, '../../database/bookqubit.db')
  },
  useNullAsDefault: true,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: path.join(__dirname, '../../core/migrations/versions'),
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: path.join(__dirname, '../../seeds')
  }
};