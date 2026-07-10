/**
 * Auth Service
 * Business logic for auth operations
 */

class AuthService {
  constructor(authRepository) {
    this.repository = authRepository;
  }

  /**
   * Create a new auth
   * @param {Object} data - auth data
   * @returns {Promise<Object>} Created auth
   */
  async create(data) {
    // Add business logic here
    return this.repository.create(data);
  }

  /**
   * Get all auths with pagination
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
   * Get a single auth by ID
   * @param {string} id - auth ID
   * @returns {Promise<Object>} auth data
   */
  async findById(id) {
    const result = await this.repository.findById(id);
    if (!result) {
      throw new Error('Auth not found');
    }
    return result;
  }

  /**
   * Update a auth
   * @param {string} id - auth ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated auth
   */
  async update(id, data) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Auth not found');
    }
    return this.repository.update(id, data);
  }

  /**
   * Delete a auth
   * @param {string} id - auth ID
   * @returns {Promise<boolean>} Deletion status
   */
  async delete(id) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Auth not found');
    }
    await this.repository.delete(id);
    return true;
  }
}

export default AuthService;