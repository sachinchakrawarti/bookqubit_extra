/**
 * Languages Repository
 * Database operations for languages
 */

import db from '../../../../database/connection.js';

class LanguagesRepository {
  /**
   * Create a new languages
   * @param {Object} data - languages data
   * @returns {Promise<Object>} Created languages
   */
  async create(data) {
    const [result] = await db.query('INSERT INTO languages SET ?', data);
    return result;
  }

  /**
   * Get all languagess with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.offset - Offset for pagination
   * @param {number} params.limit - Items per page
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<Array>} List of languagess
   */
  async findAll({ offset, limit, filters }) {
    let query = 'SELECT * FROM languages WHERE 1=1';
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
   * Get a single languages by ID
   * @param {string} id - languages ID
   * @returns {Promise<Object>} languages data
   */
  async findById(id) {
    const [result] = await db.query('SELECT * FROM languages WHERE id = ?', [id]);
    return result;
  }

  /**
   * Update a languages
   * @param {string} id - languages ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated languages
   */
  async update(id, data) {
    const [result] = await db.query('UPDATE languages SET ? WHERE id = ?', [data, id]);
    return result;
  }

  /**
   * Delete a languages
   * @param {string} id - languages ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    await db.query('DELETE FROM languages WHERE id = ?', [id]);
  }

  /**
   * Check if a languages exists
   * @param {string} id - languages ID
   * @returns {Promise<boolean>} Existence status
   */
  async exists(id) {
    const [result] = await db.query('SELECT 1 FROM languages WHERE id = ?', [id]);
    return !!result;
  }

  /**
   * Count languagess
   * @param {Object} params - Filter parameters
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<number>} Total count
   */
  async count({ filters }) {
    let query = 'SELECT COUNT(*) as total FROM languages WHERE 1=1';
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

export default LanguagesRepository;