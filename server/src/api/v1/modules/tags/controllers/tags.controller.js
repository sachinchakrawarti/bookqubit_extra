/**
 * Tags Controller
 */

class TagsController {
  constructor(tagsService) {
    this.service = tagsService;
  }

  /**
   * Create a new tags
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
        message: 'Tags created successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all tagss
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
   * Get a single tags by ID
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
   * Update a tags
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
        message: 'Tags updated successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a tags
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
        message: 'Tags deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default TagsController;