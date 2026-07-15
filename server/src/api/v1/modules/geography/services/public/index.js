/**
 * Public Services Index
 * Exports services for public API access
 */

import CountryPublicService from './country.public.service.js';
import StatePublicService from './state.public.service.js';
import CityPublicService from './city.public.service.js';

// Export individual services
export {
  CountryPublicService,
  StatePublicService,
  CityPublicService
};

// Export as a combined object
export const publicServices = {
  country: CountryPublicService,
  state: StatePublicService,
  city: CityPublicService
};

// Default export
export default {
  CountryPublicService,
  StatePublicService,
  CityPublicService,
  publicServices
};