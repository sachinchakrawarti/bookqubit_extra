/**
 * State Entity
 * Represents a state/province entity
 */

import { BaseEntity } from './base.entity.js';

export class StateEntity extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.name = data.name || '';
    this.code = data.code || '';
    this.country_id = data.country_id || null;
    this.native_name = data.native_name || '';
    this.is_capital_state = data.is_capital_state || false;
    this.population = data.population || null;
    this.area = data.area || null;
    this.region = data.region || '';
    this.country = data.country || null;
    this.cities = data.cities || [];
  }

  /**
   * Get full name with country
   */
  getFullName() {
    const countryName = this.country ? this.country.name : '';
    return `${this.name}, ${countryName}`;
  }

  /**
   * Check if state has cities
   */
  hasCities() {
    return this.cities && this.cities.length > 0;
  }

  /**
   * Get city count
   */
  getCityCount() {
    return this.cities ? this.cities.length : 0;
  }

  /**
   * Check if state has a capital city
   */
  hasCapitalCity() {
    return this.cities ? this.cities.some(city => city.is_capital) : false;
  }

  /**
   * Convert to JSON
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      country_id: this.country_id,
      native_name: this.native_name,
      is_capital_state: this.is_capital_state,
      population: this.population,
      area: this.area,
      region: this.region,
      country: this.country,
      cities: this.cities,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}

export default StateEntity;