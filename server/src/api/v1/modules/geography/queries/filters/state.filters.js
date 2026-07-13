/**
 * State Filters
 * Builds WHERE conditions for state queries with various filters
 */

import { WhereBuilder } from '../builders/index.js';

export class StateFilters {
  /**
   * Apply search filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {string} value - Search query
   * @returns {WhereBuilder} Where builder instance
   */
  static search(builder, value) {
    if (value && value.length >= 2) {
      builder.addSearch(['name', 'code', 'native_name'], value);
    }
    return builder;
  }

  /**
   * Apply country filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {number} value - Country ID
   * @returns {WhereBuilder} Where builder instance
   */
  static country(builder, value) {
    return builder.addEquals('country_id', value);
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
   * Apply has cities filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {boolean} value - Has cities
   * @returns {WhereBuilder} Where builder instance
   */
  static hasCities(builder, value) {
    if (value !== undefined) {
      builder.addRaw({ hasCities: value });
    }
    return builder;
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
    if (filters.countryId || filters.country_id) {
      this.country(builder, filters.countryId || filters.country_id);
    }
    if (filters.countryCode || filters.country_code) {
      this.countryCode(builder, filters.countryCode || filters.country_code);
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
    if (filters.hasCities !== undefined) {
      this.hasCities(builder, filters.hasCities);
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
    if (filters.countryId) this.country(builder, filters.countryId);
    
    return builder.build();
  }
}

export default StateFilters;