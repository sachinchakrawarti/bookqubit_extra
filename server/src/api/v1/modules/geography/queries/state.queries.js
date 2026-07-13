/**
 * State Queries
 * Builds Sequelize queries for state operations
 */

import { State, Country, City } from '../models/sequelize/index.js';
import { Op } from 'sequelize';
import { PaginationBuilder, SortBuilder } from './builders/index.js';
import { StateFilters } from './filters/index.js';

export class StateQueries {
  /**
   * Build query for getting all states with filters
   */
  static buildGetAllQuery(filters = {}, pagination = {}, includeDeleted = false) {
    const where = StateFilters.applyAll(filters, includeDeleted);
    
    const sort = SortBuilder.create({
      sortBy: pagination.sortBy,
      sortOrder: pagination.sortOrder,
      allowedFields: ['id', 'code', 'name', 'population', 'area_km2', 'created_at', 'updated_at']
    }).getOptions();

    const paginate = PaginationBuilder.create(pagination);

    return {
      where,
      include: [
        { model: Country, as: 'country' }
      ],
      order: sort,
      limit: paginate.limit,
      offset: paginate.offset,
      paranoid: !includeDeleted
    };
  }

  /**
   * Build query for getting state by ID
   */
  static buildGetByIdQuery(id, includeDeleted = false) {
    return {
      where: { id },
      include: [
        { model: Country, as: 'country' }
      ],
      paranoid: !includeDeleted
    };
  }

  /**
   * Build query for getting states by country
   */
  static buildGetByCountryQuery(countryId) {
    return {
      where: { country_id: countryId, deleted_at: null },
      include: [
        { model: Country, as: 'country' }
      ],
      order: [['name', 'ASC']]
    };
  }

  /**
   * Build query for getting state with cities
   */
  static buildGetWithCitiesQuery(id) {
    return {
      where: { id },
      include: [
        { model: Country, as: 'country' },
        { 
          model: City, 
          as: 'cities', 
          where: { deleted_at: null },
          required: false 
        }
      ],
      paranoid: true
    };
  }

  /**
   * Build query for getting state with full details
   */
  static buildGetDetailsQuery(id) {
    return {
      where: { id },
      include: [
        { model: Country, as: 'country' },
        { 
          model: City, 
          as: 'cities',
          where: { deleted_at: null },
          required: false
        }
      ],
      paranoid: true
    };
  }

  /**
   * Build query for searching states
   */
  static buildSearchQuery(query, options = {}) {
    const where = StateFilters.applyAll({ search: query });
    
    return {
      where,
      include: [
        { model: Country, as: 'country' }
      ],
      limit: options.limit || 50
    };
  }

  /**
   * Build query for active states
   */
  static buildActiveQuery() {
    return {
      where: { deleted_at: null, is_active: 1 },
      include: [
        { model: Country, as: 'country' }
      ],
      order: [['name', 'ASC']]
    };
  }

  /**
   * Build query for deleted states (admin)
   */
  static buildDeletedQuery(pagination = {}) {
    const paginate = PaginationBuilder.create(pagination);
    
    return {
      where: { deleted_at: { [Op.ne]: null } },
      include: [
        { model: Country, as: 'country' }
      ],
      paranoid: false,
      order: [['deleted_at', 'DESC']],
      limit: paginate.limit,
      offset: paginate.offset
    };
  }

  /**
   * Build query for states with city counts
   */
  static buildWithCityCountsQuery(countryId = null) {
    const where = { deleted_at: null };
    if (countryId) where.country_id = countryId;
    
    return {
      where,
      attributes: {
        include: [
          [
            sequelize.literal('(SELECT COUNT(*) FROM cities WHERE cities.state_id = State.id AND cities.deleted_at IS NULL)'),
            'cityCount'
          ]
        ]
      },
      include: [
        { model: Country, as: 'country' }
      ],
      order: [[sequelize.literal('cityCount'), 'DESC']]
    };
  }
}

export default StateQueries;