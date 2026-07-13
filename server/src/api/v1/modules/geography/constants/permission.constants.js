/**
 * Permission Constants
 * Defines all permission-related constants for the geography module
 */

// ==========================================
// Permission Levels
// ==========================================

export const PERMISSION_LEVELS = {
  PUBLIC: 'public',
  AUTHENTICATED: 'authenticated',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
};

// ==========================================
// Permission Actions
// ==========================================

export const PERMISSION_ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  RESTORE: 'restore',
  BULK_CREATE: 'bulk_create',
  BULK_DELETE: 'bulk_delete',
  HARD_DELETE: 'hard_delete'
};

// ==========================================
// Permission Resources
// ==========================================

export const PERMISSION_RESOURCES = {
  COUNTRY: 'country',
  STATE: 'state',
  CITY: 'city',
  CONTINENT: 'continent',
  ANALYTICS: 'analytics'
};

// ==========================================
// Permission Definitions
// ==========================================

export const PERMISSIONS = {
  // Country permissions
  COUNTRY_READ: 'country:read',
  COUNTRY_CREATE: 'country:create',
  COUNTRY_UPDATE: 'country:update',
  COUNTRY_DELETE: 'country:delete',
  COUNTRY_RESTORE: 'country:restore',
  COUNTRY_BULK_CREATE: 'country:bulk_create',
  COUNTRY_BULK_DELETE: 'country:bulk_delete',
  COUNTRY_HARD_DELETE: 'country:hard_delete',
  
  // State permissions
  STATE_READ: 'state:read',
  STATE_CREATE: 'state:create',
  STATE_UPDATE: 'state:update',
  STATE_DELETE: 'state:delete',
  STATE_RESTORE: 'state:restore',
  STATE_BULK_CREATE: 'state:bulk_create',
  STATE_BULK_DELETE: 'state:bulk_delete',
  STATE_HARD_DELETE: 'state:hard_delete',
  
  // City permissions
  CITY_READ: 'city:read',
  CITY_CREATE: 'city:create',
  CITY_UPDATE: 'city:update',
  CITY_DELETE: 'city:delete',
  CITY_RESTORE: 'city:restore',
  CITY_BULK_CREATE: 'city:bulk_create',
  CITY_BULK_DELETE: 'city:bulk_delete',
  CITY_HARD_DELETE: 'city:hard_delete',
  
  // Analytics permissions
  ANALYTICS_READ: 'analytics:read',
  ANALYTICS_DASHBOARD: 'analytics:dashboard',
  ANALYTICS_REPORT: 'analytics:report'
};

// ==========================================
// Role Permissions Mapping
// ==========================================

export const ROLE_PERMISSIONS = {
  admin: Object.values(PERMISSIONS),
  manager: [
    PERMISSIONS.COUNTRY_READ,
    PERMISSIONS.COUNTRY_CREATE,
    PERMISSIONS.COUNTRY_UPDATE,
    PERMISSIONS.COUNTRY_DELETE,
    PERMISSIONS.STATE_READ,
    PERMISSIONS.STATE_CREATE,
    PERMISSIONS.STATE_UPDATE,
    PERMISSIONS.STATE_DELETE,
    PERMISSIONS.CITY_READ,
    PERMISSIONS.CITY_CREATE,
    PERMISSIONS.CITY_UPDATE,
    PERMISSIONS.CITY_DELETE,
    PERMISSIONS.ANALYTICS_READ
  ],
  viewer: [
    PERMISSIONS.COUNTRY_READ,
    PERMISSIONS.STATE_READ,
    PERMISSIONS.CITY_READ,
    PERMISSIONS.ANALYTICS_READ
  ]
};

// ==========================================
// Export all
// ==========================================

export default {
  PERMISSION_LEVELS,
  PERMISSION_ACTIONS,
  PERMISSION_RESOURCES,
  PERMISSIONS,
  ROLE_PERMISSIONS
};