/**
 * Country Entity
 * Represents a country entity
 */

import { BaseEntity } from './base.entity.js';

export class CountryEntity extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.name = data.name || '';
    this.code = data.code || '';
    this.native_name = data.native_name || '';
    this.phone_code = data.phone_code || '';
    this.currency = data.currency || '';
    this.currency_symbol = data.currency_symbol || '';
    this.continent_id = data.continent_id || null;
    this.capital = data.capital || '';
    this.region = data.region || '';
    this.subregion = data.subregion || '';
    this.population = data.population || null;
    this.area = data.area || null;
    this.timezone = data.timezone || '';
    this.flag_emoji = data.flag_emoji || '';
    this.calling_code = data.calling_code || '';
    this.states = data.states || [];
  }

  /**
   * Get full name with code
   */
  getFullName() {
    return `${this.name} (${this.code})`;
  }

  /**
   * Check if country has states
   */
  hasStates() {
    return this.states && this.states.length > 0;
  }

  /**
   * Get state count
   */
  getStateCount() {
    return this.states ? this.states.length : 0;
  }

  /**
   * Convert to JSON
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      native_name: this.native_name,
      phone_code: this.phone_code,
      currency: this.currency,
      currency_symbol: this.currency_symbol,
      continent_id: this.continent_id,
      capital: this.capital,
      region: this.region,
      subregion: this.subregion,
      population: this.population,
      area: this.area,
      timezone: this.timezone,
      flag_emoji: this.flag_emoji,
      calling_code: this.calling_code,
      states: this.states,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}

export default CountryEntity;