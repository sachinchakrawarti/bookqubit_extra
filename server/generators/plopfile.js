// generators/plopfile.js
import helpers from './helpers/index.js';
import moduleDefinition from './definitions/module.js';
import componentDefinition from './definitions/component.js';
import queryDefinition from './definitions/query.js';
import apiDefinition from './definitions/api.js';
import batchDefinition from './definitions/batch.js';

export default function (plop) {
  // Register all helpers
  Object.keys(helpers).forEach(key => {
    if (typeof helpers[key] === 'function') {
      plop.setHelper(key, helpers[key]);
    }
  });

  // Register all generators
  plop.setGenerator('module', moduleDefinition);
  plop.setGenerator('component', componentDefinition);
  plop.setGenerator('query', queryDefinition);
  plop.setGenerator('api', apiDefinition);
  plop.setGenerator('batch', batchDefinition);
}