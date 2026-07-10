/**
 * Publications Repository
 * Database operations for publications
 */

import db from '../../../../database/connection.js';

class PublicationsRepository {
  /**
   * Create a new publications
   * @param {Object} data - publications data
   * @returns {Promise<Object>} Created publications
   */
  async create(data) {
    const [result] = await db.query('INSERT INTO publications SET ?', data);
    return result;
  }

  /**
   * Get all publicationss with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.offset - Offset for pagination
   * @param {number} params.limit - Items per page
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<Array>} List of publicationss
   */
  async findAll({ offset, limit, filters }) {
    let query = 'SELECT * FROM publications WHERE 1=1';
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
   * Get a single publications by ID
   * @param {string} id - publications ID
   * @returns {Promise<Object>} publications data
   */
  async findById(id) {
    const [result] = await db.query('SELECT * FROM publications WHERE id = ?', [id]);
    return result;
  }

  /**
   * Update a publications
   * @param {string} id - publications ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated publications
   */
  async update(id, data) {
    const [result] = await db.query('UPDATE publications SET ? WHERE id = ?', [data, id]);
    return result;
  }

  /**
   * Delete a publications
   * @param {string} id - publications ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    await db.query('DELETE FROM publications WHERE id = ?', [id]);
  }

  /**
   * Check if a publications exists
   * @param {string} id - publications ID
   * @returns {Promise<boolean>} Existence status
   */
  async exists(id) {
    const [result] = await db.query('SELECT 1 FROM publications WHERE id = ?', [id]);
    return !!result;
  }

  /**
   * Count publicationss
   * @param {Object} params - Filter parameters
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<number>} Total count
   */
  async count({ filters }) {
    let query = 'SELECT COUNT(*) as total FROM publications WHERE 1=1';
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

export default PublicationsRepository;