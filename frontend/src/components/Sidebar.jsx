import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import {
  DashboardRounded,
  FolderRounded,
  ChecklistRounded,
  GroupsRounded,
  SettingsRounded,
} from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const nav = [
  { label: 'Dashboard', to: '/dashboard', icon: <DashboardRounded /> },
  { label: 'Projects', to: '/dashboard?tab=projects', icon: <FolderRounded /> },
  { label: 'Tasks', to: '/dashboard?tab=tasks', icon: <ChecklistRounded /> },
  { label: 'Team', to: '/team', icon: <GroupsRounded /> },
  { label: 'Settings', to: '/dashboard?tab=settings', icon: <SettingsRounded /> },
]

export default function Sidebar({ width = 280, open = true, variant = 'permanent', onClose }) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      variant={variant}
      PaperProps={{
        sx: (t) => ({
          width,
          borderRight: `1px solid ${t.palette.divider}`,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.75))',
          backdropFilter: 'blur(14px)',
        }),
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        sx={{ p: 2.5 }}
      >
        <Typography sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>Navigation</Typography>
      </Box>

      <List sx={{ px: 1.5, pb: 2 }}>
        {nav.map((item) => (
          <ListItemButton
            key={item.label}
            component={NavLink}
            to={item.to}
            sx={(t) => ({
              borderRadius: 2,
              mb: 0.75,
              '&.active': {
                backgroundColor: 'rgba(30, 58, 138, 0.08)',
                border: `1px solid ${t.palette.divider}`,
              },
            })}
          >
            <ListItemIcon sx={{ minWidth: 38 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 650 }} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}
