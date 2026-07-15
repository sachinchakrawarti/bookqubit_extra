/**
 * Public Controllers Index
 * Exports controllers for public API access
 */

import CountryPublicController, { CountryController } from './country.public.controller.js';
import StatePublicController, { StateController } from './state.public.controller.js';
import CityPublicController, { CityController } from './city.public.controller.js';

// Export individual controllers
export {
  CountryPublicController,
  StatePublicController,
  CityPublicController,
  CountryController,
  StateController,
  CityController
};

// Export as a combined object
export const publicControllers = {
  country: CountryController,
  state: StateController,
  city: CityController,
  countryPublic: CountryPublicController,
  statePublic: StatePublicController,
  cityPublic: CityPublicController
};

// Default export
export default {
  CountryPublicController,
  StatePublicController,
  CityPublicController,
  CountryController,
  StateController,
  CityController,
  publicControllers
};