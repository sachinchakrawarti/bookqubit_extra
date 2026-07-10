/**
 * Auth Repository
 * Database operations for auth
 */

import db from '../../../../database/connection.js';

class AuthRepository {
  /**
   * Create a new auth
   * @param {Object} data - auth data
   * @returns {Promise<Object>} Created auth
   */
  async create(data) {
    const [result] = await db.query('INSERT INTO auth SET ?', data);
    return result;
  }

  /**
   * Get all auths with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.offset - Offset for pagination
   * @param {number} params.limit - Items per page
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<Array>} List of auths
   */
  async findAll({ offset, limit, filters }) {
    let query = 'SELECT * FROM auth WHERE 1=1';
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
   * Get a single auth by ID
   * @param {string} id - auth ID
   * @returns {Promise<Object>} auth data
   */
  async findById(id) {
    const [result] = await db.query('SELECT * FROM auth WHERE id = ?', [id]);
    return result;
  }

  /**
   * Update a auth
   * @param {string} id - auth ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated auth
   */
  async update(id, data) {
    const [result] = await db.query('UPDATE auth SET ? WHERE id = ?', [data, id]);
    return result;
  }

  /**
   * Delete a auth
   * @param {string} id - auth ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    await db.query('DELETE FROM auth WHERE id = ?', [id]);
  }

  /**
   * Check if a auth exists
   * @param {string} id - auth ID
   * @returns {Promise<boolean>} Existence status
   */
  async exists(id) {
    const [result] = await db.query('SELECT 1 FROM auth WHERE id = ?', [id]);
    return !!result;
  }

  /**
   * Count auths
   * @param {Object} params - Filter parameters
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<number>} Total count
   */
  async count({ filters }) {
    let query = 'SELECT COUNT(*) as total FROM auth WHERE 1=1';
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

export default AuthRepository;