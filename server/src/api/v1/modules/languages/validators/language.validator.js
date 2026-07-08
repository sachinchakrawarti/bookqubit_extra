// src/api/v1/modules/languages/validators/language.validator.js

export function validateCreateLanguage(data) {
  const errors = [];

  if (!data.language_code?.trim()) {
    errors.push('language_code is required.');
  }

  if (!data.language_name?.trim()) {
    errors.push('language_name is required.');
  }

  if (!data.english_name?.trim()) {
    errors.push('english_name is required.');
  }

  if (!data.native_name?.trim()) {
    errors.push('native_name is required.');
  }

  if (
    data.direction &&
    !['LTR', 'RTL'].includes(data.direction.toUpperCase())
  ) {
    errors.push('direction must be either LTR or RTL.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateUpdateLanguage(data) {
  const errors = [];

  if (
    data.direction !== undefined &&
    !['LTR', 'RTL'].includes(String(data.direction).toUpperCase())
  ) {
    errors.push('direction must be either LTR or RTL.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}