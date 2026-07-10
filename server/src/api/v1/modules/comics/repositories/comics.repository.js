/**
 * Comics Repository
 * Database operations for comics
 */

import db from '../../../../database/connection.js';

class ComicsRepository {
  /**
   * Create a new comics
   * @param {Object} data - comics data
   * @returns {Promise<Object>} Created comics
   */
  async create(data) {
    const [result] = await db.query('INSERT INTO comics SET ?', data);
    return result;
  }

  /**
   * Get all comicss with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.offset - Offset for pagination
   * @param {number} params.limit - Items per page
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<Array>} List of comicss
   */
  async findAll({ offset, limit, filters }) {
    let query = 'SELECT * FROM comics WHERE 1=1';
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
   * Get a single comics by ID
   * @param {string} id - comics ID
   * @returns {Promise<Object>} comics data
   */
  async findById(id) {
    const [result] = await db.query('SELECT * FROM comics WHERE id = ?', [id]);
    return result;
  }

  /**
   * Update a comics
   * @param {string} id - comics ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated comics
   */
  async update(id, data) {
    const [result] = await db.query('UPDATE comics SET ? WHERE id = ?', [data, id]);
    return result;
  }

  /**
   * Delete a comics
   * @param {string} id - comics ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    await db.query('DELETE FROM comics WHERE id = ?', [id]);
  }

  /**
   * Check if a comics exists
   * @param {string} id - comics ID
   * @returns {Promise<boolean>} Existence status
   */
  async exists(id) {
    const [result] = await db.query('SELECT 1 FROM comics WHERE id = ?', [id]);
    return !!result;
  }

  /**
   * Count comicss
   * @param {Object} params - Filter parameters
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<number>} Total count
   */
  async count({ filters }) {
    let query = 'SELECT COUNT(*) as total FROM comics WHERE 1=1';
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

export default ComicsRepository;