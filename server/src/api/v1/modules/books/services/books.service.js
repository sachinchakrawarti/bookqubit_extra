/**
 * Books Service
 * Business logic for books operations
 */

class BooksService {
  constructor(booksRepository) {
    this.repository = booksRepository;
  }

  /**
   * Create a new books
   * @param {Object} data - books data
   * @returns {Promise<Object>} Created books
   */
  async create(data) {
    // Add business logic here
    return this.repository.create(data);
  }

  /**
   * Get all bookss with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<Object>} Paginated results
   */
  async findAll({ page, limit, filters }) {
    const offset = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.repository.findAll({ offset, limit, filters }),
      this.repository.count({ filters }),
    ]);

    return {
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get a single books by ID
   * @param {string} id - books ID
   * @returns {Promise<Object>} books data
   */
  async findById(id) {
    const result = await this.repository.findById(id);
    if (!result) {
      throw new Error('Books not found');
    }
    return result;
  }

  /**
   * Update a books
   * @param {string} id - books ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated books
   */
  async update(id, data) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Books not found');
    }
    return this.repository.update(id, data);
  }

  /**
   * Delete a books
   * @param {string} id - books ID
   * @returns {Promise<boolean>} Deletion status
   */
  async delete(id) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Books not found');
    }
    await this.repository.delete(id);
    return true;
  }
}

export default BooksService;