/**
 * Authors Service
 * Business logic for authors operations
 */

class AuthorsService {
  constructor(authorsRepository) {
    this.repository = authorsRepository;
  }

  /**
   * Create a new authors
   * @param {Object} data - authors data
   * @returns {Promise<Object>} Created authors
   */
  async create(data) {
    // Add business logic here
    return this.repository.create(data);
  }

  /**
   * Get all authorss with pagination
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
   * Get a single authors by ID
   * @param {string} id - authors ID
   * @returns {Promise<Object>} authors data
   */
  async findById(id) {
    const result = await this.repository.findById(id);
    if (!result) {
      throw new Error('Authors not found');
    }
    return result;
  }

  /**
   * Update a authors
   * @param {string} id - authors ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated authors
   */
  async update(id, data) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Authors not found');
    }
    return this.repository.update(id, data);
  }

  /**
   * Delete a authors
   * @param {string} id - authors ID
   * @returns {Promise<boolean>} Deletion status
   */
  async delete(id) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Authors not found');
    }
    await this.repository.delete(id);
    return true;
  }
}

export default AuthorsService;