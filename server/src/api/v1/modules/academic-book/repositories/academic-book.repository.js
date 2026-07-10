/**
 * Academic-Book Repository
 * Database operations for academic-book
 */

import db from '../../../../database/connection.js';

class Academic-BookRepository {
  /**
   * Create a new academic-book
   * @param {Object} data - academic-book data
   * @returns {Promise<Object>} Created academic-book
   */
  async create(data) {
    const [result] = await db.query('INSERT INTO academic-book SET ?', data);
    return result;
  }

  /**
   * Get all academic-books with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.offset - Offset for pagination
   * @param {number} params.limit - Items per page
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<Array>} List of academic-books
   */
  async findAll({ offset, limit, filters }) {
    let query = 'SELECT * FROM academic-book WHERE 1=1';
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
   * Get a single academic-book by ID
   * @param {string} id - academic-book ID
   * @returns {Promise<Object>} academic-book data
   */
  async findById(id) {
    const [result] = await db.query('SELECT * FROM academic-book WHERE id = ?', [id]);
    return result;
  }

  /**
   * Update a academic-book
   * @param {string} id - academic-book ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated academic-book
   */
  async update(id, data) {
    const [result] = await db.query('UPDATE academic-book SET ? WHERE id = ?', [data, id]);
    return result;
  }

  /**
   * Delete a academic-book
   * @param {string} id - academic-book ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    await db.query('DELETE FROM academic-book WHERE id = ?', [id]);
  }

  /**
   * Check if a academic-book exists
   * @param {string} id - academic-book ID
   * @returns {Promise<boolean>} Existence status
   */
  async exists(id) {
    const [result] = await db.query('SELECT 1 FROM academic-book WHERE id = ?', [id]);
    return !!result;
  }

  /**
   * Count academic-books
   * @param {Object} params - Filter parameters
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<number>} Total count
   */
  async count({ filters }) {
    let query = 'SELECT COUNT(*) as total FROM academic-book WHERE 1=1';
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

export default Academic-BookRepository;