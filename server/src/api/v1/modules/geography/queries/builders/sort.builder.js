/**
 * Sort Builder
 * Builds sort options for Sequelize queries
 * Provides flexible sorting with validation
 */

export class SortBuilder {
  /**
   * Create a sort builder
   * @param {Object} options - Sort options
   * @param {string} options.sortBy - Sort field (default: 'name')
   * @param {string} options.sortOrder - Sort order (ASC/DESC, default: 'ASC')
   * @param {Array} options.allowedFields - Allowed sort fields
   * @param {string} options.defaultField - Default sort field
   * @param {string} options.defaultOrder - Default sort order
   */
  constructor(options = {}) {
    this.defaultField = options.defaultField || 'name';
    this.defaultOrder = options.defaultOrder || 'ASC';
    
    this.allowedFields = options.allowedFields || [
      'id', 'name', 'code', 'population', 'area_km2',
      'created_at', 'updated_at', 'is_active'
    ];
    
    this.field = this.validateField(options.sortBy);
    this.order = this.validateOrder(options.sortOrder);
  }

  /**
   * Validate sort field
   * @param {string} field - Sort field
   * @returns {string} Validated sort field
   */
  validateField(field) {
    if (!field) return this.defaultField;
    if (this.allowedFields.includes(field)) return field;
    return this.defaultField;
  }

  /**
   * Validate sort order
   * @param {string} order - Sort order
   * @returns {string} Validated sort order
   */
  validateOrder(order) {
    const validOrders = ['ASC', 'DESC'];
    if (!order) return this.defaultOrder;
    const upperOrder = order.toUpperCase();
    if (validOrders.includes(upperOrder)) return upperOrder;
    return this.defaultOrder;
  }

  /**
   * Get sort options for Sequelize
   * @returns {Array} Sequelize sort options [[field, order]]
   */
  getOptions() {
    return [[this.field, this.order]];
  }

  /**
   * Get sort as string (for raw queries)
   * @returns {string} Sort string (e.g., "name ASC")
   */
  getString() {
    return `${this.field} ${this.order}`;
  }

  /**
   * Get sort as object
   * @returns {Object} Sort object { field, order }
   */
  getObject() {
    return {
      field: this.field,
      order: this.order
    };
  }

  /**
   * Add a field to allowed fields
   * @param {string|Array} fields - Field or array of fields to add
   * @returns {SortBuilder} This builder instance
   */
  addAllowedFields(fields) {
    if (Array.isArray(fields)) {
      this.allowedFields = [...this.allowedFields, ...fields];
    } else {
      this.allowedFields.push(fields);
    }
    return this;
  }

  /**
   * Get the sort field with table prefix
   * @param {string} table - Table name or alias
   * @returns {string} Qualified field name
   */
  getQualifiedField(table) {
    return `${table}.${this.field}`;
  }

  /**
   * Static factory method
   * @param {Object} options - Sort options
   * @returns {SortBuilder} Sort builder instance
   */
  static create(options = {}) {
    return new SortBuilder(options);
  }

  /**
   * Create sort options from request query
   * @param {Object} query - Request query object
   * @param {Array} allowedFields - Allowed sort fields
   * @returns {SortBuilder} Sort builder instance
   */
  static fromRequest(query, allowedFields = null) {
    const options = {
      sortBy: query.sortBy,
      sortOrder: query.sortOrder
    };
    if (allowedFields) {
      options.allowedFields = allowedFields;
    }
    return new SortBuilder(options);
  }
}

export default SortBuilder;