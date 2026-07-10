/**
 * Category Service
 * Business logic for category operations
 */

class CategoryService {
  constructor(categoryRepository) {
    this.repository = categoryRepository;
  }

  /**
   * Create a new category
   * @param {Object} data - category data
   * @returns {Promise<Object>} Created category
   */
  async create(data) {
    // Add business logic here
    return this.repository.create(data);
  }

  /**
   * Get all categorys with pagination
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
   * Get a single category by ID
   * @param {string} id - category ID
   * @returns {Promise<Object>} category data
   */
  async findById(id) {
    const result = await this.repository.findById(id);
    if (!result) {
      throw new Error('Category not found');
    }
    return result;
  }

  /**
   * Update a category
   * @param {string} id - category ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated category
   */
  async update(id, data) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Category not found');
    }
    return this.repository.update(id, data);
  }

  /**
   * Delete a category
   * @param {string} id - category ID
   * @returns {Promise<boolean>} Deletion status
   */
  async delete(id) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new Error('Category not found');
    }
    await this.repository.delete(id);
    return true;
  }
}

export default CategoryService;