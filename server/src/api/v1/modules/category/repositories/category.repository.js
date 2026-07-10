/**
 * Category Repository
 * Database operations for category
 */

import db from '../../../../database/connection.js';

class CategoryRepository {
  /**
   * Create a new category
   * @param {Object} data - category data
   * @returns {Promise<Object>} Created category
   */
  async create(data) {
    const [result] = await db.query('INSERT INTO category SET ?', data);
    return result;
  }

  /**
   * Get all categorys with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.offset - Offset for pagination
   * @param {number} params.limit - Items per page
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<Array>} List of categorys
   */
  async findAll({ offset, limit, filters }) {
    let query = 'SELECT * FROM category WHERE 1=1';
    const values = [];

    // Add filters
    if (filters && Object.keys(filters).length) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          query += ` AND ${key} = ?`;
          values.push(value);
        }
      });
    }

    query += ' LIMIT ? OFFSET ?';
    values.push(limit, offset);

    return db.query(query, values);
  }

  /**
   * Get a single category by ID
   * @param {string} id - category ID
   * @returns {Promise<Object>} category data
   */
  async findById(id) {
    const [result] = await db.query('SELECT * FROM category WHERE id = ?', [id]);
    return result;
  }

  /**
   * Update a category
   * @param {string} id - category ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated category
   */
  async update(id, data) {
    const [result] = await db.query('UPDATE category SET ? WHERE id = ?', [data, id]);
    return result;
  }

  /**
   * Delete a category
   * @param {string} id - category ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    await db.query('DELETE FROM category WHERE id = ?', [id]);
  }

  /**
   * Check if a category exists
   * @param {string} id - category ID
   * @returns {Promise<boolean>} Existence status
   */
  async exists(id) {
    const [result] = await db.query('SELECT 1 FROM category WHERE id = ?', [id]);
    return !!result;
  }

  /**
   * Count categorys
   * @param {Object} params - Filter parameters
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<number>} Total count
   */
  async count({ filters }) {
    let query = 'SELECT COUNT(*) as total FROM category WHERE 1=1';
    const values = [];

    if (filters && Object.keys(filters).length) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          query += ` AND ${key} = ?`;
          values.push(value);
        }
      });
    }

    const [result] = await db.query(query, values);
    return result.total;
  }
}

export default CategoryRepository;