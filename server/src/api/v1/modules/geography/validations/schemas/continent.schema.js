/**
 * Continent Validation Schemas
 * All continent-related validation schemas
 */

import Joi from 'joi';
import { rules } from '../rules.js';

// ==========================================
// Create Continent Schema
// ==========================================

export const createContinentSchema = Joi.object({
  code: rules.code2.required(),
  name: rules.name.required()
});

// ==========================================
// Update Continent Schema - ALL FIELDS OPTIONAL
// ==========================================

export const updateContinentSchema = Joi.object({
  code: rules.code2.optional(),
  name: rules.name.optional()
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// ==========================================
// Export all continent schemas
// ==========================================

export default {
  createContinentSchema,
  updateContinentSchema
};