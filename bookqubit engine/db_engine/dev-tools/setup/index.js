/**
 * Setup Module Exports
 */

module.exports = {
  setup: require('./setup'),
  installDeps: require('./install-deps'),
  verifySetup: require('./verify-setup'),
  rollbackSetup: require('./rollback-setup'),
  createStructure: require('./create-structure'),
  createConfig: require('./create-config'),
  createTemplates: require('./create-templates'),
  createSchemas: require('./create-schemas'),
  createSeeds: require('./create-seeds'),
  createDocs: require('./create-docs'),
  createScripts: require('./create-scripts')
};