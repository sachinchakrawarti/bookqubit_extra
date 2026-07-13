/**
 * Analytics Repository
 * Repository for analytics operations
 */

import { Country, State, City, Continent } from '../../models/sequelize/index.js';
import { Op } from 'sequelize';
import { LoggerService } from '../../services/logger.js';

const logger = new LoggerService('analytics:repository');

class AnalyticsRepository {
  constructor() {
    this.models = { Country, State, City, Continent };
  }

  /**
   * Get country analytics
   */
  async getCountryAnalytics(countryId, options = {}) {
    try {
      const country = await this.models.Country.findByPk(countryId, {
        include: [
          {
            model: this.models.State,
            as: 'states',
            where: { deleted_at: null },
            required: false
          },
          {
            model: this.models.Continent,
            as: 'continent',
            attributes: ['id', 'name']
          }
        ],
        where: { deleted_at: null }
      });

      if (!country) {
        return null;
      }

      const stateIds = country.states ? country.states.map(s => s.id) : [];
      
      const cityCount = await this.models.City.count({
        where: {
          state_id: { [Op.in]: stateIds },
          deleted_at: null
        }
      });

      return {
        country: {
          id: country.id,
          name: country.name,
          code: country.code,
          continent: country.continent ? country.continent.name : null
        },
        statistics: {
          total_states: country.states ? country.states.length : 0,
          total_cities: cityCount
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.logError(error, { method: 'getCountryAnalytics', countryId });
      throw error;
    }
  }

  /**
   * Get state analytics
   */
  async getStateAnalytics(stateId, options = {}) {
    try {
      const state = await this.models.State.findByPk(stateId, {
        include: [
          {
            model: this.models.Country,
            as: 'country',
            attributes: ['id', 'name', 'code'],
            where: { deleted_at: null }
          },
          {
            model: this.models.City,
            as: 'cities',
            where: { deleted_at: null },
            required: false
          }
        ],
        where: { deleted_at: null }
      });

      if (!state) {
        return null;
      }

      return {
        state: {
          id: state.id,
          name: state.name,
          code: state.code,
          country: state.country ? state.country.name : null
        },
        statistics: {
          total_cities: state.cities ? state.cities.length : 0,
          capital_cities: state.cities ? state.cities.filter(c => c.is_capital).length : 0
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.logError(error, { method: 'getStateAnalytics', stateId });
      throw error;
    }
  }

  /**
   * Get city analytics
   */
  async getCityAnalytics(cityId, options = {}) {
    try {
      const city = await this.models.City.findByPk(cityId, {
        include: [
          {
            model: this.models.State,
            as: 'state',
            attributes: ['id', 'name', 'code'],
            where: { deleted_at: null },
            include: [
              {
                model: this.models.Country,
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

      return {
        city: {
          id: city.id,
          name: city.name,
          state: city.state ? city.state.name : null,
          country: city.state && city.state.country ? city.state.country.name : null
        },
        details: {
          is_capital: city.is_capital || false,
          population: city.population || null,
          area: city.area || null,
          has_coordinates: !!(city.latitude && city.longitude)
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.logError(error, { method: 'getCityAnalytics', cityId });
      throw error;
    }
  }

  /**
   * Get dashboard overview
   */
  async getDashboardOverview(options = {}) {
    try {
      // Remove deleted_at condition for Continent since it doesn't have that column
      const [countryCount, stateCount, cityCount, continentCount] = await Promise.all([
        this.models.Country.count({ where: { deleted_at: null } }),
        this.models.State.count({ where: { deleted_at: null } }),
        this.models.City.count({ where: { deleted_at: null } }),
        this.models.Continent.count() // No deleted_at filter
      ]);

      // Get count of countries with states
      const countriesWithStates = await this.models.Country.count({
        where: { deleted_at: null },
        include: [
          {
            model: this.models.State,
            as: 'states',
            where: { deleted_at: null },
            required: true
          }
        ]
      });

      // Get count of states with cities
      const statesWithCities = await this.models.State.count({
        where: { deleted_at: null },
        include: [
          {
            model: this.models.City,
            as: 'cities',
            where: { deleted_at: null },
            required: true
          }
        ]
      });

      return {
        overview: {
          total_countries: countryCount,
          total_states: stateCount,
          total_cities: cityCount,
          total_continents: continentCount,
          countries_with_states: countriesWithStates,
          states_with_cities: statesWithCities
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.logError(error, { method: 'getDashboardOverview' });
      throw error;
    }
  }

  /**
   * Get quick stats
   */
  async getQuickStats(options = {}) {
    try {
      const overview = await this.getDashboardOverview(options);
      
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const [newCountries, newStates, newCities] = await Promise.all([
        this.models.Country.count({
          where: {
            created_at: { [Op.gte]: sevenDaysAgo },
            deleted_at: null
          }
        }),
        this.models.State.count({
          where: {
            created_at: { [Op.gte]: sevenDaysAgo },
            deleted_at: null
          }
        }),
        this.models.City.count({
          where: {
            created_at: { [Op.gte]: sevenDaysAgo },
            deleted_at: null
          }
        })
      ]);

      return {
        ...overview,
        recent_additions: {
          countries: newCountries,
          states: newStates,
          cities: newCities,
          total: newCountries + newStates + newCities
        },
        last_updated: new Date().toISOString()
      };
    } catch (error) {
      logger.logError(error, { method: 'getQuickStats' });
      throw error;
    }
  }

  /**
   * Get recent activity
   */
  async getRecentActivity(options = {}) {
    try {
      const { limit = 10, days = 7 } = options;
      
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - days);

      const recentCountries = await this.models.Country.findAll({
        where: {
          created_at: { [Op.gte]: daysAgo },
          deleted_at: null
        },
        attributes: ['id', 'name', 'created_at'],
        limit: Math.ceil(limit / 3),
        order: [['created_at', 'DESC']]
      });

      const recentStates = await this.models.State.findAll({
        where: {
          created_at: { [Op.gte]: daysAgo },
          deleted_at: null
        },
        attributes: ['id', 'name', 'created_at'],
        include: [
          {
            model: this.models.Country,
            as: 'country',
            attributes: ['name']
          }
        ],
        limit: Math.ceil(limit / 3),
        order: [['created_at', 'DESC']]
      });

      const recentCities = await this.models.City.findAll({
        where: {
          created_at: { [Op.gte]: daysAgo },
          deleted_at: null
        },
        attributes: ['id', 'name', 'created_at'],
        include: [
          {
            model: this.models.State,
            as: 'state',
            attributes: ['name'],
            include: [
              {
                model: this.models.Country,
                as: 'country',
                attributes: ['name']
              }
            ]
          }
        ],
        limit: Math.ceil(limit / 3),
        order: [['created_at', 'DESC']]
      });

      const activities = [
        ...recentCountries.map(c => ({
          type: 'country',
          id: c.id,
          name: c.name,
          action: 'created',
          timestamp: c.created_at,
          message: `Country "${c.name}" was created`
        })),
        ...recentStates.map(s => ({
          type: 'state',
          id: s.id,
          name: s.name,
          action: 'created',
          timestamp: s.created_at,
          message: `State "${s.name}" was created`
        })),
        ...recentCities.map(c => ({
          type: 'city',
          id: c.id,
          name: c.name,
          action: 'created',
          timestamp: c.created_at,
          message: `City "${c.name}" was created`
        }))
      ];

      activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      return activities.slice(0, limit);
    } catch (error) {
      logger.logError(error, { method: 'getRecentActivity' });
      throw error;
    }
  }

  /**
   * Get state distribution
   */
  async getStateDistribution(countryId, options = {}) {
    try {
      const states = await this.models.State.findAll({
        where: { 
          country_id: countryId,
          deleted_at: null 
        },
        include: [
          {
            model: this.models.City,
            as: 'cities',
            where: { deleted_at: null },
            required: false
          }
        ],
        order: [['name', 'ASC']]
      });

      return {
        country_id: countryId,
        total_states: states.length,
        distribution: states.map(state => ({
          id: state.id,
          name: state.name,
          code: state.code,
          city_count: state.cities ? state.cities.length : 0
        }))
      };
    } catch (error) {
      logger.logError(error, { method: 'getStateDistribution', countryId });
      throw error;
    }
  }

  /**
   * Get city density data
   */
  async getCityDensity(filters = {}, options = {}) {
    try {
      const { countryId, stateId } = filters;
      const where = { deleted_at: null };
      
      if (stateId) {
        where.state_id = stateId;
      }

      const cities = await this.models.City.findAll({
        where,
        include: [
          {
            model: this.models.State,
            as: 'state',
            where: { deleted_at: null },
            include: [
              {
                model: this.models.Country,
                as: 'country',
                where: { deleted_at: null }
              }
            ]
          }
        ]
      });

      let filteredCities = cities;
      if (countryId) {
        filteredCities = cities.filter(c => 
          c.state && c.state.country && c.state.country.id === parseInt(countryId)
        );
      }

      return {
        total_cities: filteredCities.length,
        cities: filteredCities.map(c => ({
          id: c.id,
          name: c.name,
          state: c.state ? c.state.name : null,
          country: c.state && c.state.country ? c.state.country.name : null,
          is_capital: c.is_capital || false,
          has_coordinates: !!(c.latitude && c.longitude)
        }))
      };
    } catch (error) {
      logger.logError(error, { method: 'getCityDensity', filters });
      throw error;
    }
  }

  /**
   * Generate country report
   */
  async generateCountryReport(options = {}) {
    try {
      const { countryId } = options;
      const analytics = await this.getCountryAnalytics(countryId, options);
      
      if (!analytics) {
        return null;
      }

      return {
        ...analytics,
        report_type: 'country',
        generated_at: new Date().toISOString()
      };
    } catch (error) {
      logger.logError(error, { method: 'generateCountryReport' });
      throw error;
    }
  }

  /**
   * Generate state report
   */
  async generateStateReport(options = {}) {
    try {
      const { stateId } = options;
      const analytics = await this.getStateAnalytics(stateId, options);
      
      if (!analytics) {
        return null;
      }

      return {
        ...analytics,
        report_type: 'state',
        generated_at: new Date().toISOString()
      };
    } catch (error) {
      logger.logError(error, { method: 'generateStateReport' });
      throw error;
    }
  }

  /**
   * Generate city report
   */
  async generateCityReport(options = {}) {
    try {
      const { cityId } = options;
      const analytics = await this.getCityAnalytics(cityId, options);
      
      if (!analytics) {
        return null;
      }

      return {
        ...analytics,
        report_type: 'city',
        generated_at: new Date().toISOString()
      };
    } catch (error) {
      logger.logError(error, { method: 'generateCityReport' });
      throw error;
    }
  }
}

export default new AnalyticsRepository();