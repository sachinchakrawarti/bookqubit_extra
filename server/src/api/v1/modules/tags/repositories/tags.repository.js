/**
 * Tags Repository
 * Database operations for tags
 */

import db from '../../../../database/connection.js';

class TagsRepository {
  /**
   * Create a new tags
   * @param {Object} data - tags data
   * @returns {Promise<Object>} Created tags
   */
  async create(data) {
    const [result] = await db.query('INSERT INTO tags SET ?', data);
    return result;
  }

  /**
   * Get all tagss with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.offset - Offset for pagination
   * @param {number} params.limit - Items per page
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<Array>} List of tagss
   */
  async findAll({ offset, limit, filters }) {
    let query = 'SELECT * FROM tags WHERE 1=1';
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
   * Get a single tags by ID
   * @param {string} id - tags ID
   * @returns {Promise<Object>} tags data
   */
  async findById(id) {
    const [result] = await db.query('SELECT * FROM tags WHERE id = ?', [id]);
    return result;
  }

  /**
   * Update a tags
   * @param {string} id - tags ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated tags
   */
  async update(id, data) {
    const [result] = await db.query('UPDATE tags SET ? WHERE id = ?', [data, id]);
    return result;
  }

  /**
   * Delete a tags
   * @param {string} id - tags ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    await db.query('DELETE FROM tags WHERE id = ?', [id]);
  }

  /**
   * Check if a tags exists
   * @param {string} id - tags ID
   * @returns {Promise<boolean>} Existence status
   */
  async exists(id) {
    const [result] = await db.query('SELECT 1 FROM tags WHERE id = ?', [id]);
    return !!result;
  }

  /**
   * Count tagss
   * @param {Object} params - Filter parameters
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<number>} Total count
   */
  async count({ filters }) {
    let query = 'SELECT COUNT(*) as total FROM tags WHERE 1=1';
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

export default TagsRepository;