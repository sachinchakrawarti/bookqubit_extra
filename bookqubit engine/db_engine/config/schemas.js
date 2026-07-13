/**
 * Schema Registry
 * Defines all schemas by category
 */

module.exports = {
  '01_core': [
    'auth_schema',
    'users_schema',
    'geography_schema',
    'language_schema',
    'permission_schema',
    'roles_schema',
    'settings_schema'
  ],
  '02_domain': [
    'books_schema',
    'authors_schema',
    'publishers_schema',
    'category_schema',
    'genres_schema',
    'series_schema',
    'tags_schema',
    'collections_schema',
    'library_schema'
  ],
  '03_feature': [
    'academic_books_schema',
    'comics_schema',
    'trends_schema',
    'recommendations_schema'
  ],
  '04_interaction': [
    'reviews_schema',
    'ratings_schema',
    'bookmarks_schema',
    'favorites_schema',
    'comments_schema',
    'reading_history_schema',
    'reading_lists_schema',
    'user_library_schema'
  ],
  '05_analytics': [
    'analytics_schema',
    'dashboard_schema',
    'reporting_schema',
    'trending_schema',
    'user_analytics_schema'
  ],
  '06_notification': [
    'notification_schema',
    'email_schema',
    'push_schema',
    'inapp_schema'
  ],
  '07_shared': [
    'audit_schema',
    'cache_schema',
    'logs_schema',
    'media_schema',
    'translations_schema',
    'utilities_schema',
    'common_schema'
  ]
};