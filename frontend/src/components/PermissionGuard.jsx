import { useAppSelector } from '../app/hooks'
import { hasPermission } from '../utils/permissions'
import { Box, Typography } from '@mui/material'

/**
 * Component that conditionally renders children based on user permissions
 * @param {Object} props
 * @param {string} props.permission - Required permission
 * @param {string[]} props.permissions - Array of permissions (user needs at least one)
 * @param {boolean} props.requireAll - Whether user needs all permissions (default: false)
 * @param {React.ReactNode} props.fallback - Component to render if no permission
 * @param {React.ReactNode} props.children - Children to render if permission granted
 */
export default function PermissionGuard({ 
  permission, 
  permissions, 
  requireAll = false,
  fallback = null,
  children 
}) {
  const userRole = useAppSelector((state) => state.auth.user?.role)
  
  if (!userRole) {
    return fallback || <Box />
  }
  
  let hasRequiredPermission = false
  
  if (permission) {
    hasRequiredPermission = hasPermission(userRole, permission)
  } else if (permissions && permissions.length > 0) {
    if (requireAll) {
      hasRequiredPermission = permissions.every(perm => hasPermission(userRole, perm))
    } else {
      hasRequiredPermission = permissions.some(perm => hasPermission(userRole, perm))
    }
  }
  
  if (hasRequiredPermission) {
    return <>{children}</>
  }
  
  return fallback || <Box />
}

/**
 * Hook to check if current user has specific permission
 * @param {string} permission - Permission to check
 * @returns {boolean} - Whether user has permission
 */
export const usePermission = (permission) => {
  const userRole = useAppSelector((state) => state.auth.user?.role)
  return hasPermission(userRole, permission)
}

/**
 * Hook to get current user's role
 * @returns {string} - User's role
 */
export const useRole = () => {
  return useAppSelector((state) => state.auth.user?.role)
}
