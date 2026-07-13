/**
 * Command Registry
 * Exports all CLI commands
 */

module.exports = {
  backup: require('./backup'),
  build: require('./build'),
  clean: require('./clean'),
  doctor: require('./doctor'),
  generate: require('./generate'),
  list: require('./list'),
  restore: require('./restore'),
  seed: require('./seed'),
  validate: require('./validate')
};