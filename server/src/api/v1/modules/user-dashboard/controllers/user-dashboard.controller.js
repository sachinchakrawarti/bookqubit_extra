/**
 * User-Dashboard Controller
 */

class User-DashboardController {
  constructor(user-DashboardService) {
    this.service = user-DashboardService;
  }

  /**
   * Create a new user-dashboard
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async create(req, res, next) {
    try {
      const data = req.body;
      const result = await this.service.create(data);
      res.status(201).json({
        success: true,
        message: 'User-Dashboard created successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all user-dashboards
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async findAll(req, res, next) {
    try {
      const { page = 1, limit = 10, ...filters } = req.query;
      const result = await this.service.findAll({ page, limit, filters });
      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a single user-dashboard by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.service.findById(id);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update a user-dashboard
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.service.update(id, data);
      res.json({
        success: true,
        message: 'User-Dashboard updated successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a user-dashboard
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.json({
        success: true,
        message: 'User-Dashboard deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default User-DashboardController;