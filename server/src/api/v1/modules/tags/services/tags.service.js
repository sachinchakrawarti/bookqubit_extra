/**
 * Tags Service
 * Business logic for tags operations
 */

class TagsService {
  constructor(tagsRepository) {
    this.repository = tagsRepository;
  }

  /**
   * Create a new tags
   * @param {Object} data - tags data
   * @returns {Promise<Object>} Created tags
   */
  async create(data) {
    // Add business logic here
    return this.repository.create(data);
  }

  /**
   * Get all tagss with pagination
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
   * Get a single tags by ID
   * @param {string} id - tags ID
   * @returns {Promise<Object>} tags data
   */
  async findById(id) {
    const result = await this.repository.findById(id);
    if (!result) {
      throw new Error('Tags not found');
    }
    return result;
  }

  /**
   * Update a tags
   * @param {string} id - tags ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated tags
   */
  async update(id, data) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Tags not found');
    }
    return this.repository.update(id, data);
  }

  /**
   * Delete a tags
   * @param {string} id - tags ID
   * @returns {Promise<boolean>} Deletion status
   */
  async delete(id) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Tags not found');
    }
    await this.repository.delete(id);
    return true;
  }
}

export default TagsService;