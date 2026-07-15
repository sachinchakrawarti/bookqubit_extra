/**
 * City Public Repository
 * Public read-only operations for cities
 */

import { City, State, Country } from '../../models/sequelize/index.js';
import { Op } from 'sequelize';
import { BaseRepository } from '../../core/base/BaseRepository.js';
import { LoggerService } from '../../services/logger.js';

const logger = new LoggerService('public:city:repository');

class CityRepository extends BaseRepository {
  constructor() {
    super(City);
    this.model = City;
    this.name = 'City';
  }

  /**
   * Get all cities (public)
   * @param {Object} filters - Filter options
   * @returns {Promise<Object>} Paginated cities
   */
  async getAll(filters = {}) {
    try {
      const { page = 1, limit = 10, search, stateId, countryId, isCapital, sortBy = 'name', sortOrder = 'ASC' } = filters;
      
      const where = { deleted_at: null };
      
      if (search) {
        where[Op.or] = [
          { name: { [Op.like]: `%${search}%` } },
          { native_name: { [Op.like]: `%${search}%` } }
        ];
      }
      
      if (stateId) {
        where.state_id = stateId;
      }
      
      if (isCapital !== undefined && isCapital !== null) {
        where.is_capital = isCapital === true || isCapital === 'true';
      }

      const include = [
        {
          model: State,
          as: 'state',
          attributes: ['id', 'name', 'code'],
          where: { deleted_at: null },
          include: [
            {
              model: Country,
              as: 'country',
              attributes: ['id', 'name', 'code'],
              where: { deleted_at: null }
            }
          ]
        }
      ];

      // If countryId is provided, filter through state
      if (countryId) {
        include[0].where.country_id = countryId;
      }

      const { count, rows } = await this.model.findAndCountAll({
        where,
        include,
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
   * Get city by ID (public)
   * @param {number} id - City ID
   * @returns {Promise<Object>} City data
   */
  async findById(id) {
    try {
      return await this.model.findByPk(id, {
        include: [
          {
            model: State,
            as: 'state',
            attributes: ['id', 'name', 'code'],
            where: { deleted_at: null },
            include: [
              {
                model: Country,
                as: 'country',
                attributes: ['id', 'name', 'code'],
                where: { deleted_at: null }
              }
            ]
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
   * Get cities by state (public)
   * @param {number} stateId - State ID
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Cities
   */
  async getByState(stateId, options = {}) {
    try {
      const { limit = 100, offset = 0, isCapital } = options;
      
      const where = { 
        state_id: stateId,
        deleted_at: null 
      };
      
      if (isCapital !== undefined && isCapital !== null) {
        where.is_capital = isCapital === true || isCapital === 'true';
      }

      return await this.model.findAll({
        where,
        include: [
          {
            model: State,
            as: 'state',
            attributes: ['id', 'name', 'code'],
            where: { deleted_at: null }
          }
        ],
        order: [['name', 'ASC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });
    } catch (error) {
      logger.logError(error, { method: 'getByState', stateId });
      throw error;
    }
  }

  /**
   * Get capital cities (public)
   * @param {Object} filters - Filter options
   * @returns {Promise<Object>} Paginated capital cities
   */
  async getCapitals(filters = {}) {
    try {
      const { page = 1, limit = 10, countryId } = filters;
      
      const include = [
        {
          model: State,
          as: 'state',
          attributes: ['id', 'name', 'code'],
          where: { deleted_at: null },
          include: [
            {
              model: Country,
              as: 'country',
              attributes: ['id', 'name', 'code'],
              where: { deleted_at: null }
            }
          ]
        }
      ];

      if (countryId) {
        include[0].where.country_id = countryId;
      }

      const where = { 
        is_capital: true,
        deleted_at: null 
      };

      const { count, rows } = await this.model.findAndCountAll({
        where,
        include,
        order: [['name', 'ASC']],
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
      logger.logError(error, { method: 'getCapitals', filters });
      throw error;
    }
  }

  /**
   * Search cities (public)
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise<Array>} Search results
   */
  async search(query, options = {}) {
    try {
      const { limit = 20, offset = 0, stateId, countryId } = options;
      
      const where = {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { native_name: { [Op.like]: `%${query}%` } },
          { postal_code: { [Op.like]: `%${query}%` } }
        ],
        deleted_at: null
      };

      const include = [
        {
          model: State,
          as: 'state',
          attributes: ['id', 'name', 'code'],
          where: { deleted_at: null },
          include: [
            {
              model: Country,
              as: 'country',
              attributes: ['id', 'name', 'code'],
              where: { deleted_at: null }
            }
          ]
        }
      ];

      if (stateId) {
        where.state_id = stateId;
      }

      if (countryId) {
        include[0].where.country_id = countryId;
      }

      return await this.model.findAll({
        where,
        include,
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
   * Find cities by coordinates (nearby) - public
   * @param {number} latitude - Latitude
   * @param {number} longitude - Longitude
   * @param {number} radius - Radius in km (default: 10)
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Nearby cities
   */
  async findNearby(latitude, longitude, radius = 10, options = {}) {
    try {
      const { limit = 20 } = options;
      
      // Rough approximation for distance (1 degree ≈ 111 km)
      const degreeOffset = radius / 111;
      
      return await this.model.findAll({
        where: {
          latitude: {
            [Op.between]: [latitude - degreeOffset, latitude + degreeOffset]
          },
          longitude: {
            [Op.between]: [longitude - degreeOffset, longitude + degreeOffset]
          },
          deleted_at: null
        },
        include: [
          {
            model: State,
            as: 'state',
            attributes: ['id', 'name', 'code'],
            where: { deleted_at: null },
            include: [
              {
                model: Country,
                as: 'country',
                attributes: ['id', 'name', 'code'],
                where: { deleted_at: null }
              }
            ]
          }
        ],
        limit: parseInt(limit),
        order: [['name', 'ASC']]
      });
    } catch (error) {
      logger.logError(error, { method: 'findNearby', latitude, longitude });
      throw error;
    }
  }

  /**
   * Get city statistics (public)
   * @param {number} id - City ID
   * @returns {Promise<Object>} City statistics
   */
  async getStatistics(id) {
    try {
      const city = await this.model.findByPk(id, {
        include: [
          {
            model: State,
            as: 'state',
            attributes: ['id', 'name', 'code'],
            where: { deleted_at: null },
            include: [
              {
                model: Country,
                as: 'country',
                attributes: ['id', 'name', 'code'],
                where: { deleted_at: null }
              }
            ]
          }
        ],
        where: { deleted_at: null }
      });

      if (!city) {
        return null;
      }

      // Count nearby cities (within 50km)
      let nearbyCount = 0;
      if (city.latitude && city.longitude) {
        const degreeOffset = 50 / 111;
        nearbyCount = await City.count({
          where: {
            id: { [Op.ne]: id },
            latitude: {
              [Op.between]: [city.latitude - degreeOffset, city.latitude + degreeOffset]
            },
            longitude: {
              [Op.between]: [city.longitude - degreeOffset, city.longitude + degreeOffset]
            },
            deleted_at: null
          }
        });
      }

      return {
        city_id: city.id,
        city_name: city.name,
        state_name: city.state ? city.state.name : null,
        country_name: city.state && city.state.country ? city.state.country.name : null,
        is_capital: city.is_capital,
        population: city.population || null,
        area: city.area || null,
        has_coordinates: !!(city.latitude && city.longitude),
        nearby_cities_count: nearbyCount
      };
    } catch (error) {
      logger.logError(error, { method: 'getStatistics', id });
      throw error;
    }
  }
}

export default new CityRepository();