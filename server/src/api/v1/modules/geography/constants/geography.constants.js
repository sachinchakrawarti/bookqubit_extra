/**
 * Geography Constants
 * Defines geography-related constants for the geography module
 */

// ==========================================
// Entity Types
// ==========================================

export const ENTITY_TYPES = {
  COUNTRY: 'country',
  STATE: 'state',
  CITY: 'city',
  CONTINENT: 'continent',
  REGION: 'region'
};

// ==========================================
// Status
// ==========================================

export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETED: 'deleted',
  ARCHIVED: 'archived'
};

// ==========================================
// Continents
// ==========================================

export const CONTINENTS = {
  AFRICA: { id: 1, name: 'Africa', code: 'AF' },
  ANTARCTICA: { id: 2, name: 'Antarctica', code: 'AN' },
  ASIA: { id: 3, name: 'Asia', code: 'AS' },
  EUROPE: { id: 4, name: 'Europe', code: 'EU' },
  NORTH_AMERICA: { id: 5, name: 'North America', code: 'NA' },
  OCEANIA: { id: 6, name: 'Oceania', code: 'OC' },
  SOUTH_AMERICA: { id: 7, name: 'South America', code: 'SA' }
};

// ==========================================
// Country Codes (ISO 3166-1 alpha-2)
// ==========================================

export const COUNTRY_CODES = {
  US: 'US',
  UK: 'GB',
  IN: 'IN',
  AU: 'AU',
  CA: 'CA',
  DE: 'DE',
  FR: 'FR',
  IT: 'IT',
  JP: 'JP',
  CN: 'CN',
  BR: 'BR',
  // ... add more as needed
};

// ==========================================
// Default Pagination
// ==========================================

export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100
};

// ==========================================
// Default Sort
// ==========================================

export const DEFAULT_SORT = {
  FIELD: 'created_at',
  ORDER: 'DESC'
};

// ==========================================
// Cache Keys
// ==========================================

export const CACHE_KEYS = {
  COUNTRIES: 'geography:countries',
  STATES: 'geography:states',
  CITIES: 'geography:cities',
  CONTINENTS: 'geography:continents',
  COUNTRY_PREFIX: 'geography:country:',
  STATE_PREFIX: 'geography:state:',
  CITY_PREFIX: 'geography:city:'
};

// ==========================================
// Export all
// ==========================================

export default {
  ENTITY_TYPES,
  STATUS,
  CONTINENTS,
  COUNTRY_CODES,
  DEFAULT_PAGINATION,
  DEFAULT_SORT,
  CACHE_KEYS
};