/**
 * Hooks Module Exports
 */

module.exports = {
  preBuild: require('./pre-build'),
  postBuild: require('./post-build'),
  preSeed: require('./pre-seed'),
  postSeed: require('./post-seed')
};