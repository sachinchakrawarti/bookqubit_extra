/**
 * User-Dashboard Service
 * Business logic for user-dashboard operations
 */

class User-DashboardService {
  constructor(user-DashboardRepository) {
    this.repository = user-DashboardRepository;
  }

  /**
   * Create a new user-dashboard
   * @param {Object} data - user-dashboard data
   * @returns {Promise<Object>} Created user-dashboard
   */
  async create(data) {
    // Add business logic here
    return this.repository.create(data);
  }

  /**
   * Get all user-dashboards with pagination
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
   * Get a single user-dashboard by ID
   * @param {string} id - user-dashboard ID
   * @returns {Promise<Object>} user-dashboard data
   */
  async findById(id) {
    const result = await this.repository.findById(id);
    if (!result) {
      throw new Error('User-Dashboard not found');
    }
    return result;
  }

  /**
   * Update a user-dashboard
   * @param {string} id - user-dashboard ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated user-dashboard
   */
  async update(id, data) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('User-Dashboard not found');
    }
    return this.repository.update(id, data);
  }

  /**
   * Delete a user-dashboard
   * @param {string} id - user-dashboard ID
   * @returns {Promise<boolean>} Deletion status
   */
  async delete(id) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('User-Dashboard not found');
    }
    await this.repository.delete(id);
    return true;
  }
}

export default User-DashboardService;