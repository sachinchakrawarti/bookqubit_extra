/**
 * Entities Index
 * Exports all entities
 */

import BaseEntity from './base.entity.js';
import CountryEntity from './country.entity.js';
import StateEntity from './state.entity.js';
import CityEntity from './city.entity.js';

// Export individual entities
export {
  BaseEntity,
  CountryEntity,
  StateEntity,
  CityEntity
};

// Export as a combined object
export const entities = {
  base: BaseEntity,
  country: CountryEntity,
  state: StateEntity,
  city: CityEntity
};

// Default export
export default {
  BaseEntity,
  CountryEntity,
  StateEntity,
  CityEntity,
  entities
};