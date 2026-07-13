/**
 * Analytics Queries
 * Builds analytics queries using Sequelize
 */

import { Country, State, City, Continent } from '../models/sequelize/index.js';
import { Op, Sequelize } from 'sequelize';

export class AnalyticsQueries {
  /**
   * Build query for country distribution by continent
   */
  static buildCountryDistributionQuery() {
    return {
      attributes: [
        [Sequelize.col('continent.name'), 'continent'],
        [Sequelize.fn('COUNT', Sequelize.col('Country.id')), 'count'],
        [Sequelize.fn('SUM', Sequelize.col('Country.population')), 'totalPopulation']
      ],
      include: [{ model: Continent, as: 'continent', attributes: [] }],
      where: { deleted_at: null },
      group: ['continent.id', 'continent.name'],
      raw: true
    };
  }

  /**
   * Get country statistics
   */
  static async getCountryStats() {
    const [total, active, inactive, withStates] = await Promise.all([
      Country.count({ where: { deleted_at: null } }),
      Country.count({ where: { deleted_at: null, is_active: 1 } }),
      Country.count({ where: { deleted_at: null, is_active: 0 } }),
      Country.count({
        where: { deleted_at: null },
        include: [{ model: State, as: 'states', where: { deleted_at: null }, required: true }]
      })
    ]);

    return { total, active, inactive, withStates };
  }

  /**
   * Build query for top countries by population
   */
  static buildTopByPopulationQuery(limit = 10) {
    return {
      where: { deleted_at: null, population: { [Op.ne]: null } },
      attributes: ['id', 'code', 'name', 'population', 'area_km2'],
      include: [{ model: Continent, as: 'continent', attributes: ['id', 'name'] }],
      order: [['population', 'DESC']],
      limit
    };
  }

  /**
   * Build query for top countries by area
   */
  static buildTopByAreaQuery(limit = 10) {
    return {
      where: { deleted_at: null, area_km2: { [Op.ne]: null } },
      attributes: ['id', 'code', 'name', 'area_km2', 'population'],
      include: [{ model: Continent, as: 'continent', attributes: ['id', 'name'] }],
      order: [['area_km2', 'DESC']],
      limit
    };
  }

  /**
   * Build query for top cities by population
   */
  static buildTopCitiesQuery(limit = 10) {
    return {
      where: { deleted_at: null, population: { [Op.ne]: null } },
      attributes: ['id', 'name', 'population', 'is_capital'],
      include: [
        {
          model: State,
          as: 'state',
          attributes: ['id', 'name', 'code'],
          include: [{ model: Country, as: 'country', attributes: ['id', 'code', 'name'] }]
        }
      ],
      order: [['population', 'DESC']],
      limit
    };
  }

  /**
   * Build query for country growth trends
   */
  static buildGrowthQuery(period = 'monthly') {
    const dateFormat = period === 'monthly' ? '%Y-%m' : period === 'weekly' ? '%Y-%W' : '%Y';
    
    return {
      attributes: [
        [Sequelize.fn('STRFTIME', dateFormat, Sequelize.col('created_at')), 'period'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      where: { created_at: { [Op.ne]: null } },
      group: [Sequelize.fn('STRFTIME', dateFormat, Sequelize.col('created_at'))],
      order: [[Sequelize.literal('period'), 'ASC']]
    };
  }

  /**
   * Build query for activity ratios
   */
  static buildActivityRatiosQuery() {
    return {
      countries: {
        attributes: [
          'is_active',
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
        ],
        where: { deleted_at: null },
        group: ['is_active']
      },
      states: {
        attributes: [
          'is_active',
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
        ],
        where: { deleted_at: null },
        group: ['is_active']
      },
      cities: {
        attributes: [
          'is_active',
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
        ],
        where: { deleted_at: null },
        group: ['is_active']
      }
    };
  }

  /**
   * Get complete dashboard analytics
   */
  static async getDashboardAnalytics() {
    const [
      countryStats,
      countryDistribution,
      topCountries,
      topCities,
      growth
    ] = await Promise.all([
      this.getCountryStats(),
      Country.findAll(this.buildCountryDistributionQuery()),
      Country.findAll(this.buildTopByPopulationQuery(5)),
      City.findAll(this.buildTopCitiesQuery(5)),
      Country.findAll(this.buildGrowthQuery())
    ]);

    // Calculate percentages for distribution
    const totalCountries = countryStats.total || 0;
    const distributionWithPercentage = countryDistribution.map(item => ({
      ...item,
      percentage: totalCountries > 0 ? Math.round((parseInt(item.count) / totalCountries) * 100) : 0
    }));

    return {
      summary: { countries: countryStats },
      distribution: distributionWithPercentage,
      topLists: {
        countriesByPopulation: topCountries,
        citiesByPopulation: topCities
      },
      growth
    };
  }

  /**
   * Get state analytics
   */
  static async getStateAnalytics(countryId = null) {
    const where = { deleted_at: null };
    if (countryId) where.country_id = countryId;

    const [total, active, inactive, withCities] = await Promise.all([
      State.count({ where }),
      State.count({ ...where, is_active: 1 }),
      State.count({ ...where, is_active: 0 }),
      State.count({
        where,
        include: [{ model: City, as: 'cities', where: { deleted_at: null }, required: true }]
      })
    ]);

    return { total, active, inactive, withCities };
  }

  /**
   * Get city analytics
   */
  static async getCityAnalytics(stateId = null) {
    const where = { deleted_at: null };
    if (stateId) where.state_id = stateId;

    const [total, active, inactive, capitals, withCoordinates] = await Promise.all([
      City.count({ where }),
      City.count({ ...where, is_active: 1 }),
      City.count({ ...where, is_active: 0 }),
      City.count({ ...where, is_capital: 1 }),
      City.count({ 
        ...where, 
        latitude: { [Op.ne]: null }, 
        longitude: { [Op.ne]: null } 
      })
    ]);

    return { total, active, inactive, capitals, withCoordinates };
  }

  /**
   * Build query for population density ranking
   */
  static buildPopulationDensityQuery(limit = 10) {
    return {
      where: { 
        deleted_at: null, 
        population: { [Op.ne]: null }, 
        area_km2: { [Op.ne]: null, [Op.gt]: 0 } 
      },
      attributes: [
        'id', 'code', 'name', 'population', 'area_km2',
        [Sequelize.literal('population / area_km2'), 'density']
      ],
      include: [{ model: Continent, as: 'continent', attributes: ['id', 'name'] }],
      order: [[Sequelize.literal('density'), 'DESC']],
      limit
    };
  }
}

export default AnalyticsQueries;