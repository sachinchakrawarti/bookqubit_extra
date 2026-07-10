/**
 * Books Repository
 * Database operations for books
 */

import db from '../../../../database/connection.js';

class BooksRepository {
  /**
   * Create a new books
   * @param {Object} data - books data
   * @returns {Promise<Object>} Created books
   */
  async create(data) {
    const [result] = await db.query('INSERT INTO books SET ?', data);
    return result;
  }

  /**
   * Get all bookss with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.offset - Offset for pagination
   * @param {number} params.limit - Items per page
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<Array>} List of bookss
   */
  async findAll({ offset, limit, filters }) {
    let query = 'SELECT * FROM books WHERE 1=1';
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
   * Get a single books by ID
   * @param {string} id - books ID
   * @returns {Promise<Object>} books data
   */
  async findById(id) {
    const [result] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
    return result;
  }

  /**
   * Update a books
   * @param {string} id - books ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated books
   */
  async update(id, data) {
    const [result] = await db.query('UPDATE books SET ? WHERE id = ?', [data, id]);
    return result;
  }

  /**
   * Delete a books
   * @param {string} id - books ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    await db.query('DELETE FROM books WHERE id = ?', [id]);
  }

  /**
   * Check if a books exists
   * @param {string} id - books ID
   * @returns {Promise<boolean>} Existence status
   */
  async exists(id) {
    const [result] = await db.query('SELECT 1 FROM books WHERE id = ?', [id]);
    return !!result;
  }

  /**
   * Count bookss
   * @param {Object} params - Filter parameters
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<number>} Total count
   */
  async count({ filters }) {
    let query = 'SELECT COUNT(*) as total FROM books WHERE 1=1';
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

export default BooksRepository;