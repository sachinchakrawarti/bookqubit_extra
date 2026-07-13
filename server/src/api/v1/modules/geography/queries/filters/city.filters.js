/**
 * City Filters
 * Builds WHERE conditions for city queries with various filters
 */

import { WhereBuilder } from '../builders/index.js';

export class CityFilters {
  /**
   * Apply search filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {string} value - Search query
   * @returns {WhereBuilder} Where builder instance
   */
  static search(builder, value) {
    if (value && value.length >= 2) {
      builder.addSearch(['name', 'native_name', 'postal_code'], value);
    }
    return builder;
  }

  /**
   * Apply state filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {number} value - State ID
   * @returns {WhereBuilder} Where builder instance
   */
  static state(builder, value) {
    return builder.addEquals('state_id', value);
  }

  /**
   * Apply state code filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {string} value - State code
   * @returns {WhereBuilder} Where builder instance
   */
  static stateCode(builder, value) {
    // This requires a join, handled in the query builder
    builder.addRaw({ stateCode: value });
    return builder;
  }

  /**
   * Apply country filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {number} value - Country ID
   * @returns {WhereBuilder} Where builder instance
   */
  static country(builder, value) {
    // This requires a join, handled in the query builder
    builder.addRaw({ countryId: value });
    return builder;
  }

  /**
   * Apply country code filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {string} value - Country code
   * @returns {WhereBuilder} Where builder instance
   */
  static countryCode(builder, value) {
    // This requires a join, handled in the query builder
    builder.addRaw({ countryCode: value });
    return builder;
  }

  /**
   * Apply capital filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {boolean} value - Is capital
   * @returns {WhereBuilder} Where builder instance
   */
  static capital(builder, value) {
    if (value !== undefined) {
      builder.addEquals('is_capital', value ? 1 : 0);
    }
    return builder;
  }

  /**
   * Apply status filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {boolean|string} value - Active status
   * @returns {WhereBuilder} Where builder instance
   */
  static status(builder, value) {
    if (value !== undefined && value !== null) {
      const isActive = value === 'active' || value === true || value === 1;
      builder.addEquals('is_active', isActive ? 1 : 0);
    }
    return builder;
  }

  /**
   * Apply population range filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {number} min - Minimum population
   * @param {number} max - Maximum population
   * @returns {WhereBuilder} Where builder instance
   */
  static populationRange(builder, min, max) {
    return builder.addRange('population', min, max);
  }

  /**
   * Apply coordinates filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {boolean} value - Has coordinates
   * @returns {WhereBuilder} Where builder instance
   */
  static hasCoordinates(builder, value) {
    if (value) {
      builder.addNotNull('latitude').addNotNull('longitude');
    }
    return builder;
  }

  /**
   * Apply timezone filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {number} value - Timezone ID
   * @returns {WhereBuilder} Where builder instance
   */
  static timezone(builder, value) {
    return builder.addEquals('timezone_id', value);
  }

  /**
   * Apply deleted filter (for admin)
   * @param {WhereBuilder} builder - Where builder instance
   * @param {boolean} value - Include deleted
   * @returns {WhereBuilder} Where builder instance
   */
  static deleted(builder, value) {
    if (value) {
      return builder;
    }
    return builder.addSoftDelete();
  }

  /**
   * Apply all filters
   * @param {Object} filters - Filter object
   * @param {boolean} includeDeleted - Include deleted records
   * @returns {Object} Sequelize WHERE conditions
   */
  static applyAll(filters = {}, includeDeleted = false) {
    const builder = WhereBuilder.create();
    
    // Apply filters
    if (filters.search) this.search(builder, filters.search);
    if (filters.stateId || filters.state_id) {
      this.state(builder, filters.stateId || filters.state_id);
    }
    if (filters.stateCode || filters.state_code) {
      this.stateCode(builder, filters.stateCode || filters.state_code);
    }
    if (filters.countryId || filters.country_id) {
      this.country(builder, filters.countryId || filters.country_id);
    }
    if (filters.countryCode || filters.country_code) {
      this.countryCode(builder, filters.countryCode || filters.country_code);
    }
    if (filters.isCapital !== undefined) {
      this.capital(builder, filters.isCapital);
    }
    if (filters.isActive !== undefined) {
      this.status(builder, filters.isActive);
    }
    if (filters.minPopulation || filters.maxPopulation || filters.min_population || filters.max_population) {
      this.populationRange(
        builder,
        filters.minPopulation || filters.min_population,
        filters.maxPopulation || filters.max_population
      );
    }
    if (filters.hasCoordinates !== undefined) {
      this.hasCoordinates(builder, filters.hasCoordinates);
    }
    if (filters.timezoneId || filters.timezone_id) {
      this.timezone(builder, filters.timezoneId || filters.timezone_id);
    }
    
    // Add soft delete if not including deleted
    if (!includeDeleted) {
      builder.addSoftDelete();
    }
    
    return builder.build();
  }

  /**
   * Apply all filters for admin (includes deleted)
   * @param {Object} filters - Filter object
   * @returns {Object} Sequelize WHERE conditions
   */
  static applyAdmin(filters = {}) {
    return this.applyAll(filters, true);
  }

  /**
   * Get deleted filter
   * @param {Object} filters - Filter object
   * @returns {Object} Sequelize WHERE conditions
   */
  static getDeleted(filters = {}) {
    const builder = WhereBuilder.create()
      .addNotNull('deleted_at');
    
    if (filters.search) this.search(builder, filters.search);
    if (filters.stateId) this.state(builder, filters.stateId);
    
    return builder.build();
  }

  /**
   * Get capitals filter
   * @param {Object} filters - Filter object
   * @returns {Object} Sequelize WHERE conditions
   */
  static getCapitals(filters = {}) {
    const builder = WhereBuilder.create()
      .addEquals('is_capital', 1)
      .addSoftDelete();
    
    if (filters.search) this.search(builder, filters.search);
    if (filters.countryId) this.country(builder, filters.countryId);
    if (filters.isActive !== undefined) this.status(builder, filters.isActive);
    
    return builder.build();
  }
}

export default CityFilters;