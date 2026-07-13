/**
 * Admin Constants
 * Defines admin-related constants for the geography module
 */

// ==========================================
// Admin Roles
// ==========================================

export const ADMIN_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  VIEWER: 'viewer',
  ANALYST: 'analyst'
};

// ==========================================
// Admin Actions
// ==========================================

export const ADMIN_ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  RESTORE: 'restore',
  EXPORT: 'export',
  IMPORT: 'import',
  MANAGE_USERS: 'manage_users',
  MANAGE_ROLES: 'manage_roles'
};

// ==========================================
// Admin Status
// ==========================================

export const ADMIN_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING: 'pending'
};

// ==========================================
// Export all
// ==========================================

export default {
  ADMIN_ROLES,
  ADMIN_ACTIONS,
  ADMIN_STATUS
};