// src/api/v1/modules/author/models/index.js

/**
 * Models Index
 * Export all models for easy import
 */

import Author from './author.model.js';
import AuthorTranslation from './author_translation.model.js';
import AuthorAlias from './author_alias.model.js';
import AuthorLanguage from './author_language.model.js';

export {
    Author,
    AuthorTranslation,
    AuthorAlias,
    AuthorLanguage
};

// Default export for convenience
export default {
    Author,
    AuthorTranslation,
    AuthorAlias,
    AuthorLanguage
};