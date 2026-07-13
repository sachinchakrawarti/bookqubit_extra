/**
 * Transformers Index
 * Export all transformer classes
 */

export { BaseTransformer } from './base.transformer.js';
export { GeographyTransformer } from './geography.transformer.js';

// Combined transformers for backward compatibility
import { BaseTransformer } from './base.transformer.js';
import { GeographyTransformer } from './geography.transformer.js';

export default {
  BaseTransformer,
  GeographyTransformer
};

// Transformer factory
export const createTransformer = (type = 'geography') => {
  switch (type) {
    case 'geography':
      return new GeographyTransformer();
    default:
      throw new Error(`Unknown transformer type: ${type}`);
  }
};