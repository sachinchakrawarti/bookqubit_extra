/**
 * City Queries
 * Builds Sequelize queries for city operations
 */

import { City, State, Country } from '../models/sequelize/index.js';
import { Op, Sequelize } from 'sequelize';
import { PaginationBuilder, SortBuilder } from './builders/index.js';
import { CityFilters } from './filters/index.js';

export class CityQueries {
  /**
   * Build query for getting all cities with filters
   */
  static buildGetAllQuery(filters = {}, pagination = {}, includeDeleted = false) {
    const where = CityFilters.applyAll(filters, includeDeleted);
    
    const sort = SortBuilder.create({
      sortBy: pagination.sortBy,
      sortOrder: pagination.sortOrder,
      allowedFields: ['id', 'name', 'population', 'latitude', 'longitude', 'created_at', 'updated_at']
    }).getOptions();

    const paginate = PaginationBuilder.create(pagination);

    return {
      where,
      include: [
        { 
          model: State, 
          as: 'state',
          include: [{ model: Country, as: 'country' }]
        }
      ],
      order: sort,
      limit: paginate.limit,
      offset: paginate.offset,
      paranoid: !includeDeleted
    };
  }

  /**
   * Build query for getting city by ID
   */
  static buildGetByIdQuery(id, includeDeleted = false) {
    return {
      where: { id },
      include: [
        { 
          model: State, 
          as: 'state',
          include: [{ model: Country, as: 'country' }]
        }
      ],
      paranoid: !includeDeleted
    };
  }

  /**
   * Build query for getting cities by state
   */
  static buildGetByStateQuery(stateId) {
    return {
      where: { state_id: stateId, deleted_at: null },
      include: [
        { 
          model: State, 
          as: 'state',
          include: [{ model: Country, as: 'country' }]
        }
      ],
      order: [['name', 'ASC']]
    };
  }

  /**
   * Build query for getting capital cities
   */
  static buildCapitalsQuery(filters = {}, pagination = {}) {
    const where = CityFilters.getCapitals(filters);
    
    const sort = SortBuilder.create({
      sortBy: pagination.sortBy,
      sortOrder: pagination.sortOrder,
      allowedFields: ['id', 'name', 'population', 'created_at', 'updated_at']
    }).getOptions();

    const paginate = PaginationBuilder.create(pagination);

    return {
      where,
      include: [
        { 
          model: State, 
          as: 'state',
          include: [{ model: Country, as: 'country' }]
        }
      ],
      order: sort,
      limit: paginate.limit,
      offset: paginate.offset
    };
  }

  /**
   * Build query for getting city with full details
   */
  static buildGetDetailsQuery(id) {
    return {
      where: { id },
      include: [
        { 
          model: State, 
          as: 'state',
          include: [{ model: Country, as: 'country' }]
        },
        { 
          model: Timezone, 
          as: 'timezone',
          required: false
        }
      ],
      paranoid: true
    };
  }

  /**
   * Build query for searching cities
   */
  static buildSearchQuery(query, options = {}) {
    const where = CityFilters.applyAll({ search: query });
    
    return {
      where,
      include: [
        { 
          model: State, 
          as: 'state',
          include: [{ model: Country, as: 'country' }]
        }
      ],
      limit: options.limit || 50
    };
  }

  /**
   * Build query for finding cities by coordinates (nearby)
   */
  static buildNearbyQuery(latitude, longitude, radius = 10) {
    // Approximate 1 degree latitude ≈ 111 km
    const degreeRange = radius / 111;
    
    return {
      where: {
        deleted_at: null,
        latitude: {
          [Op.between]: [latitude - degreeRange, latitude + degreeRange]
        },
        longitude: {
          [Op.between]: [longitude - degreeRange, longitude + degreeRange]
        }
      },
      include: [
        { 
          model: State, 
          as: 'state',
          include: [{ model: Country, as: 'country' }]
        }
      ],
      order: [
        [Sequelize.literal(`ABS(latitude - ${latitude}) + ABS(longitude - ${longitude})`), 'ASC']
      ],
      limit: 20
    };
  }

  /**
   * Build query for active cities
   */
  static buildActiveQuery() {
    return {
      where: { deleted_at: null, is_active: 1 },
      include: [
        { 
          model: State, 
          as: 'state',
          include: [{ model: Country, as: 'country' }]
        }
      ],
      order: [['name', 'ASC']]
    };
  }

  /**
   * Build query for deleted cities (admin)
   */
  static buildDeletedQuery(pagination = {}) {
    const paginate = PaginationBuilder.create(pagination);
    
    return {
      where: { deleted_at: { [Op.ne]: null } },
      include: [
        { 
          model: State, 
          as: 'state',
          include: [{ model: Country, as: 'country' }]
        }
      ],
      paranoid: false,
      order: [['deleted_at', 'DESC']],
      limit: paginate.limit,
      offset: paginate.offset
    };
  }

  /**
   * Build query for cities with coordinates
   */
  static buildWithCoordinatesQuery(filters = {}, pagination = {}) {
    const where = CityFilters.applyAll({ ...filters, hasCoordinates: true });
    
    const sort = SortBuilder.create({
      sortBy: pagination.sortBy,
      sortOrder: pagination.sortOrder,
      allowedFields: ['id', 'name', 'population', 'latitude', 'longitude', 'created_at', 'updated_at']
    }).getOptions();

    const paginate = PaginationBuilder.create(pagination);

    return {
      where,
      include: [
        { 
          model: State, 
          as: 'state',
          include: [{ model: Country, as: 'country' }]
        }
      ],
      order: sort,
      limit: paginate.limit,
      offset: paginate.offset
    };
  }
}

export default CityQueries;