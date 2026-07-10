/**
 * Publications Service
 * Business logic for publications operations
 */

class PublicationsService {
  constructor(publicationsRepository) {
    this.repository = publicationsRepository;
  }

  /**
   * Create a new publications
   * @param {Object} data - publications data
   * @returns {Promise<Object>} Created publications
   */
  async create(data) {
    // Add business logic here
    return this.repository.create(data);
  }

  /**
   * Get all publicationss with pagination
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
   * Get a single publications by ID
   * @param {string} id - publications ID
   * @returns {Promise<Object>} publications data
   */
  async findById(id) {
    const result = await this.repository.findById(id);
    if (!result) {
      throw new Error('Publications not found');
    }
    return result;
  }

  /**
   * Update a publications
   * @param {string} id - publications ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated publications
   */
  async update(id, data) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Publications not found');
    }
    return this.repository.update(id, data);
  }

  /**
   * Delete a publications
   * @param {string} id - publications ID
   * @returns {Promise<boolean>} Deletion status
   */
  async delete(id) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Publications not found');
    }
    await this.repository.delete(id);
    return true;
  }
}

export default PublicationsService;