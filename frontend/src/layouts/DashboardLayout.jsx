import { AppBar, Avatar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logout } from '../features/authSlice'

export default function DashboardLayout({ children }) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((s) => s.auth)
  const [mobileOpen, setMobileOpen] = useState(false)

  const initials = useMemo(() => {
    const name = user?.name || user?.email || 'User'
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join('')
  }, [user])

  return (
    <Box minHeight="100vh" display="flex">
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Sidebar />
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Sidebar variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </Box>

      <Box flex={1} display="flex" flexDirection="column">
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
          <Toolbar>
            <Button
              onClick={() => setMobileOpen(true)}
              sx={{ display: { xs: 'inline-flex', md: 'none' } }}
              color="inherit"
            >
              Menu
            </Button>
            <Typography sx={{ fontWeight: 800, letterSpacing: '-0.02em', flex: 1 }}>
              WorkFlowPro
            </Typography>
            <Box display="flex" alignItems="center" gap={1.2}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>{initials}</Avatar>
              <Button variant="outlined" onClick={() => dispatch(logout())}>
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 3, flex: 1 }}>
          {children}
        </Container>
      </Box>
    </Box>
  )
}
