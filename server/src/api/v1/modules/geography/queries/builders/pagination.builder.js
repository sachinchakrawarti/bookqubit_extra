/**
 * Pagination Builder
 * Builds pagination options for Sequelize queries
 * Provides flexible pagination with validation
 */

export class PaginationBuilder {
  /**
   * Create a pagination builder
   * @param {Object} options - Pagination options
   * @param {number} options.page - Page number (default: 1)
   * @param {number} options.limit - Items per page (default: 10, max: 100)
   * @param {number} options.maxLimit - Maximum limit allowed (default: 100)
   * @param {number} options.defaultLimit - Default limit (default: 10)
   */
  constructor(options = {}) {
    this.page = Math.max(1, parseInt(options.page) || 1);
    this.defaultLimit = options.defaultLimit || 10;
    this.maxLimit = options.maxLimit || 100;
    
    let limit = parseInt(options.limit) || this.defaultLimit;
    this.limit = Math.min(Math.max(1, limit), this.maxLimit);
    
    this.offset = (this.page - 1) * this.limit;
  }

  /**
   * Get pagination options for Sequelize
   * @returns {Object} Sequelize pagination options
   */
  getOptions() {
    return {
      limit: this.limit,
      offset: this.offset
    };
  }

  /**
   * Get pagination metadata
   * @param {number} total - Total number of items
   * @returns {Object} Pagination metadata
   */
  getMetadata(total) {
    const totalPages = Math.ceil(total / this.limit);
    return {
      page: this.page,
      limit: this.limit,
      total: total,
      totalPages: totalPages,
      hasNext: this.page < totalPages,
      hasPrevious: this.page > 1,
      nextPage: this.page < totalPages ? this.page + 1 : null,
      previousPage: this.page > 1 ? this.page - 1 : null
    };
  }

  /**
   * Get pagination info for response
   * @param {number} total - Total number of items
   * @returns {Object} Pagination info
   */
  getInfo(total) {
    const totalPages = Math.ceil(total / this.limit);
    return {
      page: this.page,
      limit: this.limit,
      totalItems: total,
      totalPages: totalPages,
      itemsPerPage: this.limit,
      currentPage: this.page,
      hasNextPage: this.page < totalPages,
      hasPrevPage: this.page > 1
    };
  }

  /**
   * Get start and end indices for current page
   * @param {number} total - Total number of items
   * @returns {Object} Start and end indices
   */
  getRange(total) {
    const start = this.offset;
    const end = Math.min(this.offset + this.limit, total);
    return {
      start: start + 1,
      end: end,
      total: total
    };
  }

  /**
   * Check if there are more pages
   * @param {number} total - Total number of items
   * @returns {boolean} True if there are more pages
   */
  hasMore(total) {
    return this.offset + this.limit < total;
  }

  /**
   * Static factory method
   * @param {Object} options - Pagination options
   * @returns {PaginationBuilder} Pagination builder instance
   */
  static create(options = {}) {
    return new PaginationBuilder(options);
  }

  /**
   * Create pagination info from request query
   * @param {Object} query - Request query object
   * @param {number} total - Total number of items
   * @returns {Object} Pagination info
   */
  static fromRequest(query, total) {
    const builder = new PaginationBuilder({
      page: query.page,
      limit: query.limit
    });
    return builder.getInfo(total);
  }
}

export default PaginationBuilder;