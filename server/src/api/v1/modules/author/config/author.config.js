// src/api/v1/modules/author/config/author.config.js

const authorConfig = {
  table: {
    author: "authors",
    alias: "author_aliases",
    language: "author_languages",
    translation: "author_translations",
  },

  slug: {
    minLength: 3,
    maxLength: 150,
    separator: "-",
  },

  bio: {
    minLength: 10,
    maxLength: 10000,
  },

  name: {
    minLength: 2,
    maxLength: 255,
  },

  avatar: {
    maxSizeMB: 5,
    allowedMimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ],
  },

  cover: {
    maxSizeMB: 10,
    allowedMimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
    ],
  },

  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },

  search: {
    minKeywordLength: 2,
    defaultSort: "created_at DESC",
  },

  cache: {
    enabled: true,
    ttl: 60 * 10, // 10 minutes
  },

  status: {
    DRAFT: "draft",
    PUBLISHED: "published",
    ARCHIVED: "archived",
  },

  seo: {
    titleLength: 60,
    descriptionLength: 160,
  },
};

module.exports = authorConfig;