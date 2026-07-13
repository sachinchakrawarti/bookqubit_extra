/**
 * Filter DTOs Index
 * Export all filter DTOs
 */

export { FilterCountryDTO } from './filter-country.dto.js';
export { FilterStateDTO } from './filter-state.dto.js';
export { FilterCityDTO } from './filter-city.dto.js';

// Combined filter DTOs for backward compatibility
import { FilterCountryDTO } from './filter-country.dto.js';
import { FilterStateDTO } from './filter-state.dto.js';
import { FilterCityDTO } from './filter-city.dto.js';

export default {
  country: FilterCountryDTO,
  state: FilterStateDTO,
  city: FilterCityDTO
};