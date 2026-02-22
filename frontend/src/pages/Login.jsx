import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import AuthLayout from '../layouts/AuthLayout'
import AnimatedPage from '../components/AnimatedPage'
import { useLoginMutation } from '../api/authApi'
import { useAppDispatch } from '../app/hooks'
import { login } from '../features/authSlice'
import { GitHub, Google } from '@mui/icons-material'

const MotionCard = motion.create(Card)

export default function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [loginApi, { isLoading }] = useLoginMutation()

  const [values, setValues] = useState({ email: '', password: '' })
  const [touched, setTouched] = useState({})
  const [error, setError] = useState('')

  const onChange = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }))

  const emailError = touched.email && !values.email
  const passwordError = touched.password && !values.password

  const onSubmit = async (e) => {
    e.preventDefault()
    setTouched({ email: true, password: true })
    setError('')

    if (!values.email || !values.password) return

    try {
      const data = await loginApi(values).unwrap()
      dispatch(
        login({
          user: data?.user || { email: values.email },
          token: data?.token || 'demo-token',
        })
      )
      navigate('/dashboard')
    } catch (err) {
      setError(err?.data?.message || 'Login failed. Please try again.')
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
                Welcome back
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 0.4 }}>
                Sign in to continue to WorkFlowPro.
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
                  Continue with Google
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
                  Continue with GitHub
                </Button>
              </motion.div>
            </Stack>

            <Divider>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 650 }}>
                or sign in with email
              </Typography>
            </Divider>

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

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <FormControlLabel control={<Checkbox />} label="Remember me" />
              <Typography variant="body2" color="text.secondary">
                Forgot password
              </Typography>
            </Stack>

            {error ? (
              <Typography variant="body2" color="error" sx={{ mt: -1 }}>
                {error}
              </Typography>
            ) : null}

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}>
              <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading}>
                {isLoading ? 'Signing in…' : 'Login'}
              </Button>
            </motion.div>

            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', mt: -0.5 }}>
              By continuing you agree to our Terms and Privacy Policy.
            </Typography>

            <Button
              component={RouterLink}
              to="/register"
              variant="text"
              color="inherit"
              fullWidth
              sx={{ fontWeight: 650 }}
            >
              New here? Create an account
            </Button>
          </Stack>
        </MotionCard>
      </AuthLayout>
    </AnimatedPage>
  )
}
