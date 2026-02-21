export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  PROFILE: '/auth/profile',
  
  // Project endpoints
  PROJECTS: '/projects',
  PROJECT_BY_ID: (id) => `/projects/${id}`,
  
  // Task endpoints
  TASKS: '/tasks',
  TASK_BY_ID: (id) => `/tasks/${id}`,
  TASKS_BY_PROJECT: (projectId) => `/tasks/project/${projectId}`,
  
  // Organization endpoints
  ORGANIZATIONS: '/organizations',
  ORGANIZATION_BY_ID: (id) => `/organizations/${id}`,
}

export const TASK_STATUS = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  IN_REVIEW: 'IN_REVIEW',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
}

export const TASK_PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
}

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
}
