/**
 * Geography Analytics Validations
 * Validation schemas for analytics operations
 */

import Joi from 'joi';

// ==========================================
// Analytics Common Rules
// ==========================================

const rules = {
  period: Joi.string().valid('daily', 'weekly', 'monthly', 'yearly').default('monthly'),
  startDate: Joi.date().iso().messages({
    'date.base': 'Start date must be a valid date',
    'date.format': 'Start date must be in ISO format'
  }),
  endDate: Joi.date().iso().min(Joi.ref('startDate')).messages({
    'date.base': 'End date must be a valid date',
    'date.format': 'End date must be in ISO format',
    'date.min': 'End date must be after start date'
  }),
  limit: Joi.number().integer().min(1).max(100).default(10),
  entity: Joi.string().valid('countries', 'states', 'cities', 'all').default('all'),
  metric: Joi.string().valid('count', 'population', 'area', 'density').default('count'),
  groupBy: Joi.string().valid('continent', 'country', 'state', 'region', 'subregion').default('continent')
};

// ==========================================
// Analytics Validation Schemas
// ==========================================

export const dashboardAnalyticsSchema = Joi.object({
  period: rules.period,
  start_date: rules.startDate,
  end_date: rules.endDate,
  entity: rules.entity,
  limit: rules.limit
});

export const countryAnalyticsSchema = Joi.object({
  period: rules.period,
  start_date: rules.startDate,
  end_date: rules.endDate,
  metric: rules.metric,
  groupBy: rules.groupBy,
  continent_id: Joi.number().integer().positive().messages({
    'number.base': 'Continent ID must be a number',
    'number.integer': 'Continent ID must be an integer',
    'number.positive': 'Continent ID must be a positive number'
  }),
  min_population: Joi.number().integer().min(0),
  max_population: Joi.number().integer().min(0),
  limit: rules.limit
});

export const stateAnalyticsSchema = Joi.object({
  period: rules.period,
  start_date: rules.startDate,
  end_date: rules.endDate,
  metric: rules.metric,
  country_id: Joi.number().integer().positive().messages({
    'number.base': 'Country ID must be a number',
    'number.integer': 'Country ID must be an integer',
    'number.positive': 'Country ID must be a positive number'
  }),
  country_code: Joi.string().uppercase().length(2),
  min_population: Joi.number().integer().min(0),
  max_population: Joi.number().integer().min(0),
  limit: rules.limit
});

export const cityAnalyticsSchema = Joi.object({
  period: rules.period,
  start_date: rules.startDate,
  end_date: rules.endDate,
  metric: rules.metric,
  state_id: Joi.number().integer().positive().messages({
    'number.base': 'State ID must be a number',
    'number.integer': 'State ID must be an integer',
    'number.positive': 'State ID must be a positive number'
  }),
  state_code: Joi.string().uppercase().min(2).max(3),
  country_id: Joi.number().integer().positive(),
  country_code: Joi.string().uppercase().length(2),
  is_capital: Joi.boolean(),
  min_population: Joi.number().integer().min(0),
  max_population: Joi.number().integer().min(0),
  limit: rules.limit
});

export const trendAnalyticsSchema = Joi.object({
  period: rules.period,
  start_date: rules.startDate,
  end_date: rules.endDate,
  entity: rules.entity,
  metric: Joi.string().valid('created', 'updated', 'deleted', 'active').default('created'),
  limit: rules.limit
});

export const distributionAnalyticsSchema = Joi.object({
  entity: rules.entity,
  groupBy: rules.groupBy,
  limit: rules.limit,
  filter: Joi.object()
});

export const compareAnalyticsSchema = Joi.object({
  entity: rules.entity,
  metric: rules.metric,
  ids: Joi.array().items(Joi.number().integer().positive()).min(1).max(10).required().messages({
    'array.base': 'IDs must be an array',
    'array.min': 'At least one ID is required',
    'array.max': 'Cannot compare more than 10 items',
    'any.required': 'IDs are required'
  }),
  period: rules.period,
  start_date: rules.startDate,
  end_date: rules.endDate
});

// ==========================================
// Validation Middleware
// ==========================================

export const validateAnalytics = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      return res.status(400).json({
        success: false,
        message: 'Invalid analytics parameters',
        errors,
        timestamp: new Date().toISOString()
      });
    }

    req.query = value;
    next();
  };
};

// ==========================================
// Export all analytics validations
// ==========================================

export default {
  // Schemas
  dashboardAnalyticsSchema,
  countryAnalyticsSchema,
  stateAnalyticsSchema,
  cityAnalyticsSchema,
  trendAnalyticsSchema,
  distributionAnalyticsSchema,
  compareAnalyticsSchema,

  // Middleware
  validateAnalytics
};