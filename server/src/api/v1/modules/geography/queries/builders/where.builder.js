/**
 * Where Builder
 * Builds WHERE conditions for Sequelize queries
 * Provides fluent interface for building complex conditions
 */

import { Op } from 'sequelize';

export class WhereBuilder {
  /**
   * Create a where builder
   */
  constructor() {
    this.conditions = {};
    this.groupedConditions = {};
    this.rawConditions = [];
  }

  /**
   * Add equality condition
   * @param {string} field - Field name
   * @param {*} value - Field value
   * @returns {WhereBuilder} This builder instance
   */
  addEquals(field, value) {
    if (value !== undefined && value !== null && value !== '') {
      this.conditions[field] = value;
    }
    return this;
  }

  /**
   * Add not equals condition
   * @param {string} field - Field name
   * @param {*} value - Field value
   * @returns {WhereBuilder} This builder instance
   */
  addNotEquals(field, value) {
    if (value !== undefined && value !== null) {
      this.conditions[field] = { [Op.ne]: value };
    }
    return this;
  }

  /**
   * Add IN condition
   * @param {string} field - Field name
   * @param {Array} values - Array of values
   * @returns {WhereBuilder} This builder instance
   */
  addIn(field, values) {
    if (values && Array.isArray(values) && values.length > 0) {
      this.conditions[field] = { [Op.in]: values };
    }
    return this;
  }

  /**
   * Add NOT IN condition
   * @param {string} field - Field name
   * @param {Array} values - Array of values
   * @returns {WhereBuilder} This builder instance
   */
  addNotIn(field, values) {
    if (values && Array.isArray(values) && values.length > 0) {
      this.conditions[field] = { [Op.notIn]: values };
    }
    return this;
  }

  /**
   * Add LIKE condition (search)
   * @param {string|Array} fields - Field name or array of fields
   * @param {string} query - Search query
   * @param {boolean} caseSensitive - Case sensitive search (default: false)
   * @returns {WhereBuilder} This builder instance
   */
  addSearch(fields, query, caseSensitive = false) {
    if (!query || query.length < 2) return this;
    
    const searchFields = Array.isArray(fields) ? fields : [fields];
    const likeOp = caseSensitive ? Op.like : Op.iLike;
    
    if (searchFields.length === 1) {
      this.conditions[searchFields[0]] = { [likeOp]: `%${query}%` };
    } else {
      this.conditions[Op.or] = searchFields.map(field => ({
        [field]: { [likeOp]: `%${query}%` }
      }));
    }
    return this;
  }

  /**
   * Add range condition
   * @param {string} field - Field name
   * @param {*} min - Minimum value
   * @param {*} max - Maximum value
   * @returns {WhereBuilder} This builder instance
   */
  addRange(field, min, max) {
    if (min !== undefined || max !== undefined) {
      this.conditions[field] = {};
      if (min !== undefined && min !== null && min !== '') {
        this.conditions[field][Op.gte] = min;
      }
      if (max !== undefined && max !== null && max !== '') {
        this.conditions[field][Op.lte] = max;
      }
      // If both are empty, remove the condition
      if (Object.keys(this.conditions[field]).length === 0) {
        delete this.conditions[field];
      }
    }
    return this;
  }

  /**
   * Add BETWEEN condition
   * @param {string} field - Field name
   * @param {*} start - Start value
   * @param {*} end - End value
   * @returns {WhereBuilder} This builder instance
   */
  addBetween(field, start, end) {
    if (start !== undefined && end !== undefined && start !== null && end !== null) {
      this.conditions[field] = { [Op.between]: [start, end] };
    }
    return this;
  }

  /**
   * Add NOT NULL condition
   * @param {string} field - Field name
   * @returns {WhereBuilder} This builder instance
   */
  addNotNull(field) {
    this.conditions[field] = { [Op.ne]: null };
    return this;
  }

  /**
   * Add IS NULL condition
   * @param {string} field - Field name
   * @returns {WhereBuilder} This builder instance
   */
  addIsNull(field) {
    this.conditions[field] = null;
    return this;
  }

  /**
   * Add OR condition
   * @param {Object} conditions - OR conditions
   * @returns {WhereBuilder} This builder instance
   */
  addOr(conditions) {
    if (conditions && Object.keys(conditions).length > 0) {
      if (!this.conditions[Op.or]) {
        this.conditions[Op.or] = [];
      }
      this.conditions[Op.or].push(conditions);
    }
    return this;
  }

  /**
   * Add AND condition
   * @param {Object} conditions - AND conditions
   * @returns {WhereBuilder} This builder instance
   */
  addAnd(conditions) {
    if (conditions && Object.keys(conditions).length > 0) {
      if (!this.conditions[Op.and]) {
        this.conditions[Op.and] = [];
      }
      this.conditions[Op.and].push(conditions);
    }
    return this;
  }

  /**
   * Add raw condition (for complex queries)
   * @param {Object} condition - Raw Sequelize condition
   * @returns {WhereBuilder} This builder instance
   */
  addRaw(condition) {
    if (condition && Object.keys(condition).length > 0) {
      this.rawConditions.push(condition);
    }
    return this;
  }

  /**
   * Add soft delete condition (deleted_at IS NULL)
   * @returns {WhereBuilder} This builder instance
   */
  addSoftDelete() {
    this.addIsNull('deleted_at');
    return this;
  }

  /**
   * Add active condition (is_active = true)
   * @param {boolean} active - Active status (default: true)
   * @returns {WhereBuilder} This builder instance
   */
  addActive(active = true) {
    if (active !== undefined) {
      this.addEquals('is_active', active ? 1 : 0);
    }
    return this;
  }

  /**
   * Build and return conditions
   * @returns {Object} Sequelize WHERE conditions
   */
  build() {
    let conditions = { ...this.conditions };
    
    // Apply raw conditions
    for (const raw of this.rawConditions) {
      conditions = { ...conditions, ...raw };
    }
    
    return conditions;
  }

  /**
   * Check if conditions are empty
   * @returns {boolean} True if no conditions
   */
  isEmpty() {
    return Object.keys(this.conditions).length === 0 && this.rawConditions.length === 0;
  }

  /**
   * Clear all conditions
   * @returns {WhereBuilder} This builder instance
   */
  clear() {
    this.conditions = {};
    this.rawConditions = [];
    return this;
  }

  /**
   * Get number of conditions
   * @returns {number} Number of conditions
   */
  count() {
    return Object.keys(this.conditions).length + this.rawConditions.length;
  }

  /**
   * Static factory method
   * @returns {WhereBuilder} Where builder instance
   */
  static create() {
    return new WhereBuilder();
  }

  /**
   * Create from filter object
   * @param {Object} filters - Filter object
   * @param {Object} mapping - Field mapping
   * @returns {WhereBuilder} Where builder instance
   */
  static fromFilters(filters, mapping = {}) {
    const builder = new WhereBuilder();
    
    for (const [key, value] of Object.entries(filters)) {
      const field = mapping[key] || key;
      if (value !== undefined && value !== null && value !== '') {
        builder.addEquals(field, value);
      }
    }
    
    return builder;
  }
}

export default WhereBuilder;