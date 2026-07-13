/**
 * Geography Types
 * Type definitions for the geography module using JSDoc
 */

// ==========================================
// Base Types
// ==========================================

/**
 * @typedef {Object} BaseEntity
 * @property {number} id - Unique identifier
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 * @property {string|null} deletedAt - Deletion timestamp (null if not deleted)
 */

/**
 * @typedef {Object} PaginationParams
 * @property {number} [page=1] - Page number
 * @property {number} [limit=10] - Items per page
 * @property {string} [sortBy='name'] - Sort field
 * @property {string} [sortOrder='ASC'] - Sort order (ASC/DESC)
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {Array} data - Array of items
 * @property {number} page - Current page
 * @property {number} limit - Items per page
 * @property {number} total - Total items
 * @property {number} totalPages - Total pages
 * @property {boolean} hasNext - Has next page
 * @property {boolean} hasPrevious - Has previous page
 */

// ==========================================
// Continent Types
// ==========================================

/**
 * @typedef {Object} Continent
 * @property {number} id - Continent ID
 * @property {string} code - Continent code (2 uppercase letters)
 * @property {string} name - Continent name
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} CreateContinentDTO
 * @property {string} code - Continent code (2 uppercase letters)
 * @property {string} name - Continent name
 */

/**
 * @typedef {Object} UpdateContinentDTO
 * @property {string} [code] - Continent code (2 uppercase letters)
 * @property {string} [name] - Continent name
 */

// ==========================================
// Country Types
// ==========================================

/**
 * @typedef {Object} Country
 * @property {number} id - Country ID
 * @property {string} code - Country code (2 uppercase letters)
 * @property {string} name - Country name
 * @property {string|null} nativeName - Native name
 * @property {string|null} capital - Capital city
 * @property {number|null} continentId - Continent ID
 * @property {Continent|null} continent - Continent object
 * @property {number|null} regionId - Region ID
 * @property {Object|null} region - Region object
 * @property {number|null} subregionId - Subregion ID
 * @property {Object|null} subregion - Subregion object
 * @property {number|null} population - Population
 * @property {number|null} areaKm2 - Area in square kilometers
 * @property {string|null} currencyCode - Currency code (3 uppercase letters)
 * @property {string|null} phoneCode - Phone code (e.g., +1)
 * @property {string|null} tld - Top-level domain (e.g., .us)
 * @property {boolean} isActive - Active status
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 * @property {string|null} deletedAt - Deletion timestamp
 * @property {State[]} [states] - Associated states
 * @property {CountryCode[]} [countryCodes] - Alternative country codes
 */

/**
 * @typedef {Object} CreateCountryDTO
 * @property {string} code - Country code (2 uppercase letters)
 * @property {string} name - Country name
 * @property {string} [native_name] - Native name
 * @property {string} [capital] - Capital city
 * @property {number} continent_id - Continent ID
 * @property {number} [region_id] - Region ID
 * @property {number} [subregion_id] - Subregion ID
 * @property {number} [population] - Population
 * @property {number} [area_km2] - Area in square kilometers
 * @property {string} [currency_code] - Currency code (3 uppercase letters)
 * @property {string} [phone_code] - Phone code
 * @property {string} [tld] - Top-level domain
 * @property {boolean} [is_active] - Active status
 */

/**
 * @typedef {Object} UpdateCountryDTO
 * @property {string} [code] - Country code (2 uppercase letters)
 * @property {string} [name] - Country name
 * @property {string} [native_name] - Native name
 * @property {string} [capital] - Capital city
 * @property {number} [continent_id] - Continent ID
 * @property {number} [region_id] - Region ID
 * @property {number} [subregion_id] - Subregion ID
 * @property {number} [population] - Population
 * @property {number} [area_km2] - Area in square kilometers
 * @property {string} [currency_code] - Currency code
 * @property {string} [phone_code] - Phone code
 * @property {string} [tld] - Top-level domain
 * @property {boolean} [is_active] - Active status
 */

/**
 * @typedef {Object} CountryResponse
 * @property {number} id - Country ID
 * @property {string} code - Country code
 * @property {string} name - Country name
 * @property {string|null} nativeName - Native name
 * @property {string|null} capital - Capital city
 * @property {Object|null} continent - Continent object
 * @property {Object|null} region - Region object
 * @property {Object|null} subregion - Subregion object
 * @property {number|null} population - Population
 * @property {string} populationFormatted - Formatted population
 * @property {number|null} areaKm2 - Area in square kilometers
 * @property {string} areaFormatted - Formatted area
 * @property {number|null} populationDensity - Population density
 * @property {string|null} populationDensityFormatted - Formatted population density
 * @property {string|null} currencyCode - Currency code
 * @property {string|null} phoneCode - Phone code
 * @property {string|null} tld - Top-level domain
 * @property {boolean} isActive - Active status
 * @property {number} stateCount - Number of states
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 */

// ==========================================
// State Types
// ==========================================

/**
 * @typedef {Object} State
 * @property {number} id - State ID
 * @property {number} countryId - Country ID
 * @property {Country|null} country - Country object
 * @property {string} code - State code (2-3 uppercase letters)
 * @property {string} name - State name
 * @property {string|null} nativeName - Native name
 * @property {string|null} capital - Capital city
 * @property {number|null} population - Population
 * @property {number|null} areaKm2 - Area in square kilometers
 * @property {boolean} isActive - Active status
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 * @property {string|null} deletedAt - Deletion timestamp
 * @property {City[]} [cities] - Associated cities
 */

/**
 * @typedef {Object} CreateStateDTO
 * @property {number} country_id - Country ID
 * @property {string} code - State code (2-3 uppercase letters)
 * @property {string} name - State name
 * @property {string} [native_name] - Native name
 * @property {string} [capital] - Capital city
 * @property {number} [population] - Population
 * @property {number} [area_km2] - Area in square kilometers
 * @property {boolean} [is_active] - Active status
 */

/**
 * @typedef {Object} UpdateStateDTO
 * @property {number} [country_id] - Country ID
 * @property {string} [code] - State code
 * @property {string} [name] - State name
 * @property {string} [native_name] - Native name
 * @property {string} [capital] - Capital city
 * @property {number} [population] - Population
 * @property {number} [area_km2] - Area in square kilometers
 * @property {boolean} [is_active] - Active status
 */

// ==========================================
// City Types
// ==========================================

/**
 * @typedef {Object} City
 * @property {number} id - City ID
 * @property {number} stateId - State ID
 * @property {State|null} state - State object
 * @property {string} name - City name
 * @property {string|null} nativeName - Native name
 * @property {number|null} population - Population
 * @property {number|null} latitude - Latitude
 * @property {number|null} longitude - Longitude
 * @property {number|null} timezoneId - Timezone ID
 * @property {Object|null} timezone - Timezone object
 * @property {string|null} postalCode - Postal code
 * @property {boolean} isCapital - Is capital city
 * @property {boolean} isActive - Active status
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 * @property {string|null} deletedAt - Deletion timestamp
 */

/**
 * @typedef {Object} CreateCityDTO
 * @property {number} state_id - State ID
 * @property {string} name - City name
 * @property {string} [native_name] - Native name
 * @property {number} [population] - Population
 * @property {number} [latitude] - Latitude
 * @property {number} [longitude] - Longitude
 * @property {number} [timezone_id] - Timezone ID
 * @property {string} [postal_code] - Postal code
 * @property {boolean} [is_capital] - Is capital city
 * @property {boolean} [is_active] - Active status
 */

/**
 * @typedef {Object} UpdateCityDTO
 * @property {number} [state_id] - State ID
 * @property {string} [name] - City name
 * @property {string} [native_name] - Native name
 * @property {number} [population] - Population
 * @property {number} [latitude] - Latitude
 * @property {number} [longitude] - Longitude
 * @property {number} [timezone_id] - Timezone ID
 * @property {string} [postal_code] - Postal code
 * @property {boolean} [is_capital] - Is capital city
 * @property {boolean} [is_active] - Active status
 */

// ==========================================
// Filter Types
// ==========================================

/**
 * @typedef {Object} FilterOptions
 * @property {string} [search] - Search query
 * @property {boolean} [isActive] - Filter by active status
 * @property {number} [page] - Page number
 * @property {number} [limit] - Items per page
 * @property {string} [sortBy] - Sort field
 * @property {string} [sortOrder] - Sort order (ASC/DESC)
 */

/**
 * @typedef {Object} CountryFilterOptions
 * @property {string} [search] - Search query
 * @property {number} [continentId] - Filter by continent ID
 * @property {number} [regionId] - Filter by region ID
 * @property {number} [subregionId] - Filter by subregion ID
 * @property {string} [currencyCode] - Filter by currency code
 * @property {number} [minPopulation] - Minimum population
 * @property {number} [maxPopulation] - Maximum population
 * @property {number} [minArea] - Minimum area
 * @property {number} [maxArea] - Maximum area
 * @property {boolean} [hasStates] - Has states
 * @property {boolean} [isActive] - Active status
 * @property {number} [page] - Page number
 * @property {number} [limit] - Items per page
 * @property {string} [sortBy] - Sort field
 * @property {string} [sortOrder] - Sort order
 */

/**
 * @typedef {Object} StateFilterOptions
 * @property {string} [search] - Search query
 * @property {number} [countryId] - Filter by country ID
 * @property {string} [countryCode] - Filter by country code
 * @property {boolean} [isCapital] - Is capital
 * @property {number} [minPopulation] - Minimum population
 * @property {number} [maxPopulation] - Maximum population
 * @property {boolean} [hasCities] - Has cities
 * @property {boolean} [isActive] - Active status
 * @property {number} [page] - Page number
 * @property {number} [limit] - Items per page
 * @property {string} [sortBy] - Sort field
 * @property {string} [sortOrder] - Sort order
 */

/**
 * @typedef {Object} CityFilterOptions
 * @property {string} [search] - Search query
 * @property {number} [stateId] - Filter by state ID
 * @property {string} [stateCode] - Filter by state code
 * @property {number} [countryId] - Filter by country ID
 * @property {string} [countryCode] - Filter by country code
 * @property {boolean} [isCapital] - Is capital
 * @property {boolean} [hasCoordinates] - Has coordinates
 * @property {number} [minPopulation] - Minimum population
 * @property {number} [maxPopulation] - Maximum population
 * @property {number} [timezoneId] - Filter by timezone ID
 * @property {boolean} [isActive] - Active status
 * @property {number} [page] - Page number
 * @property {number} [limit] - Items per page
 * @property {string} [sortBy] - Sort field
 * @property {string} [sortOrder] - Sort order
 */

// ==========================================
// Analytics Types
// ==========================================

/**
 * @typedef {Object} AnalyticsOptions
 * @property {string} [period='monthly'] - Period (daily/weekly/monthly/yearly)
 * @property {string} [startDate] - Start date (ISO format)
 * @property {string} [endDate] - End date (ISO format)
 * @property {string} [entity='all'] - Entity type (countries/states/cities/all)
 * @property {number} [limit=10] - Results limit
 * @property {string} [metric='count'] - Metric (count/population/area/density)
 * @property {string} [groupBy='continent'] - Group by field
 */

/**
 * @typedef {Object} DashboardStats
 * @property {Object} countries - Country statistics
 * @property {number} countries.total - Total countries
 * @property {number} countries.active - Active countries
 * @property {number} countries.inactive - Inactive countries
 * @property {Object} states - State statistics
 * @property {number} states.total - Total states
 * @property {number} states.active - Active states
 * @property {number} states.inactive - Inactive states
 * @property {Object} cities - City statistics
 * @property {number} cities.total - Total cities
 * @property {number} cities.active - Active cities
 * @property {number} cities.inactive - Inactive cities
 * @property {number} cities.capitals - Capital cities
 * @property {number} cities.withCoordinates - Cities with coordinates
 * @property {Array} distribution - Distribution by entity
 * @property {Array} trends - Trend data
 * @property {Array} topLists - Top lists
 */

// ==========================================
// Export Types
// ==========================================

/**
 * @typedef {Object} ExportOptions
 * @property {string} format - Export format (csv/excel/pdf/json)
 * @property {string} type - Entity type (countries/states/cities)
 * @property {Array<string>} fields - Fields to export
 * @property {Object} filters - Filter options
 * @property {string} sortBy - Sort field
 * @property {string} sortOrder - Sort order
 * @property {number} limit - Export limit
 */

// ==========================================
// Response Types
// ==========================================

/**
 * @typedef {Object} APIResponse
 * @property {boolean} success - Success status
 * @property {*} data - Response data
 * @property {string} message - Response message
 * @property {Array} [errors] - Validation errors
 * @property {string} timestamp - Response timestamp
 * @property {Object} [pagination] - Pagination info
 */

/**
 * @typedef {Object} ErrorResponse
 * @property {boolean} success - Always false
 * @property {string} message - Error message
 * @property {string} error - Error details
 * @property {Array} [errors] - Validation errors
 * @property {string} timestamp - Error timestamp
 */

// ==========================================
// Service Types
// ==========================================

/**
 * @typedef {Object} ServiceResponse
 * @property {boolean} success - Success status
 * @property {*} data - Response data
 * @property {string} message - Response message
 * @property {string|null} error - Error message (if any)
 */

// ==========================================
// Repository Types
// ==========================================

/**
 * @typedef {Object} RepositoryResponse
 * @property {Array} data - Data array
 * @property {number} total - Total count
 * @property {number} page - Current page
 * @property {number} limit - Items per page
 * @property {number} totalPages - Total pages
 */

// ==========================================
// Common Types
// ==========================================

/**
 * @typedef {Object} PaginationResult
 * @property {Array} rows - Data rows
 * @property {Object} count - Count object
 * @property {number} count.total - Total count
 * @property {number} page - Current page
 * @property {number} limit - Items per page
 */

/**
 * @typedef {Object} SortOptions
 * @property {string} field - Sort field
 * @property {string} order - Sort order (ASC/DESC)
 */

/**
 * @typedef {Object} SearchResult
 * @property {string} type - Entity type
 * @property {number} score - Search score
 * @property {*} data - Entity data
 * @property {string} matchType - Match type
 */

// ==========================================
// Validator Types
// ==========================================

/**
 * @typedef {Object} ValidationError
 * @property {string} field - Field name
 * @property {string} message - Error message
 */

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} valid - Validation status
 * @property {Array<ValidationError>} errors - Validation errors
 * @property {*} value - Validated value
 */

// ==========================================
// Constant Types
// ==========================================

/**
 * @typedef {Object} Status
 * @property {number} ACTIVE - Active status
 * @property {number} INACTIVE - Inactive status
 * @property {string} DELETED - Deleted status
 * @property {string} RESTORED - Restored status
 */

/**
 * @typedef {Object} EntityTypes
 * @property {string} COUNTRY - Country entity type
 * @property {string} STATE - State entity type
 * @property {string} CITY - City entity type
 * @property {string} CONTINENT - Continent entity type
 */

// ==========================================
// Module Configuration Types
// ==========================================

/**
 * @typedef {Object} GeographyConfig
 * @property {Object} database - Database configuration
 * @property {Object} api - API configuration
 * @property {Object} validation - Validation configuration
 * @property {Object} cache - Cache configuration
 * @property {Object} logging - Logging configuration
 * @property {Object} analytics - Analytics configuration
 * @property {Object} export - Export configuration
 * @property {Object} security - Security configuration
 * @property {Object} defaults - Default values
 */

// ==========================================
// Export all types
// ==========================================

// This file is for JSDoc type definitions only
// No actual code is exported

export default {
  // This is just for documentation purposes
  // Types are used via JSDoc comments
};