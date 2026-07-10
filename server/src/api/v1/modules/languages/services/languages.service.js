/**
 * Languages Service
 * Business logic for languages operations
 */

class LanguagesService {
  constructor(languagesRepository) {
    this.repository = languagesRepository;
  }

  /**
   * Create a new languages
   * @param {Object} data - languages data
   * @returns {Promise<Object>} Created languages
   */
  async create(data) {
    // Add business logic here
    return this.repository.create(data);
  }

  /**
   * Get all languagess with pagination
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
   * Get a single languages by ID
   * @param {string} id - languages ID
   * @returns {Promise<Object>} languages data
   */
  async findById(id) {
    const result = await this.repository.findById(id);
    if (!result) {
      throw new Error('Languages not found');
    }
    return result;
  }

  /**
   * Update a languages
   * @param {string} id - languages ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated languages
   */
  async update(id, data) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Languages not found');
    }
    return this.repository.update(id, data);
  }

  /**
   * Delete a languages
   * @param {string} id - languages ID
   * @returns {Promise<boolean>} Deletion status
   */
  async delete(id) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Languages not found');
    }
    await this.repository.delete(id);
    return true;
  }
}

export default LanguagesService;