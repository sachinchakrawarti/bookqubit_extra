/**
 * Country Public Repository
 * Public read-only operations for countries
 */

import { Country, State, City } from '../../models/sequelize/index.js';
import { Op } from 'sequelize';
import { BaseRepository } from '../../core/base/BaseRepository.js';
import { LoggerService } from '../../services/logger.js';

const logger = new LoggerService('public:country:repository');

class CountryRepository extends BaseRepository {
  constructor() {
    super(Country);
    this.model = Country;
    this.name = 'Country';
  }

  async getAll(filters = {}) {
    try {
      const { page = 1, limit = 10, search, continentId, sortBy = 'name', sortOrder = 'ASC' } = filters;
      
      const where = { deleted_at: null };
      if (search) {
        where[Op.or] = [
          { name: { [Op.like]: `%${search}%` } },
          { code: { [Op.like]: `%${search}%` } }
        ];
      }
      
      if (continentId) {
        where.continent_id = continentId;
      }

      // Only select columns that we know exist
      const attributes = [
        'id', 'code', 'name', 'native_name', 'capital',
        'continent_id', 'population', 'area_km2', 
        'currency_code', 'phone_code',
        'tld', 'is_active', 'created_at', 'updated_at'
      ];

      const { count, rows } = await this.model.findAndCountAll({
        attributes,
        where,
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

  async findById(id) {
    try {
      const attributes = [
        'id', 'code', 'name', 'native_name', 'capital',
        'continent_id', 'population', 'area_km2', 
        'currency_code', 'phone_code',
        'tld', 'is_active', 'created_at', 'updated_at'
      ];

      return await this.model.findByPk(id, {
        attributes,
        where: { deleted_at: null }
      });
    } catch (error) {
      logger.logError(error, { method: 'findById', id });
      throw error;
    }
  }

  async getByCode(code) {
    try {
      const attributes = [
        'id', 'code', 'name', 'native_name', 'capital',
        'continent_id', 'population', 'area_km2', 
        'currency_code', 'phone_code',
        'tld', 'is_active', 'created_at', 'updated_at'
      ];

      return await this.model.findOne({
        attributes,
        where: { 
          code: code.toUpperCase(),
          deleted_at: null 
        }
      });
    } catch (error) {
      logger.logError(error, { method: 'getByCode', code });
      throw error;
    }
  }

  async getWithStates(options = {}) {
    try {
      const { limit = 100, offset = 0 } = options;
      const attributes = [
        'id', 'code', 'name', 'native_name', 'capital',
        'continent_id', 'population', 'area_km2', 'currency_code', 'phone_code'
      ];

      return await this.model.findAll({
        attributes,
        where: { deleted_at: null },
        include: [
          {
            model: State,
            as: 'states',
            attributes: ['id', 'name', 'code'],
            where: { deleted_at: null },
            required: false
          }
        ],
        order: [['name', 'ASC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });
    } catch (error) {
      logger.logError(error, { method: 'getWithStates' });
      throw error;
    }
  }

  async search(query, options = {}) {
    try {
      const { limit = 20, offset = 0 } = options;
      const attributes = [
        'id', 'code', 'name', 'native_name', 'capital',
        'continent_id', 'population', 'area_km2', 'currency_code', 'phone_code'
      ];

      return await this.model.findAll({
        attributes,
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${query}%` } },
            { code: { [Op.like]: `%${query}%` } },
            { native_name: { [Op.like]: `%${query}%` } },
            { capital: { [Op.like]: `%${query}%` } }
          ],
          deleted_at: null
        },
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['name', 'ASC']]
      });
    } catch (error) {
      logger.logError(error, { method: 'search', query });
      throw error;
    }
  }

  async getStatistics(id) {
    try {
      const country = await this.model.findByPk(id, {
        attributes: ['id', 'name', 'code', 'population', 'area_km2', 'currency_code'],
        where: { deleted_at: null }
      });

      if (!country) {
        return null;
      }

      const stateCount = await State.count({
        where: {
          country_id: id,
          deleted_at: null
        }
      });
      
      const cityCount = await City.count({
        where: {
          deleted_at: null
        },
        include: [
          {
            model: State,
            as: 'state',
            where: { 
              country_id: id,
              deleted_at: null 
            }
          }
        ]
      });

      return {
        country_id: country.id,
        country_name: country.name,
        country_code: country.code,
        population: country.population,
        area_km2: country.area_km2,
        currency: country.currency_code,
        state_count: stateCount,
        city_count: cityCount
      };
    } catch (error) {
      logger.logError(error, { method: 'getStatistics', id });
      throw error;
    }
  }
}

export default new CountryRepository();