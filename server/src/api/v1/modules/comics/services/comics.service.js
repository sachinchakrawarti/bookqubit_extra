/**
 * Comics Service
 * Business logic for comics operations
 */

class ComicsService {
  constructor(comicsRepository) {
    this.repository = comicsRepository;
  }

  /**
   * Create a new comics
   * @param {Object} data - comics data
   * @returns {Promise<Object>} Created comics
   */
  async create(data) {
    // Add business logic here
    return this.repository.create(data);
  }

  /**
   * Get all comicss with pagination
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
   * Get a single comics by ID
   * @param {string} id - comics ID
   * @returns {Promise<Object>} comics data
   */
  async findById(id) {
    const result = await this.repository.findById(id);
    if (!result) {
      throw new Error('Comics not found');
    }
    return result;
  }

  /**
   * Update a comics
   * @param {string} id - comics ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated comics
   */
  async update(id, data) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Comics not found');
    }
    return this.repository.update(id, data);
  }

  /**
   * Delete a comics
   * @param {string} id - comics ID
   * @returns {Promise<boolean>} Deletion status
   */
  async delete(id) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Comics not found');
    }
    await this.repository.delete(id);
    return true;
  }
}

export default ComicsService;