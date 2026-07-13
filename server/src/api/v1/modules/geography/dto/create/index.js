/**
 * Create DTOs Index
 * Export all create DTOs
 */

export { CreateCountryDTO } from './create-country.dto.js';
export { CreateStateDTO } from './create-state.dto.js';
export { CreateCityDTO } from './create-city.dto.js';

// Combined create DTOs for backward compatibility
import { CreateCountryDTO } from './create-country.dto.js';
import { CreateStateDTO } from './create-state.dto.js';
import { CreateCityDTO } from './create-city.dto.js';

export default {
  country: CreateCountryDTO,
  state: CreateStateDTO,
  city: CreateCityDTO
};