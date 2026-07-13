/**
 * Stats Admin Service
 * Admin service for statistics and analytics
 */

import { CountryAdminRepository, StateAdminRepository, CityAdminRepository } from '../../repositories/admin/index.js';
import { LoggerService } from '../logger.js';

const logger = new LoggerService('admin:stats:service');

class StatsAdminService {
  constructor() {
    this.countryRepo = CountryAdminRepository;
    this.stateRepo = StateAdminRepository;
    this.cityRepo = CityAdminRepository;
  }

  /**
   * Get overall system statistics
   * @returns {Promise<Object>} Overall statistics
   */
  async getOverallStats() {
    try {
      const [countryCount, stateCount, cityCount, deletedCounts] = await Promise.all([
        this.countryRepo.model.count({ where: { deleted_at: null } }),
        this.stateRepo.model.count({ where: { deleted_at: null } }),
        this.cityRepo.model.count({ where: { deleted_at: null } }),
        this.getDeletedCounts()
      ]);

      return {
        total: {
          countries: countryCount,
          states: stateCount,
          cities: cityCount,
          total: countryCount + stateCount + cityCount
        },
        deleted: deletedCounts,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.logError(error, { method: 'getOverallStats' });
      throw error;
    }
  }

  /**
   * Get deleted records counts
   * @returns {Promise<Object>} Deleted counts
   */
  async getDeletedCounts() {
    try {
      const [countries, states, cities] = await Promise.all([
        this.countryRepo.model.count({ where: { deleted_at: { [Op.ne]: null } } }),
        this.stateRepo.model.count({ where: { deleted_at: { [Op.ne]: null } } }),
        this.cityRepo.model.count({ where: { deleted_at: { [Op.ne]: null } } })
      ]);

      return { countries, states, cities };
    } catch (error) {
      logger.logError(error, { method: 'getDeletedCounts' });
      throw error;
    }
  }

  /**
   * Get countries statistics
   * @returns {Promise<Object>} Countries statistics
   */
  async getCountryStats() {
    try {
      const countries = await this.countryRepo.model.findAll({
        where: { deleted_at: null },
        include: [
          {
            model: this.stateRepo.model,
            as: 'states',
            where: { deleted_at: null },
            required: false
          }
        ]
      });

      const stats = countries.map(country => ({
        id: country.id,
        name: country.name,
        code: country.code,
        stateCount: country.states ? country.states.length : 0,
        continentId: country.continent_id
      }));

      // Sort by state count descending
      stats.sort((a, b) => b.stateCount - a.stateCount);

      return {
        totalCountries: stats.length,
        countries: stats,
        averageStatesPerCountry: stats.reduce((acc, curr) => acc + curr.stateCount, 0) / stats.length || 0
      };
    } catch (error) {
      logger.logError(error, { method: 'getCountryStats' });
      throw error;
    }
  }

  /**
   * Get states statistics
   * @param {number} countryId - Optional country ID filter
   * @returns {Promise<Object>} States statistics
   */
  async getStateStats(countryId = null) {
    try {
      const where = { deleted_at: null };
      if (countryId) {
        where.country_id = countryId;
      }

      const states = await this.stateRepo.model.findAll({
        where,
        include: [
          {
            model: this.cityRepo.model,
            as: 'cities',
            where: { deleted_at: null },
            required: false
          },
          {
            model: this.countryRepo.model,
            as: 'country',
            attributes: ['id', 'name', 'code'],
            where: { deleted_at: null }
          }
        ]
      });

      const stats = states.map(state => ({
        id: state.id,
        name: state.name,
        code: state.code,
        countryName: state.country ? state.country.name : null,
        cityCount: state.cities ? state.cities.length : 0,
        hasCapital: state.cities ? state.cities.some(city => city.is_capital) : false
      }));

      stats.sort((a, b) => b.cityCount - a.cityCount);

      return {
        totalStates: stats.length,
        states: stats,
        averageCitiesPerState: stats.reduce((acc, curr) => acc + curr.cityCount, 0) / stats.length || 0,
        statesWithCapitals: stats.filter(s => s.hasCapital).length
      };
    } catch (error) {
      logger.logError(error, { method: 'getStateStats', countryId });
      throw error;
    }
  }

  /**
   * Get cities statistics
   * @param {Object} filters - Filter options
   * @returns {Promise<Object>} Cities statistics
   */
  async getCityStats(filters = {}) {
    try {
      const { stateId, countryId } = filters;
      const where = { deleted_at: null };
      
      if (stateId) {
        where.state_id = stateId;
      }

      const include = [
        {
          model: this.stateRepo.model,
          as: 'state',
          where: { deleted_at: null },
          include: [
            {
              model: this.countryRepo.model,
              as: 'country',
              attributes: ['id', 'name', 'code'],
              where: { deleted_at: null }
            }
          ]
        }
      ];

      if (countryId && !stateId) {
        include[0].where.country_id = countryId;
      }

      const cities = await this.cityRepo.model.findAll({
        where,
        include
      });

      const stats = cities.map(city => ({
        id: city.id,
        name: city.name,
        stateName: city.state ? city.state.name : null,
        countryName: city.state && city.state.country ? city.state.country.name : null,
        isCapital: city.is_capital || false,
        hasCoordinates: !!(city.latitude && city.longitude),
        population: city.population || null
      }));

      return {
        totalCities: stats.length,
        cities: stats,
        capitalCities: stats.filter(s => s.isCapital).length,
        citiesWithCoordinates: stats.filter(s => s.hasCoordinates).length,
        totalPopulation: stats.reduce((acc, curr) => acc + (curr.population || 0), 0)
      };
    } catch (error) {
      logger.logError(error, { method: 'getCityStats', filters });
      throw error;
    }
  }

  /**
   * Get top countries by states count
   * @param {number} limit - Number of results
   * @returns {Promise<Array>} Top countries
   */
  async getTopCountriesByStates(limit = 10) {
    try {
      const stats = await this.getCountryStats();
      return stats.countries.slice(0, limit);
    } catch (error) {
      logger.logError(error, { method: 'getTopCountriesByStates', limit });
      throw error;
    }
  }

  /**
   * Get top states by cities count
   * @param {number} limit - Number of results
   * @param {number} countryId - Optional country ID filter
   * @returns {Promise<Array>} Top states
   */
  async getTopStatesByCities(limit = 10, countryId = null) {
    try {
      const stats = await this.getStateStats(countryId);
      return stats.states.slice(0, limit);
    } catch (error) {
      logger.logError(error, { method: 'getTopStatesByCities', limit, countryId });
      throw error;
    }
  }

  /**
   * Get geographic distribution statistics
   * @returns {Promise<Object>} Geographic distribution
   */
  async getGeographicDistribution() {
    try {
      const countries = await this.countryRepo.model.findAll({
        where: { deleted_at: null },
        attributes: ['id', 'name', 'continent_id'],
        include: [
          {
            model: this.stateRepo.model,
            as: 'states',
            where: { deleted_at: null },
            required: false
          }
        ]
      });

      const continentMap = {};
      countries.forEach(country => {
        const continentId = country.continent_id || 'unknown';
        if (!continentMap[continentId]) {
          continentMap[continentId] = {
            countries: 0,
            states: 0,
            countriesList: []
          };
        }
        continentMap[continentId].countries++;
        continentMap[continentId].states += country.states ? country.states.length : 0;
        continentMap[continentId].countriesList.push(country.name);
      });

      return {
        distribution: continentMap,
        totalCountries: countries.length,
        totalStates: Object.values(continentMap).reduce((acc, curr) => acc + curr.states, 0)
      };
    } catch (error) {
      logger.logError(error, { method: 'getGeographicDistribution' });
      throw error;
    }
  }
}

export default new StatsAdminService();