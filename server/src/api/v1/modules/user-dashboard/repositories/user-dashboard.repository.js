/**
 * User-Dashboard Repository
 * Database operations for user-dashboard
 */

import db from '../../../../database/connection.js';

class User-DashboardRepository {
  /**
   * Create a new user-dashboard
   * @param {Object} data - user-dashboard data
   * @returns {Promise<Object>} Created user-dashboard
   */
  async create(data) {
    const [result] = await db.query('INSERT INTO user-dashboard SET ?', data);
    return result;
  }

  /**
   * Get all user-dashboards with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.offset - Offset for pagination
   * @param {number} params.limit - Items per page
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<Array>} List of user-dashboards
   */
  async findAll({ offset, limit, filters }) {
    let query = 'SELECT * FROM user-dashboard WHERE 1=1';
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
   * Get a single user-dashboard by ID
   * @param {string} id - user-dashboard ID
   * @returns {Promise<Object>} user-dashboard data
   */
  async findById(id) {
    const [result] = await db.query('SELECT * FROM user-dashboard WHERE id = ?', [id]);
    return result;
  }

  /**
   * Update a user-dashboard
   * @param {string} id - user-dashboard ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated user-dashboard
   */
  async update(id, data) {
    const [result] = await db.query('UPDATE user-dashboard SET ? WHERE id = ?', [data, id]);
    return result;
  }

  /**
   * Delete a user-dashboard
   * @param {string} id - user-dashboard ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    await db.query('DELETE FROM user-dashboard WHERE id = ?', [id]);
  }

  /**
   * Check if a user-dashboard exists
   * @param {string} id - user-dashboard ID
   * @returns {Promise<boolean>} Existence status
   */
  async exists(id) {
    const [result] = await db.query('SELECT 1 FROM user-dashboard WHERE id = ?', [id]);
    return !!result;
  }

  /**
   * Count user-dashboards
   * @param {Object} params - Filter parameters
   * @param {Object} params.filters - Filter criteria
   * @returns {Promise<number>} Total count
   */
  async count({ filters }) {
    let query = 'SELECT COUNT(*) as total FROM user-dashboard WHERE 1=1';
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

export default User-DashboardRepository;