/**
 * Path Configuration
 */

const path = require('path');

const root = path.join(__dirname, '../..');

module.exports = {
  root,
  engine: path.join(root, 'engine'),
  database: path.join(root, 'database'),
  schemas: path.join(root, 'schema'),
  backups: path.join(root, 'backups'),
  seeds: path.join(root, 'seeds'),
  queries: path.join(root, 'queries'),
  meta: path.join(root, 'meta'),
  docs: path.join(root, 'docs'),
  templates: path.join(root, 'templates'),
  logs: path.join(root, 'engine/logs'),
  cache: path.join(root, 'engine/cache'),
  tests: path.join(root, 'engine/tests')
};