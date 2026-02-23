import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from '@mui/material'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInviteUserMutation } from '../api/authApi'
import PermissionGuard, { useRole } from './PermissionGuard'
import { getAssignableRoles } from '../utils/permissions'
import { PersonAdd } from '@mui/icons-material'

const MotionBox = motion.create(Box)

export default function InviteUserForm({ onInviteSuccess }) {
  const [inviteUser, { isLoading, error }] = useInviteUserMutation()
  const currentUserRole = useRole()
  const assignableRoles = getAssignableRoles(currentUserRole)
  const [values, setValues] = useState({
    email: '',
    role: assignableRoles[0] || 'MEMBER',
    message: ''
  })
  const [touched, setTouched] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const onChange = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
  }

  const emailError = touched.email && !values.email
  const roleError = touched.role && !values.role

  const onSubmit = async (e) => {
    e.preventDefault()
    setTouched({ email: true, role: true })
    setSuccessMessage('')

    if (!values.email || !values.role) return

    try {
      await inviteUser(values).unwrap()
      setSuccessMessage('User invited successfully!')
      setValues({ email: '', role: 'MEMBER', message: '' })
      setTouched({})
      onInviteSuccess?.()
    } catch (err) {
      // Error is handled by the error state
    }
  }

  const handleCloseSnackbar = () => {
    setSuccessMessage('')
  }

  return (
    <MotionBox
      component="form"
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <PersonAdd />
        Invite Team Member
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Email Address"
          type="email"
          value={values.email}
          onChange={onChange('email')}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          error={Boolean(emailError)}
          helperText={emailError ? 'Email is required' : ' '}
          fullWidth
          placeholder="colleague@company.com"
        />

        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            value={values.role}
            onChange={onChange('role')}
            onBlur={() => setTouched((t) => ({ ...t, role: true }))}
            error={Boolean(roleError)}
            label="Role"
          >
            {assignableRoles.map((role) => (
              <MenuItem key={role} value={role}>
                {role === 'ADMIN' ? 'Admin - Can manage projects and users' : 
                 role === 'MEMBER' ? 'Member - Can work on assigned tasks' : role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Personal Message (Optional)"
          multiline
          rows={3}
          value={values.message}
          onChange={onChange('message')}
          fullWidth
          placeholder="Join our team to collaborate on amazing projects!"
        />

        {error && (
          <Alert severity="error">
            {error?.data?.message || 'Failed to invite user. Please try again.'}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          startIcon={<PersonAdd />}
          sx={{ mt: 1 }}
        >
          {isLoading ? 'Inviting...' : 'Send Invitation'}
        </Button>
      </Box>

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </MotionBox>
  )
}
