/**
 * Public Repositories Index
 * Exports repositories for public API access
 * These repositories provide read-only access for public endpoints
 */

// Import public repository implementations
import CityRepository from './city.repository.js';
import CountryRepository from './country.repository.js';
import StateRepository from './state.repository.js';

// Export individual repositories
export {
  CityRepository,
  CountryRepository,
  StateRepository
};

// Export as a combined object
export const publicRepositories = {
  city: CityRepository,
  country: CountryRepository,
  state: StateRepository
};

// Default export for backward compatibility
export default {
  CityRepository,
  CountryRepository,
  StateRepository,
  publicRepositories
};