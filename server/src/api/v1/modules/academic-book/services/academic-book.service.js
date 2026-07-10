/**
 * Academic-Book Service
 * Business logic for academic-book operations
 */

class Academic-BookService {
  constructor(academic-BookRepository) {
    this.repository = academic-BookRepository;
  }

  /**
   * Create a new academic-book
   * @param {Object} data - academic-book data
   * @returns {Promise<Object>} Created academic-book
   */
  async create(data) {
    // Add business logic here
    return this.repository.create(data);
  }

  /**
   * Get all academic-books with pagination
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
   * Get a single academic-book by ID
   * @param {string} id - academic-book ID
   * @returns {Promise<Object>} academic-book data
   */
  async findById(id) {
    const result = await this.repository.findById(id);
    if (!result) {
      throw new Error('Academic-Book not found');
    }
    return result;
  }

  /**
   * Update a academic-book
   * @param {string} id - academic-book ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated academic-book
   */
  async update(id, data) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Academic-Book not found');
    }
    return this.repository.update(id, data);
  }

  /**
   * Delete a academic-book
   * @param {string} id - academic-book ID
   * @returns {Promise<boolean>} Deletion status
   */
  async delete(id) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Academic-Book not found');
    }
    await this.repository.delete(id);
    return true;
  }
}

export default Academic-BookService;