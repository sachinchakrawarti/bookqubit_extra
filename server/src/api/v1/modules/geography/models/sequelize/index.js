/**
 * Sequelize Models Index
 * Export all Sequelize models and define relationships
 */

import Continent from './continent.model.js';
import Country from './country.model.js';
import State from './state.model.js';
import City from './city.model.js';

// ==========================================
// Define Relationships
// ==========================================

// Continent -> Countries
Continent.hasMany(Country, {
  foreignKey: 'continent_id',
  as: 'countries',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

// Country -> Continent
Country.belongsTo(Continent, {
  foreignKey: 'continent_id',
  as: 'continent'
});

// Country -> States
Country.hasMany(State, {
  foreignKey: 'country_id',
  as: 'states',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// State -> Country
State.belongsTo(Country, {
  foreignKey: 'country_id',
  as: 'country'
});

// State -> Cities
State.hasMany(City, {
  foreignKey: 'state_id',
  as: 'cities',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// City -> State
City.belongsTo(State, {
  foreignKey: 'state_id',
  as: 'state'
});

// ==========================================
// Exports
// ==========================================

export {
  Continent,
  Country,
  State,
  City
};

export default {
  Continent,
  Country,
  State,
  City
};