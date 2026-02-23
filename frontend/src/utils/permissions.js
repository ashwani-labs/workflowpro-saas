// Role-based permission utilities for frontend

export const ROLES = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN', 
  MEMBER: 'MEMBER'
}

export const PERMISSIONS = {
  // Organization permissions
  MANAGE_ORGANIZATION: 'manage_organization',
  
  // User management permissions
  INVITE_USERS: 'invite_users',
  MANAGE_USERS: 'manage_users',
  REMOVE_USERS: 'remove_users',
  
  // Project permissions
  CREATE_PROJECTS: 'create_projects',
  MANAGE_PROJECTS: 'manage_projects',
  VIEW_PROJECTS: 'view_projects',
  
  // Task permissions
  CREATE_TASKS: 'create_tasks',
  MANAGE_TASKS: 'manage_tasks',
  VIEW_TASKS: 'view_tasks',
  ASSIGN_TASKS: 'assign_tasks'
}

// Role permissions mapping
const ROLE_PERMISSIONS = {
  [ROLES.OWNER]: [
    PERMISSIONS.MANAGE_ORGANIZATION,
    PERMISSIONS.INVITE_USERS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.REMOVE_USERS,
    PERMISSIONS.CREATE_PROJECTS,
    PERMISSIONS.MANAGE_PROJECTS,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.CREATE_TASKS,
    PERMISSIONS.MANAGE_TASKS,
    PERMISSIONS.VIEW_TASKS,
    PERMISSIONS.ASSIGN_TASKS
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.INVITE_USERS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.CREATE_PROJECTS,
    PERMISSIONS.MANAGE_PROJECTS,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.CREATE_TASKS,
    PERMISSIONS.MANAGE_TASKS,
    PERMISSIONS.VIEW_TASKS,
    PERMISSIONS.ASSIGN_TASKS
  ],
  [ROLES.MEMBER]: [
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.VIEW_TASKS
  ]
}

/**
 * Check if user has specific permission
 * @param {string} userRole - User's role
 * @param {string} permission - Permission to check
 * @returns {boolean} - Whether user has permission
 */
export const hasPermission = (userRole, permission) => {
  const userPermissions = ROLE_PERMISSIONS[userRole] || []
  return userPermissions.includes(permission)
}

/**
 * Check if user has any of the specified permissions
 * @param {string} userRole - User's role
 * @param {string[]} permissions - Array of permissions to check
 * @returns {boolean} - Whether user has any of the permissions
 */
export const hasAnyPermission = (userRole, permissions) => {
  return permissions.some(permission => hasPermission(userRole, permission))
}

/**
 * Check if user has all of the specified permissions
 * @param {string} userRole - User's role
 * @param {string[]} permissions - Array of permissions to check
 * @returns {boolean} - Whether user has all permissions
 */
export const hasAllPermissions = (userRole, permissions) => {
  return permissions.every(permission => hasPermission(userRole, permission))
}

/**
 * Get role hierarchy level (higher number = higher privilege)
 * @param {string} role - Role to check
 * @returns {number} - Hierarchy level
 */
export const getRoleHierarchy = (role) => {
  const hierarchy = {
    [ROLES.OWNER]: 3,
    [ROLES.ADMIN]: 2,
    [ROLES.MEMBER]: 1
  }
  return hierarchy[role] || 0
}

/**
 * Check if user can perform action on another user
 * @param {string} userRole - Current user's role
 * @param {string} targetUserRole - Target user's role
 * @param {string} action - Action to perform
 * @returns {boolean} - Whether action is allowed
 */
export const canPerformActionOnUser = (userRole, targetUserRole, action) => {
  const userHierarchy = getRoleHierarchy(userRole)
  const targetHierarchy = getRoleHierarchy(targetUserRole)
  
  // Cannot perform actions on users with higher or equal hierarchy
  if (targetHierarchy >= userHierarchy) {
    return false
  }
  
  // Specific action rules
  switch (action) {
    case 'remove':
      return hasPermission(userRole, PERMISSIONS.REMOVE_USERS)
    case 'change_role':
      return hasPermission(userRole, PERMISSIONS.MANAGE_USERS)
    default:
      return false
  }
}

/**
 * Get available roles that can be assigned by a user
 * @param {string} userRole - Current user's role
 * @returns {string[]} - Array of assignable roles
 */
export const getAssignableRoles = (userRole) => {
  switch (userRole) {
    case ROLES.OWNER:
      return [ROLES.ADMIN, ROLES.MEMBER]
    case ROLES.ADMIN:
      return [ROLES.MEMBER]
    default:
      return []
  }
}
