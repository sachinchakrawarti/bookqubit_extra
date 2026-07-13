/**
 * Country Filters
 * Builds WHERE conditions for country queries with various filters
 */

import { WhereBuilder } from '../builders/index.js';

export class CountryFilters {
  /**
   * Apply search filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {string} value - Search query
   * @returns {WhereBuilder} Where builder instance
   */
  static search(builder, value) {
    if (value && value.length >= 2) {
      builder.addSearch(['name', 'code', 'native_name', 'capital'], value);
    }
    return builder;
  }

  /**
   * Apply continent filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {number} value - Continent ID
   * @returns {WhereBuilder} Where builder instance
   */
  static continent(builder, value) {
    return builder.addEquals('continent_id', value);
  }

  /**
   * Apply region filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {number} value - Region ID
   * @returns {WhereBuilder} Where builder instance
   */
  static region(builder, value) {
    return builder.addEquals('region_id', value);
  }

  /**
   * Apply subregion filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {number} value - Subregion ID
   * @returns {WhereBuilder} Where builder instance
   */
  static subregion(builder, value) {
    return builder.addEquals('subregion_id', value);
  }

  /**
   * Apply currency filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {string} value - Currency code
   * @returns {WhereBuilder} Where builder instance
   */
  static currency(builder, value) {
    return builder.addEquals('currency_code', value);
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
   * Apply area range filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {number} min - Minimum area
   * @param {number} max - Maximum area
   * @returns {WhereBuilder} Where builder instance
   */
  static areaRange(builder, min, max) {
    return builder.addRange('area_km2', min, max);
  }

  /**
   * Apply has states filter
   * @param {WhereBuilder} builder - Where builder instance
   * @param {boolean} value - Has states
   * @returns {WhereBuilder} Where builder instance
   */
  static hasStates(builder, value) {
    if (value !== undefined) {
      // This requires a join, handled in the query builder
      // We'll add a placeholder that will be processed later
      builder.addRaw({ hasStates: value });
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
      // Don't add soft delete condition - include deleted
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
    if (filters.continentId || filters.continent_id) {
      this.continent(builder, filters.continentId || filters.continent_id);
    }
    if (filters.regionId || filters.region_id) {
      this.region(builder, filters.regionId || filters.region_id);
    }
    if (filters.subregionId || filters.subregion_id) {
      this.subregion(builder, filters.subregionId || filters.subregion_id);
    }
    if (filters.currencyCode || filters.currency_code) {
      this.currency(builder, filters.currencyCode || filters.currency_code);
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
    if (filters.minArea || filters.maxArea || filters.min_area || filters.max_area) {
      this.areaRange(
        builder,
        filters.minArea || filters.min_area,
        filters.maxArea || filters.max_area
      );
    }
    if (filters.hasStates !== undefined) {
      this.hasStates(builder, filters.hasStates);
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
    
    // Apply additional filters
    if (filters.search) this.search(builder, filters.search);
    if (filters.continentId) this.continent(builder, filters.continentId);
    
    return builder.build();
  }
}

export default CountryFilters;