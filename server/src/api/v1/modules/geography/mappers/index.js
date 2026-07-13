/**
 * Mappers Index
 * Export all mapper classes
 */

export { default as BaseMapper } from './base.mapper.js';
export { default as CountryMapper } from './country.mapper.js';
export { default as StateMapper } from './state.mapper.js';
export { default as CityMapper } from './city.mapper.js';
export { default as GeographyMapper } from './geography.mapper.js';

// Export mapper factory
export const createMapper = (type) => {
  switch (type) {
    case 'country':
      return new CountryMapper();
    case 'state':
      return new StateMapper();
    case 'city':
      return new CityMapper();
    case 'geography':
      return new GeographyMapper();
    default:
      throw new Error(`Unknown mapper type: ${type}`);
  }
};