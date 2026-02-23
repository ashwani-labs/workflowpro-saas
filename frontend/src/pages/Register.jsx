import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  Alert,
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import AuthLayout from '../layouts/AuthLayout'
import AnimatedPage from '../components/AnimatedPage'
import { useRegisterMutation } from '../api/authApi'
import { useAppDispatch } from '../app/hooks'
import { login } from '../features/authSlice'
import { GitHub, Google } from '@mui/icons-material'

const MotionCard = motion.create(Card)

export default function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [registerApi, { isLoading }] = useRegisterMutation()

  const [values, setValues] = useState({ 
    name: '', 
    email: '', 
    password: '',
    createOrganization: false,
    organizationName: '',
    organizationDomain: ''
  })
  const [touched, setTouched] = useState({})
  const [error, setError] = useState('')

  const onChange = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setValues((v) => ({ ...v, [key]: value }))
  }

  const nameError = touched.name && !values.name
  const emailError = touched.email && !values.email
  const passwordError = touched.password && !values.password
  const organizationNameError = touched.organizationName && values.createOrganization && !values.organizationName
  const organizationDomainError = touched.organizationDomain && values.createOrganization && !values.organizationDomain

  const onSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, password: true, organizationName: true, organizationDomain: true })
    setError('')

    // Basic validation
    if (!values.name || !values.email || !values.password) return
    
    // Organization validation if creating organization
    if (values.createOrganization && (!values.organizationName || !values.organizationDomain)) {
      setError('Organization name and domain are required when creating an organization')
      return
    }

    try {
      const submitData = {
        name: values.name,
        email: values.email,
        password: values.password,
        ...(values.createOrganization && {
          organizationName: values.organizationName,
          organizationDomain: values.organizationDomain
        })
      }
      
      const data = await registerApi(submitData).unwrap()
      dispatch(
        login({
          user: data?.user || { name: values.name, email: values.email },
          token: data?.token || 'demo-token',
        })
      )
      navigate('/dashboard')
    } catch (err) {
      setError(err?.data?.message || 'Registration failed. Please try again.')
    }
  }

  return (
    <AnimatedPage>
      <AuthLayout>
        <MotionCard
          component="form"
          onSubmit={onSubmit}
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          sx={(t) => ({
            width: '100%',
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: 4,
            boxShadow: '0px 18px 60px rgba(15, 23, 42, 0.08)',
            border: `1px solid ${t.palette.divider}`,
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(10px)',
          })}
        >
          <Stack spacing={2}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 860, letterSpacing: '-0.03em' }}>
                Create your account
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 0.4 }}>
                Start organizing work in minutes.
              </Typography>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
              <motion.div style={{ flex: 1 }} whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="inherit"
                  startIcon={<Google />}
                  onClick={() => setError('SSO placeholder (not wired yet).')}
                >
                  Sign up with Google
                </Button>
              </motion.div>
              <motion.div style={{ flex: 1 }} whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="inherit"
                  startIcon={<GitHub />}
                  onClick={() => setError('SSO placeholder (not wired yet).')}
                >
                  Sign up with GitHub
                </Button>
              </motion.div>
            </Stack>

            <Divider>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 650 }}>
                or create with email
              </Typography>
            </Divider>

            <TextField
              label="Name"
              value={values.name}
              onChange={onChange('name')}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              error={Boolean(nameError)}
              helperText={nameError ? 'Name is required' : ' '}
              fullWidth
            />

            <TextField
              label="Email"
              value={values.email}
              onChange={onChange('email')}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              error={Boolean(emailError)}
              helperText={emailError ? 'Email is required' : ' '}
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              value={values.password}
              onChange={onChange('password')}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              error={Boolean(passwordError)}
              helperText={passwordError ? 'Password is required' : ' '}
              fullWidth
            />

            <Box sx={{ mt: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={values.createOrganization}
                    onChange={onChange('createOrganization')}
                    color="primary"
                  />
                }
                label="Create new organization"
              />
            </Box>

            {values.createOrganization && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <Stack spacing={2}>
                  <Alert severity="info" sx={{ mt: 1 }}>
                    Creating an organization will make you the OWNER with full administrative privileges.
                  </Alert>
                  
                  <TextField
                    label="Organization Name"
                    value={values.organizationName}
                    onChange={onChange('organizationName')}
                    onBlur={() => setTouched((t) => ({ ...t, organizationName: true }))}
                    error={Boolean(organizationNameError)}
                    helperText={organizationNameError ? 'Organization name is required' : ' '}
                    fullWidth
                    placeholder="Acme Corp"
                  />

                  <TextField
                    label="Organization Domain"
                    value={values.organizationDomain}
                    onChange={onChange('organizationDomain')}
                    onBlur={() => setTouched((t) => ({ ...t, organizationDomain: true }))}
                    error={Boolean(organizationDomainError)}
                    helperText={organizationDomainError ? 'Organization domain is required' : 'Unique identifier for your organization'}
                    fullWidth
                    placeholder="acme-corp"
                  />
                </Stack>
              </motion.div>
            )}

            {error ? (
              <Typography variant="body2" color="error" sx={{ mt: -1 }}>
                {error}
              </Typography>
            ) : null}

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}>
              <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading}>
                {isLoading ? 'Creating…' : 'Register'}
              </Button>
            </motion.div>

            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', mt: -0.5 }}>
              By continuing you agree to our Terms and Privacy Policy.
            </Typography>

            <Button
              component={RouterLink}
              to="/login"
              variant="text"
              color="inherit"
              fullWidth
              sx={{ fontWeight: 650 }}
            >
              Already have an account? Sign in
            </Button>
          </Stack>
        </MotionCard>
      </AuthLayout>
    </AnimatedPage>
  )
}
