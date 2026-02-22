import {
  Box,
  Button,
  Card,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import AuthLayout from '../layouts/AuthLayout'
import AnimatedPage from '../components/AnimatedPage'
import { useRegisterMutation } from '../api/authApi'
import { useAppDispatch } from '../app/hooks'
import { login } from '../features/authSlice'

const MotionCard = motion.create(Card)

export default function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [registerApi, { isLoading }] = useRegisterMutation()

  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [touched, setTouched] = useState({})
  const [error, setError] = useState('')

  const onChange = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }))

  const nameError = touched.name && !values.name
  const emailError = touched.email && !values.email
  const passwordError = touched.password && !values.password

  const onSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, password: true })
    setError('')

    if (!values.name || !values.email || !values.password) return

    try {
      const data = await registerApi(values).unwrap()
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
          sx={{ width: '100%', p: { xs: 2.5, sm: 3.5 }, borderRadius: 4 }}
        >
          <Stack spacing={2.2}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 820, letterSpacing: '-0.02em' }}>
                Create your account
              </Typography>
              <Typography color="text.secondary">Start organizing work in minutes.</Typography>
            </Box>

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
