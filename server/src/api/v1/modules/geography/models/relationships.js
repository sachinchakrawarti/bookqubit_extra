/**
 * Model Relationships
 * Centralized definition of all model associations
 */

import { Continent, Country, State, City } from './sequelize/index.js';

/**
 * Define all model relationships
 * This should be called after all models are imported
 */
export const defineRelationships = () => {
  // ==========================================
  // Continent -> Countries
  // ==========================================
  
  Continent.hasMany(Country, {
    foreignKey: 'continent_id',
    as: 'countries',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  // ==========================================
  // Country -> Continent
  // ==========================================
  
  Country.belongsTo(Continent, {
    foreignKey: 'continent_id',
    as: 'continent'
  });

  // ==========================================
  // Country -> States
  // ==========================================
  
  Country.hasMany(State, {
    foreignKey: 'country_id',
    as: 'states',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  // ==========================================
  // State -> Country
  // ==========================================
  
  State.belongsTo(Country, {
    foreignKey: 'country_id',
    as: 'country'
  });

  // ==========================================
  // State -> Cities
  // ==========================================
  
  State.hasMany(City, {
    foreignKey: 'state_id',
    as: 'cities',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  // ==========================================
  // City -> State
  // ==========================================
  
  City.belongsTo(State, {
    foreignKey: 'state_id',
    as: 'state'
  });

  console.log('✅ Geography model relationships defined');
};

/**
 * Get all models with their associations
 * @returns {Object} Models with associations
 */
export const getModels = () => {
  return {
    Continent,
    Country,
    State,
    City
  };
};

/**
 * Get model by name
 * @param {string} name - Model name
 * @returns {Object} Model instance
 */
export const getModel = (name) => {
  const models = {
    Continent,
    Country,
    State,
    City
  };
  
  if (!models[name]) {
    throw new Error(`Model ${name} not found`);
  }
  
  return models[name];
};

/**
 * Get model associations
 * @param {string} name - Model name
 * @returns {Object} Model associations
 */
export const getAssociations = (name) => {
  const model = getModel(name);
  return model.associations || {};
};

export default {
  defineRelationships,
  getModels,
  getModel,
  getAssociations
};