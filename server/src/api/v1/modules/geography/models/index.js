/**
 * Models Index
 * Main entry point for all models
 * Exports all models with proper organization
 */

// ==========================================
// Sequelize Models
// ==========================================

export {
  Continent,
  Country,
  State,
  City
} from './sequelize/index.js';

// ==========================================
// Relationships
// ==========================================

export { defineRelationships, getModels } from './relationships.js';

// ==========================================
// Backward Compatibility - Combined Models
// ==========================================

import { Continent, Country, State, City } from './sequelize/index.js';

export const models = {
  Continent,
  Country,
  State,
  City
};

// ==========================================
// Default Export - All Models
// ==========================================

import sequelizeModels from './sequelize/index.js';
import * as relationships from './relationships.js';

export default {
  ...sequelizeModels,
  ...relationships,
  models: sequelizeModels
};