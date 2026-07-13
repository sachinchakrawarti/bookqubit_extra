/**
 * Admin Repositories Index
 * Exports all admin repositories
 */

import CountryAdminRepository from './country.admin.repository.js';
import StateAdminRepository from './state.admin.repository.js';
import CityAdminRepository from './city.admin.repository.js';

// Export individual repositories
export {
  CountryAdminRepository,
  StateAdminRepository,
  CityAdminRepository
};

// Export as a combined object
export const adminRepositories = {
  country: CountryAdminRepository,
  state: StateAdminRepository,
  city: CityAdminRepository
};

// Default export
export default {
  CountryAdminRepository,
  StateAdminRepository,
  CityAdminRepository,
  adminRepositories
};