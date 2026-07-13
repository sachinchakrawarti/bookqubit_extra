/**
 * City Entity
 * Represents a city entity
 */

import { BaseEntity } from './base.entity.js';

export class CityEntity extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.name = data.name || '';
    this.state_id = data.state_id || null;
    this.native_name = data.native_name || '';
    this.is_capital = data.is_capital || false;
    this.population = data.population || null;
    this.area = data.area || null;
    this.latitude = data.latitude || null;
    this.longitude = data.longitude || null;
    this.postal_code = data.postal_code || '';
    this.timezone = data.timezone || '';
    this.state = data.state || null;
  }

  /**
   * Get full name with state
   */
  getFullName() {
    const stateName = this.state ? this.state.name : '';
    return `${this.name}, ${stateName}`;
  }

  /**
   * Check if city has coordinates
   */
  hasCoordinates() {
    return this.latitude !== null && this.longitude !== null;
  }

  /**
   * Get formatted coordinates
   */
  getCoordinates() {
    if (this.hasCoordinates()) {
      return `${this.latitude}, ${this.longitude}`;
    }
    return null;
  }

  /**
   * Check if city is a capital
   */
  isCapitalCity() {
    return this.is_capital === true;
  }

  /**
   * Convert to JSON
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      state_id: this.state_id,
      native_name: this.native_name,
      is_capital: this.is_capital,
      population: this.population,
      area: this.area,
      latitude: this.latitude,
      longitude: this.longitude,
      postal_code: this.postal_code,
      timezone: this.timezone,
      state: this.state,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}

export default CityEntity;