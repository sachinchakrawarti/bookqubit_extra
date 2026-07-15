/**
 * State Public Repository
 * Public read-only operations for states
 */

import { State, Country, City } from '../../models/sequelize/index.js';
import { Op } from 'sequelize';
import { BaseRepository } from '../../core/base/BaseRepository.js';
import { LoggerService } from '../../services/logger.js';

const logger = new LoggerService('public:state:repository');

class StateRepository extends BaseRepository {
  constructor() {
    super(State);
    this.model = State;
    this.name = 'State';
  }

  /**
   * Get all states (public)
   * @param {Object} filters - Filter options
   * @returns {Promise<Object>} Paginated states
   */
  async getAll(filters = {}) {
    try {
      const { page = 1, limit = 10, search, countryId, sortBy = 'name', sortOrder = 'ASC' } = filters;
      
      const where = { deleted_at: null };
      
      if (search) {
        where[Op.or] = [
          { name: { [Op.like]: `%${search}%` } },
          { code: { [Op.like]: `%${search}%` } }
        ];
      }
      
      if (countryId) {
        where.country_id = countryId;
      }

      const { count, rows } = await this.model.findAndCountAll({
        where,
        include: [
          {
            model: Country,
            as: 'country',
            attributes: ['id', 'name', 'code'],
            where: { deleted_at: null }
          },
          {
            model: City,
            as: 'cities',
            attributes: ['id', 'name'],
            where: { deleted_at: null },
            required: false,
            limit: 10
          }
        ],
        order: [[sortBy, sortOrder]],
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit)
      });
      
      return {
        data: rows,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      };
    } catch (error) {
      logger.logError(error, { method: 'getAll', filters });
      throw error;
    }
  }

  /**
   * Get state by ID (public)
   * @param {number} id - State ID
   * @returns {Promise<Object>} State data
   */
  async findById(id) {
    try {
      return await this.model.findByPk(id, {
        include: [
          {
            model: Country,
            as: 'country',
            attributes: ['id', 'name', 'code'],
            where: { deleted_at: null }
          },
          {
            model: City,
            as: 'cities',
            attributes: ['id', 'name', 'is_capital'],
            where: { deleted_at: null },
            required: false
          }
        ],
        where: { deleted_at: null }
      });
    } catch (error) {
      logger.logError(error, { method: 'findById', id });
      throw error;
    }
  }

  /**
   * Get states by country (public)
   * @param {number} countryId - Country ID
   * @param {Object} options - Query options
   * @returns {Promise<Array>} States
   */
  async getByCountry(countryId, options = {}) {
    try {
      const { limit = 100, offset = 0 } = options;
      
      return await this.model.findAll({
        where: { 
          country_id: countryId,
          deleted_at: null 
        },
        include: [
          {
            model: City,
            as: 'cities',
            attributes: ['id', 'name', 'is_capital'],
            where: { deleted_at: null },
            required: false,
            limit: 10
          }
        ],
        order: [['name', 'ASC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });
    } catch (error) {
      logger.logError(error, { method: 'getByCountry', countryId });
      throw error;
    }
  }

  /**
   * Search states (public)
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise<Array>} Search results
   */
  async search(query, options = {}) {
    try {
      const { limit = 20, offset = 0, countryId } = options;
      
      const where = {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { code: { [Op.like]: `%${query}%` } }
        ],
        deleted_at: null
      };
      
      if (countryId) {
        where.country_id = countryId;
      }

      return await this.model.findAll({
        where,
        include: [
          {
            model: Country,
            as: 'country',
            attributes: ['id', 'name', 'code'],
            where: { deleted_at: null }
          }
        ],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['name', 'ASC']]
      });
    } catch (error) {
      logger.logError(error, { method: 'search', query });
      throw error;
    }
  }

  /**
   * Get state statistics (public)
   * @param {number} id - State ID
   * @returns {Promise<Object>} State statistics
   */
  async getStatistics(id) {
    try {
      const state = await this.model.findByPk(id, {
        include: [
          {
            model: Country,
            as: 'country',
            attributes: ['id', 'name', 'code'],
            where: { deleted_at: null }
          }
        ],
        where: { deleted_at: null }
      });

      if (!state) {
        return null;
      }

      const cityCount = await City.count({
        where: { 
          state_id: id,
          deleted_at: null 
        }
      });

      const capitalCity = await City.findOne({
        where: {
          state_id: id,
          is_capital: true,
          deleted_at: null
        },
        attributes: ['id', 'name']
      });

      return {
        state_id: state.id,
        state_name: state.name,
        state_code: state.code,
        country_name: state.country ? state.country.name : null,
        country_code: state.country ? state.country.code : null,
        city_count: cityCount,
        capital_city: capitalCity ? capitalCity.name : null,
        has_capital: !!capitalCity
      };
    } catch (error) {
      logger.logError(error, { method: 'getStatistics', id });
      throw error;
    }
  }
}

export default new StateRepository();