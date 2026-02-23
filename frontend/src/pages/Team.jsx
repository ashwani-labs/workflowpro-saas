import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Alert,
  Grid,
  Divider,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  useGetOrganizationUsersQuery,
  useUpdateUserRoleMutation,
  useRemoveUserMutation 
} from '../api/authApi'
import InviteUserForm from '../components/InviteUserForm'
import PermissionGuard, { useRole } from '../components/PermissionGuard'
import { 
  PERMISSIONS, 
  getAssignableRoles,
  canPerformActionOnUser 
} from '../utils/permissions'
import { 
  MoreVert, 
  Person, 
  AdminPanelSettings, 
  Crown,
  PersonRemove 
} from '@mui/icons-material'
import AnimatedPage from '../components/AnimatedPage'
import DashboardLayout from '../layouts/DashboardLayout'

const MotionCard = motion.create(Card)

const roleColors = {
  OWNER: '#FF6B35',
  ADMIN: '#4ECDC4', 
  MEMBER: '#45B7D1'
}

const roleIcons = {
  OWNER: Crown,
  ADMIN: AdminPanelSettings,
  MEMBER: Person
}

export default function Team() {
  const { data: users = [], isLoading, error } = useGetOrganizationUsersQuery()
  const [updateRole, { isLoading: isUpdatingRole }] = useUpdateUserRoleMutation()
  const [removeUser, { isLoading: isRemovingUser }] = useRemoveUserMutation()
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const currentUserRole = useRole()

  const handleMenuClick = (event, user) => {
    // Don't show menu for users with higher or equal role
    if (!canPerformActionOnUser(currentUserRole, user.role, 'change_role')) {
      return
    }
    setAnchorEl(event.currentTarget)
    setSelectedUser(user)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedUser(null)
  }

  const handleRoleChange = async (newRole) => {
    if (!selectedUser) return
    
    try {
      await updateRole({ 
        userId: selectedUser.id, 
        role: newRole 
      }).unwrap()
      setRefreshKey(prev => prev + 1)
    } catch (err) {
      // Error handled by RTK Query
    }
    handleMenuClose()
  }

  const handleRemoveUser = async () => {
    if (!selectedUser) return
    
    try {
      await removeUser(selectedUser.id).unwrap()
      setRefreshKey(prev => prev + 1)
    } catch (err) {
      // Error handled by RTK Query
    }
    handleMenuClose()
  }

  const handleInviteSuccess = () => {
    setRefreshKey(prev => prev + 1)
  }

  const getRoleChip = (role) => {
    const Icon = roleIcons[role] || Person
    return (
      <Chip
        icon={<Icon sx={{ fontSize: 16 }} />}
        label={role}
        size="small"
        sx={{
          backgroundColor: roleColors[role],
          color: 'white',
          fontWeight: 600,
          '& .MuiChip-icon': {
            color: 'white'
          }
        }}
      />
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <Alert severity="error">
          Failed to load team members. Please try again.
        </Alert>
      </DashboardLayout>
    )
  }

  return (
    <AnimatedPage>
      <DashboardLayout>
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          sx={{ p: 3 }}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            Team Management
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Team Members ({users.length})
              </Typography>
              
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} hover>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getRoleChip(user.role)}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={(e) => handleMenuClick(e, user)}
                            disabled={isUpdatingRole || isRemovingUser}
                          >
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12} md={4}>
              <Divider sx={{ mb: 2, display: { xs: 'block', md: 'none' } }} />
              <PermissionGuard permission={PERMISSIONS.INVITE_USERS}>
                <InviteUserForm onInviteSuccess={handleInviteSuccess} />
              </PermissionGuard>
            </Grid>
          </Grid>
        </MotionCard>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {getAssignableRoles(currentUserRole).map((role) => (
            <MenuItem 
              key={role}
              onClick={() => handleRoleChange(role)}
              disabled={selectedUser?.role === role}
            >
              Make {role}
            </MenuItem>
          ))}
          <Divider />
          <PermissionGuard permission={PERMISSIONS.REMOVE_USERS}>
            <MenuItem 
              onClick={handleRemoveUser}
              sx={{ color: 'error.main' }}
            >
              <PersonRemove sx={{ mr: 1 }} />
              Remove from Team
            </MenuItem>
          </PermissionGuard>
        </Menu>
      </DashboardLayout>
    </AnimatedPage>
  )
}
