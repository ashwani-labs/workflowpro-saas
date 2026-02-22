import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from './Logo'

const MotionButton = motion.create(Button)

export default function Navbar() {
  const location = useLocation()
  const onAuth = location.pathname === '/login' || location.pathname === '/register'

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={(t) => ({
        backgroundColor: 'rgba(246, 247, 251, 0.7)',
        backdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${t.palette.divider}`,
        color: t.palette.text.primary,
      })}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Box component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            <Logo />
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            {!onAuth && (
              <>
                <MotionButton
                  component={RouterLink}
                  to="/login"
                  color="inherit"
                  variant="text"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Login
                </MotionButton>
                <MotionButton
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </MotionButton>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
