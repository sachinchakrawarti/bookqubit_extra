/**
 * Admin Controllers Index
 * Exports all admin controllers
 */

import CountryAdminController from './country.admin.controller.js';
import StateAdminController from './state.admin.controller.js';
import CityAdminController from './city.admin.controller.js';

// Export individual controllers
export {
  CountryAdminController,
  StateAdminController,
  CityAdminController
};

// Export as a combined object
export const adminControllers = {
  country: CountryAdminController,
  state: StateAdminController,
  city: CityAdminController
};

// Default export
export default {
  CountryAdminController,
  StateAdminController,
  CityAdminController,
  adminControllers
};