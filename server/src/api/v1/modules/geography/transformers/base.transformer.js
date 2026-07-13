/**
 * Base Transformer
 * Abstract base class for all transformers
 * Provides common transformation utilities
 */

export class BaseTransformer {
  constructor(options = {}) {
    this.options = {
      dateFormat: options.dateFormat || 'ISO',
      numberFormat: options.numberFormat || 'en-US',
      trimStrings: options.trimStrings !== undefined ? options.trimStrings : true,
      removeNulls: options.removeNulls !== undefined ? options.removeNulls : false,
      removeUndefined: options.removeUndefined !== undefined ? options.removeUndefined : true,
      ...options
    };
  }

  /**
   * Transform a single item
   * Override in subclass
   * @param {*} item - Item to transform
   * @param {Object} options - Transformation options
   * @returns {*} Transformed item
   */
  transform(item, options = {}) {
    return item;
  }

  /**
   * Transform multiple items
   * @param {Array} items - Items to transform
   * @param {Object} options - Transformation options
   * @returns {Array} Transformed items
   */
  transformMany(items, options = {}) {
    if (!items || !Array.isArray(items)) {
      return [];
    }
    return items.map(item => this.transform(item, options));
  }

  /**
   * Format a number with locale
   * @param {number} value - Number to format
   * @param {Object} options - Formatting options
   * @returns {string} Formatted number
   */
  formatNumber(value, options = {}) {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'string') {
      value = parseFloat(value);
      if (isNaN(value)) return 'N/A';
    }
    const formatOptions = {
      maximumFractionDigits: options.maximumFractionDigits || 0,
      minimumFractionDigits: options.minimumFractionDigits || 0,
      ...options
    };
    return new Intl.NumberFormat(this.options.numberFormat, formatOptions).format(value);
  }

  /**
   * Format a date
   * @param {string|Date} date - Date to format
   * @param {Object} options - Formatting options
   * @returns {string} Formatted date
   */
  formatDate(date, options = {}) {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    
    if (this.options.dateFormat === 'ISO') {
      return d.toISOString();
    }
    if (this.options.dateFormat === 'locale') {
      return d.toLocaleString();
    }
    if (this.options.dateFormat === 'date') {
      return d.toLocaleDateString();
    }
    if (this.options.dateFormat === 'time') {
      return d.toLocaleTimeString();
    }
    return d.toISOString();
  }

  /**
   * Format a boolean
   * @param {boolean} value - Boolean value
   * @param {Object} options - Formatting options
   * @returns {string|boolean} Formatted boolean
   */
  formatBoolean(value, options = {}) {
    if (value === undefined || value === null) return options.default || false;
    if (options.asString) {
      return value ? 'Yes' : 'No';
    }
    return value;
  }

  /**
   * Format a string
   * @param {string} value - String to format
   * @param {Object} options - Formatting options
   * @returns {string} Formatted string
   */
  formatString(value, options = {}) {
    if (!value) return options.default || '';
    let result = value;
    if (this.options.trimStrings) {
      result = result.trim();
    }
    if (options.uppercase) {
      result = result.toUpperCase();
    }
    if (options.lowercase) {
      result = result.toLowerCase();
    }
    if (options.capitalize) {
      result = result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
    }
    return result;
  }

  /**
   * Format a percentage
   * @param {number} value - Value to format as percentage
   * @param {Object} options - Formatting options
   * @returns {string} Formatted percentage
   */
  formatPercentage(value, options = {}) {
    if (value === null || value === undefined) return 'N/A';
    const decimal = options.decimal || 2;
    return `${this.formatNumber(value, { maximumFractionDigits: decimal })}%`;
  }

  /**
   * Format currency
   * @param {number} value - Value to format as currency
   * @param {string} currency - Currency code
   * @param {Object} options - Formatting options
   * @returns {string} Formatted currency
   */
  formatCurrency(value, currency = 'USD', options = {}) {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat(this.options.numberFormat, {
      style: 'currency',
      currency: currency,
      ...options
    }).format(value);
  }

  /**
   * Format a phone number
   * @param {string} value - Phone number to format
   * @returns {string} Formatted phone number
   */
  formatPhone(value) {
    if (!value) return '';
    // Simple formatting - can be extended
    return value.replace(/\s/g, '');
  }

  /**
   * Format a flag emoji from country code
   * @param {string} code - Country code
   * @returns {string} Flag emoji
   */
  formatFlag(code) {
    if (!code) return '';
    const offset = 127397;
    return String.fromCodePoint(
      code.toUpperCase().charCodeAt(0) + offset,
      code.toUpperCase().charCodeAt(1) + offset
    );
  }

  /**
   * Clean an object (remove null/undefined values)
   * @param {Object} obj - Object to clean
   * @param {Object} options - Cleaning options
   * @returns {Object} Cleaned object
   */
  cleanObject(obj, options = {}) {
    if (!obj || typeof obj !== 'object') return obj;
    
    const result = { ...obj };
    for (const [key, value] of Object.entries(result)) {
      if (this.options.removeNulls && value === null) {
        delete result[key];
        continue;
      }
      if (this.options.removeUndefined && value === undefined) {
        delete result[key];
        continue;
      }
      // Recursively clean nested objects
      if (value && typeof value === 'object') {
        result[key] = this.cleanObject(value, options);
      }
    }
    return result;
  }

  /**
   * Pick specific fields from an object
   * @param {Object} obj - Source object
   * @param {Array} fields - Fields to pick
   * @returns {Object} Object with picked fields
   */
  pickFields(obj, fields) {
    if (!obj || !fields || !Array.isArray(fields)) return {};
    const result = {};
    for (const field of fields) {
      if (obj[field] !== undefined) {
        result[field] = obj[field];
      }
    }
    return result;
  }

  /**
   * Omit specific fields from an object
   * @param {Object} obj - Source object
   * @param {Array} fields - Fields to omit
   * @returns {Object} Object without omitted fields
   */
  omitFields(obj, fields) {
    if (!obj || !fields || !Array.isArray(fields)) return { ...obj };
    const result = { ...obj };
    for (const field of fields) {
      delete result[field];
    }
    return result;
  }

  /**
   * Transform with error handling
   * @param {Function} fn - Transformation function
   * @param {*} fallback - Fallback value on error
   * @returns {*} Transformed value or fallback
   */
  safeTransform(fn, fallback = null) {
    try {
      return fn();
    } catch (error) {
      console.warn('Transform error:', error.message);
      return fallback;
    }
  }

  /**
   * Get transformer options
   * @returns {Object} Transformer options
   */
  getOptions() {
    return { ...this.options };
  }

  /**
   * Set transformer options
   * @param {Object} options - Transformer options
   * @returns {BaseTransformer} This transformer instance
   */
  setOptions(options) {
    this.options = { ...this.options, ...options };
    return this;
  }

  /**
   * Create a transformer with custom options
   * @param {Object} options - Transformer options
   * @returns {BaseTransformer} New transformer instance
   */
  withOptions(options) {
    return new this.constructor({ ...this.options, ...options });
  }
}

export default BaseTransformer;