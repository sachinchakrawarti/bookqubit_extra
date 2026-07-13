/**
 * Geography Transformer
 * Transforms geography data for API responses
 */

import { BaseTransformer } from './base.transformer.js';

export class GeographyTransformer extends BaseTransformer {
  constructor(options = {}) {
    super(options);
    this.dateFormat = options.dateFormat || 'ISO';
    this.numberFormat = options.numberFormat || 'en-US';
  }

  // ==========================================
  // Country Transformations
  // ==========================================

  /**
   * Transform country data for API response
   * @param {Object} country - Country data
   * @param {Object} options - Transformation options
   * @returns {Object} Transformed country
   */
  transformCountry(country, options = {}) {
    if (!country) return null;

    const data = country.toJSON ? country.toJSON() : country;
    const opts = { ...this.options, ...options };

    return this.cleanObject({
      id: data.id,
      code: data.code,
      name: data.name,
      nativeName: data.native_name || data.nativeName,
      capital: data.capital,
      continent: data.continent ? {
        id: data.continent.id,
        code: data.continent.code,
        name: data.continent.name
      } : null,
      region: data.region ? {
        id: data.region.id,
        name: data.region.name
      } : null,
      subregion: data.subregion ? {
        id: data.subregion.id,
        name: data.subregion.name
      } : null,
      population: data.population,
      populationFormatted: this.formatNumber(data.population),
      areaKm2: data.area_km2 || data.areaKm2,
      areaFormatted: data.area_km2 || data.areaKm2 ? 
        `${this.formatNumber(data.area_km2 || data.areaKm2)} km²` : 'N/A',
      populationDensity: data.population && (data.area_km2 || data.areaKm2) ? 
        Math.round(data.population / (data.area_km2 || data.areaKm2)) : null,
      currencyCode: data.currency_code || data.currencyCode,
      phoneCode: data.phone_code || data.phoneCode,
      tld: data.tld,
      isActive: data.is_active === 1 || data.is_active === true || data.isActive === true,
      flag: this.formatFlag(data.code),
      displayName: this.getDisplayName(data),
      fullName: this.getFullName(data),
      createdAt: this.formatDate(data.created_at || data.createdAt),
      updatedAt: this.formatDate(data.updated_at || data.updatedAt),
      deletedAt: this.formatDate(data.deleted_at || data.deletedAt)
    }, opts);
  }

  /**
   * Transform multiple countries
   * @param {Array} countries - Array of country data
   * @param {Object} options - Transformation options
   * @returns {Array} Transformed countries
   */
  transformCountries(countries, options = {}) {
    if (!countries || !Array.isArray(countries)) return [];
    return countries.map(country => this.transformCountry(country, options));
  }

  /**
   * Transform country for summary view
   * @param {Object} country - Country data
   * @param {Object} options - Transformation options
   * @returns {Object} Transformed country summary
   */
  transformCountrySummary(country, options = {}) {
    if (!country) return null;

    const data = country.toJSON ? country.toJSON() : country;
    const opts = { ...this.options, ...options };

    return this.cleanObject({
      id: data.id,
      code: data.code,
      name: data.name,
      nativeName: data.native_name || data.nativeName,
      capital: data.capital,
      continentName: data.continent ? data.continent.name : null,
      population: data.population,
      populationFormatted: this.formatNumber(data.population),
      isActive: data.is_active === 1 || data.is_active === true || data.isActive === true,
      flag: this.formatFlag(data.code),
      displayName: this.getDisplayName(data)
    }, opts);
  }

  // ==========================================
  // State Transformations
  // ==========================================

  /**
   * Transform state data for API response
   * @param {Object} state - State data
   * @param {Object} options - Transformation options
   * @returns {Object} Transformed state
   */
  transformState(state, options = {}) {
    if (!state) return null;

    const data = state.toJSON ? state.toJSON() : state;
    const opts = { ...this.options, ...options };

    return this.cleanObject({
      id: data.id,
      code: data.code,
      name: data.name,
      nativeName: data.native_name || data.nativeName,
      country: data.country ? {
        id: data.country.id,
        code: data.country.code,
        name: data.country.name
      } : null,
      countryId: data.country_id || data.countryId,
      countryName: data.country ? data.country.name : null,
      capital: data.capital,
      population: data.population,
      populationFormatted: this.formatNumber(data.population),
      areaKm2: data.area_km2 || data.areaKm2,
      areaFormatted: data.area_km2 || data.areaKm2 ? 
        `${this.formatNumber(data.area_km2 || data.areaKm2)} km²` : 'N/A',
      isActive: data.is_active === 1 || data.is_active === true || data.isActive === true,
      displayName: this.getDisplayName(data),
      fullName: this.getFullName(data),
      createdAt: this.formatDate(data.created_at || data.createdAt),
      updatedAt: this.formatDate(data.updated_at || data.updatedAt),
      deletedAt: this.formatDate(data.deleted_at || data.deletedAt)
    }, opts);
  }

  /**
   * Transform multiple states
   * @param {Array} states - Array of state data
   * @param {Object} options - Transformation options
   * @returns {Array} Transformed states
   */
  transformStates(states, options = {}) {
    if (!states || !Array.isArray(states)) return [];
    return states.map(state => this.transformState(state, options));
  }

  /**
   * Transform state for summary view
   */
  transformStateSummary(state, options = {}) {
    if (!state) return null;

    const data = state.toJSON ? state.toJSON() : state;
    const opts = { ...this.options, ...options };

    return this.cleanObject({
      id: data.id,
      code: data.code,
      name: data.name,
      nativeName: data.native_name || data.nativeName,
      countryName: data.country ? data.country.name : null,
      capital: data.capital,
      population: data.population,
      populationFormatted: this.formatNumber(data.population),
      isActive: data.is_active === 1 || data.is_active === true || data.isActive === true
    }, opts);
  }

  // ==========================================
  // City Transformations
  // ==========================================

  /**
   * Transform city data for API response
   * @param {Object} city - City data
   * @param {Object} options - Transformation options
   * @returns {Object} Transformed city
   */
  transformCity(city, options = {}) {
    if (!city) return null;

    const data = city.toJSON ? city.toJSON() : city;
    const opts = { ...this.options, ...options };

    return this.cleanObject({
      id: data.id,
      name: data.name,
      nativeName: data.native_name || data.nativeName,
      state: data.state ? {
        id: data.state.id,
        code: data.state.code,
        name: data.state.name,
        country: data.state.country ? {
          id: data.state.country.id,
          code: data.state.country.code,
          name: data.state.country.name
        } : null
      } : null,
      stateId: data.state_id || data.stateId,
      stateName: data.state ? data.state.name : null,
      countryName: data.state && data.state.country ? data.state.country.name : null,
      population: data.population,
      populationFormatted: this.formatNumber(data.population),
      latitude: data.latitude,
      longitude: data.longitude,
      hasCoordinates: data.latitude !== null && data.longitude !== null,
      coordinatesFormatted: data.latitude !== null && data.longitude !== null ?
        `${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}` : 'N/A',
      timezone: data.timezone ? {
        id: data.timezone.id,
        name: data.timezone.name,
        offset: data.timezone.offset,
        code: data.timezone.code
      } : null,
      postalCode: data.postal_code || data.postalCode,
      isCapital: data.is_capital === 1 || data.is_capital === true || data.isCapital === true,
      isActive: data.is_active === 1 || data.is_active === true || data.isActive === true,
      displayName: this.getDisplayName(data),
      fullName: this.getFullName(data),
      fullNameWithCountry: this.getFullNameWithCountry(data),
      createdAt: this.formatDate(data.created_at || data.createdAt),
      updatedAt: this.formatDate(data.updated_at || data.updatedAt),
      deletedAt: this.formatDate(data.deleted_at || data.deletedAt)
    }, opts);
  }

  /**
   * Transform multiple cities
   * @param {Array} cities - Array of city data
   * @param {Object} options - Transformation options
   * @returns {Array} Transformed cities
   */
  transformCities(cities, options = {}) {
    if (!cities || !Array.isArray(cities)) return [];
    return cities.map(city => this.transformCity(city, options));
  }

  /**
   * Transform city for summary view
   */
  transformCitySummary(city, options = {}) {
    if (!city) return null;

    const data = city.toJSON ? city.toJSON() : city;
    const opts = { ...this.options, ...options };

    return this.cleanObject({
      id: data.id,
      name: data.name,
      nativeName: data.native_name || data.nativeName,
      stateName: data.state ? data.state.name : null,
      countryName: data.state && data.state.country ? data.state.country.name : null,
      population: data.population,
      populationFormatted: this.formatNumber(data.population),
      isCapital: data.is_capital === 1 || data.is_capital === true || data.isCapital === true,
      isActive: data.is_active === 1 || data.is_active === true || data.isActive === true
    }, opts);
  }

  // ==========================================
  // Continent Transformations
  // ==========================================

  /**
   * Transform continent data for API response
   */
  transformContinent(continent, options = {}) {
    if (!continent) return null;

    const data = continent.toJSON ? continent.toJSON() : continent;
    const opts = { ...this.options, ...options };

    return this.cleanObject({
      id: data.id,
      code: data.code,
      name: data.name,
      createdAt: this.formatDate(data.created_at || data.createdAt),
      updatedAt: this.formatDate(data.updated_at || data.updatedAt)
    }, opts);
  }

  /**
   * Transform multiple continents
   */
  transformContinents(continents, options = {}) {
    if (!continents || !Array.isArray(continents)) return [];
    return continents.map(continent => this.transformContinent(continent, options));
  }

  // ==========================================
  // Generic Transformations
  // ==========================================

  /**
   * Transform any geography entity
   * @param {Object} data - Entity data
   * @param {string} type - Entity type (country, state, city, continent)
   * @param {Object} options - Transformation options
   * @returns {Object} Transformed entity
   */
  transform(data, type = 'country', options = {}) {
    switch (type) {
      case 'country':
        return this.transformCountry(data, options);
      case 'state':
        return this.transformState(data, options);
      case 'city':
        return this.transformCity(data, options);
      case 'continent':
        return this.transformContinent(data, options);
      default:
        throw new Error(`Unknown entity type: ${type}`);
    }
  }

  /**
   * Transform multiple entities
   */
  transformMany(dataArray, type = 'country', options = {}) {
    if (!dataArray || !Array.isArray(dataArray)) return [];
    return dataArray.map(data => this.transform(data, type, options));
  }

  // ==========================================
  // Pagination Transformations
  // ==========================================

  /**
   * Transform pagination metadata
   * @param {Object} pagination - Pagination data
   * @param {Object} options - Transformation options
   * @returns {Object} Transformed pagination
   */
  transformPagination(pagination, options = {}) {
    if (!pagination) return null;

    return {
      page: pagination.page || 1,
      limit: pagination.limit || 10,
      total: pagination.total || 0,
      totalPages: Math.ceil((pagination.total || 0) / (pagination.limit || 10)),
      hasNext: ((pagination.page || 1) * (pagination.limit || 10)) < (pagination.total || 0),
      hasPrevious: (pagination.page || 1) > 1,
      nextPage: ((pagination.page || 1) * (pagination.limit || 10)) < (pagination.total || 0) ? 
        (pagination.page || 1) + 1 : null,
      previousPage: (pagination.page || 1) > 1 ? (pagination.page || 1) - 1 : null
    };
  }

  // ==========================================
  // Helper Methods
  // ==========================================

  /**
   * Get display name (native name if available)
   */
  getDisplayName(entity) {
    if (!entity) return '';
    return entity.native_name || entity.nativeName || entity.name || '';
  }

  /**
   * Get full name with hierarchy
   */
  getFullName(entity) {
    if (!entity) return '';
    
    let name = entity.name || '';
    
    if (entity.state) {
      const stateName = entity.state.name || '';
      if (stateName) {
        return `${name}, ${stateName}`;
      }
    }
    
    if (entity.country) {
      const countryName = entity.country.name || '';
      if (countryName) {
        return `${name}, ${countryName}`;
      }
    }
    
    return name;
  }

  /**
   * Get full name with country
   */
  getFullNameWithCountry(entity) {
    if (!entity) return '';
    
    let name = entity.name || '';
    const stateName = entity.state ? entity.state.name : null;
    const countryName = entity.state && entity.state.country ? entity.state.country.name : 
                        entity.country ? entity.country.name : null;
    
    if (stateName && countryName) {
      return `${name}, ${stateName}, ${countryName}`;
    }
    if (stateName) {
      return `${name}, ${stateName}`;
    }
    if (countryName) {
      return `${name}, ${countryName}`;
    }
    return name;
  }

  /**
   * Get status text
   */
  getStatus(isActive) {
    return isActive ? 'active' : 'inactive';
  }

  /**
   * Get status badge color
   */
  getStatusColor(isActive) {
    return isActive ? 'green' : 'red';
  }

  /**
   * Get location string from coordinates
   */
  getLocation(entity) {
    if (!entity) return '';
    const lat = entity.latitude;
    const lng = entity.longitude;
    if (lat !== undefined && lat !== null && lng !== undefined && lng !== null) {
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
    return '';
  }

  /**
   * Get coordinates object
   */
  getCoordinates(entity) {
    if (!entity) return null;
    const lat = entity.latitude;
    const lng = entity.longitude;
    if (lat !== undefined && lat !== null && lng !== undefined && lng !== null) {
      return {
        latitude: lat,
        longitude: lng,
        formatted: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
      };
    }
    return null;
  }

  /**
   * Check if entity has coordinates
   */
  hasCoordinates(entity) {
    if (!entity) return false;
    const lat = entity.latitude;
    const lng = entity.longitude;
    return lat !== undefined && lat !== null && lng !== undefined && lng !== null;
  }

  /**
   * Get population density description
   */
  getPopulationDensityDescription(density) {
    if (!density) return 'N/A';
    if (density < 10) return 'Very low';
    if (density < 50) return 'Low';
    if (density < 100) return 'Moderate';
    if (density < 500) return 'High';
    if (density < 1000) return 'Very high';
    return 'Extremely high';
  }

  /**
   * Transform search results
   */
  transformSearchResults(results, type = 'country', options = {}) {
    if (!results || !Array.isArray(results)) return [];
    return results.map(result => ({
      ...this.transform(result, type, options),
      score: result.score || null,
      matchType: result.matchType || null
    }));
  }

  /**
   * Transform for export
   */
  transformForExport(data, type = 'country', fields = [], options = {}) {
    if (!data || !Array.isArray(data)) return [];

    const transformed = this.transformMany(data, type, options);
    
    if (fields.length === 0) {
      return transformed;
    }

    return transformed.map(item => {
      const exportItem = {};
      fields.forEach(field => {
        if (item[field] !== undefined) {
          exportItem[field] = item[field];
        }
      });
      return exportItem;
    });
  }
}

export default new GeographyTransformer();