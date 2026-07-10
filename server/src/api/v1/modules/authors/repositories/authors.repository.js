/**
 * Authors Repository
 * Database operations for authors
 */

import db from '../../../../database/connection.js';

class AuthorsRepository {
  /**
   * Create a new authors
   * @param {Object} data - authors data
   * @returns {Promise<Object>} Created authors
   */
  async create(data) {
    const [result] = await db.query('INSERT INTO authors SET ?', data);
    return result;
  }

  /**
   * Get all authorss with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.offset - Offset for pagination
   * @param {number} params.limit - Items per page
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<Array>} List of authorss
   */
  async findAll({ offset, limit, filters }) {
    let query = 'SELECT * FROM authors WHERE 1=1';
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
   * Get a single authors by ID
   * @param {string} id - authors ID
   * @returns {Promise<Object>} authors data
   */
  async findById(id) {
    const [result] = await db.query('SELECT * FROM authors WHERE id = ?', [id]);
    return result;
  }

  /**
   * Update a authors
   * @param {string} id - authors ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated authors
   */
  async update(id, data) {
    const [result] = await db.query('UPDATE authors SET ? WHERE id = ?', [data, id]);
    return result;
  }

  /**
   * Delete a authors
   * @param {string} id - authors ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    await db.query('DELETE FROM authors WHERE id = ?', [id]);
  }

  /**
   * Check if a authors exists
   * @param {string} id - authors ID
   * @returns {Promise<boolean>} Existence status
   */
  async exists(id) {
    const [result] = await db.query('SELECT 1 FROM authors WHERE id = ?', [id]);
    return !!result;
  }

  /**
   * Count authorss
   * @param {Object} params - Filter parameters
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<number>} Total count
   */
  async count({ filters }) {
    let query = 'SELECT COUNT(*) as total FROM authors WHERE 1=1';
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

export default AuthorsRepository;