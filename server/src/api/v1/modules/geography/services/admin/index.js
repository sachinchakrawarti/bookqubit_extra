/**
 * Admin Services Index
 * Exports all admin services
 */

import CountryAdminService from './country.admin.service.js';
import StateAdminService from './state.admin.service.js';
import CityAdminService from './city.admin.service.js';
import StatsAdminService from './stats.admin.service.js';

// Export individual services
export {
  CountryAdminService,
  StateAdminService,
  CityAdminService,
  StatsAdminService
};

// Export as a combined object
export const adminServices = {
  country: CountryAdminService,
  state: StateAdminService,
  city: CityAdminService,
  stats: StatsAdminService
};

// Default export
export default {
  CountryAdminService,
  StateAdminService,
  CityAdminService,
  StatsAdminService,
  adminServices
};