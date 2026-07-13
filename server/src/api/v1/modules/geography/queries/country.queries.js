/**
 * Country Queries
 * Builds Sequelize queries for country operations
 */

import { Country, Continent, State } from '../models/sequelize/index.js';
import { Op } from 'sequelize';
import { PaginationBuilder, SortBuilder } from './builders/index.js';
import { CountryFilters } from './filters/index.js';

export class CountryQueries {
  /**
   * Build query for getting all countries with filters
   * @param {Object} filters - Filter options
   * @param {Object} pagination - Pagination options
   * @param {boolean} includeDeleted - Include deleted records
   * @returns {Object} Sequelize query options
   */
  static buildGetAllQuery(filters = {}, pagination = {}, includeDeleted = false) {
    const where = CountryFilters.applyAll(filters, includeDeleted);
    
    const sort = SortBuilder.create({
      sortBy: pagination.sortBy,
      sortOrder: pagination.sortOrder,
      allowedFields: ['id', 'code', 'name', 'population', 'area_km2', 'created_at', 'updated_at']
    }).getOptions();

    const paginate = PaginationBuilder.create(pagination);

    return {
      where,
      include: [
        { model: Continent, as: 'continent' }
      ],
      order: sort,
      limit: paginate.limit,
      offset: paginate.offset,
      paranoid: !includeDeleted
    };
  }

  /**
   * Build query for getting country by ID
   * @param {number} id - Country ID
   * @param {boolean} includeDeleted - Include deleted records
   * @returns {Object} Sequelize query options
   */
  static buildGetByIdQuery(id, includeDeleted = false) {
    return {
      where: { id },
      include: [
        { model: Continent, as: 'continent' }
      ],
      paranoid: !includeDeleted
    };
  }

  /**
   * Build query for getting country by code
   * @param {string} code - Country code
   * @param {boolean} includeDeleted - Include deleted records
   * @returns {Object} Sequelize query options
   */
  static buildGetByCodeQuery(code, includeDeleted = false) {
    return {
      where: { code: code.toUpperCase() },
      include: [
        { model: Continent, as: 'continent' }
      ],
      paranoid: !includeDeleted
    };
  }

  /**
   * Build query for getting country with states
   * @param {number} id - Country ID
   * @returns {Object} Sequelize query options
   */
  static buildGetWithStatesQuery(id) {
    return {
      where: { id },
      include: [
        { model: Continent, as: 'continent' },
        { 
          model: State, 
          as: 'states', 
          where: { deleted_at: null },
          required: false 
        }
      ],
      paranoid: true
    };
  }

  /**
   * Build query for getting country with full details
   * @param {number} id - Country ID
   * @returns {Object} Sequelize query options
   */
  static buildGetDetailsQuery(id) {
    return {
      where: { id },
      include: [
        { model: Continent, as: 'continent' },
        { 
          model: State, 
          as: 'states',
          where: { deleted_at: null },
          required: false,
          include: [
            { 
              model: City, 
              as: 'cities',
              where: { deleted_at: null },
              required: false
            }
          ]
        }
      ],
      paranoid: true
    };
  }

  /**
   * Build query for searching countries
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Object} Sequelize query options
   */
  static buildSearchQuery(query, options = {}) {
    const where = CountryFilters.applyAll({ search: query });
    
    return {
      where,
      include: [
        { model: Continent, as: 'continent' }
      ],
      limit: options.limit || 50
    };
  }

  /**
   * Build query for countries by continent
   * @param {number} continentId - Continent ID
   * @returns {Object} Sequelize query options
   */
  static buildByContinentQuery(continentId) {
    return {
      where: { continent_id: continentId, deleted_at: null },
      include: [
        { model: Continent, as: 'continent' }
      ],
      order: [['name', 'ASC']]
    };
  }

  /**
   * Build query for active countries
   * @returns {Object} Sequelize query options
   */
  static buildActiveQuery() {
    return {
      where: { deleted_at: null, is_active: 1 },
      include: [
        { model: Continent, as: 'continent' }
      ],
      order: [['name', 'ASC']]
    };
  }

  /**
   * Build query for deleted countries (admin)
   * @param {Object} pagination - Pagination options
   * @returns {Object} Sequelize query options
   */
  static buildDeletedQuery(pagination = {}) {
    const paginate = PaginationBuilder.create(pagination);
    
    return {
      where: { deleted_at: { [Op.ne]: null } },
      include: [
        { model: Continent, as: 'continent' }
      ],
      paranoid: false,
      order: [['deleted_at', 'DESC']],
      limit: paginate.limit,
      offset: paginate.offset
    };
  }

  /**
   * Build query for countries with state counts
   * @returns {Object} Sequelize query options
   */
  static buildWithStateCountsQuery() {
    return {
      where: { deleted_at: null },
      attributes: {
        include: [
          [
            sequelize.literal('(SELECT COUNT(*) FROM states WHERE states.country_id = Country.id AND states.deleted_at IS NULL)'),
            'stateCount'
          ]
        ]
      },
      include: [
        { model: Continent, as: 'continent' }
      ],
      order: [[sequelize.literal('stateCount'), 'DESC']]
    };
  }
}

export default CountryQueries;