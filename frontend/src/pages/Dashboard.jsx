import { Box, Card, Grid, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import DashboardLayout from '../layouts/DashboardLayout'
import AnimatedPage from '../components/AnimatedPage'
import {
  FolderRounded,
  ChecklistRounded,
  GroupsRounded,
  BoltRounded,
} from '@mui/icons-material'

const MotionCard = motion.create(Card)

const stats = [
  { title: 'Total Projects', value: '12', icon: <FolderRounded /> },
  { title: 'Tasks', value: '48', icon: <ChecklistRounded /> },
  { title: 'Teams', value: '5', icon: <GroupsRounded /> },
]

export default function Dashboard() {
  return (
    <AnimatedPage>
      <DashboardLayout>
        <Stack spacing={2.5}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 850, letterSpacing: '-0.03em' }}>
              Dashboard
            </Typography>
            <Typography color="text.secondary">
              A quick snapshot of your workspace. (Demo placeholders)
            </Typography>
          </Box>

          <Grid container spacing={2.5}>
            {stats.map((s, idx) => (
              <Grid item xs={12} md={4} key={s.title}>
                <MotionCard
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  sx={{
                    p: 2.5,
                    borderRadius: 4,
                    boxShadow: '0px 14px 50px rgba(15, 23, 42, 0.06)',
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography color="text.secondary" sx={{ fontWeight: 650 }}>
                        {s.title}
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: 850, letterSpacing: '-0.03em' }}>
                        {s.value}
                      </Typography>
                    </Box>
                    <Box
                      sx={(t) => ({
                        width: 48,
                        height: 48,
                        borderRadius: 3,
                        display: 'grid',
                        placeItems: 'center',
                        background: `linear-gradient(135deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
                        color: 'white',
                        boxShadow: '0px 18px 45px rgba(30, 58, 138, 0.22)',
                      })}
                    >
                      {s.icon}
                    </Box>
                  </Stack>
                </MotionCard>
              </Grid>
            ))}
          </Grid>

          <MotionCard
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            sx={{ p: 2.5, borderRadius: 4, overflow: 'hidden' }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
              <Typography sx={{ fontWeight: 820, letterSpacing: '-0.01em' }}>Recent Activity</Typography>
              <Box display="flex" alignItems="center" gap={1} color="text.secondary">
                <BoltRounded fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  Live feed coming soon
                </Typography>
              </Box>
            </Stack>

            <Stack spacing={1.2}>
              {[1, 2, 3, 4].map((i) => (
                <Box
                  key={i}
                  sx={(t) => ({
                    p: 1.5,
                    borderRadius: 3,
                    border: `1px solid ${t.palette.divider}`,
                    background: 'rgba(255,255,255,0.75)',
                  })}
                >
                  <Typography sx={{ fontWeight: 700 }}>Activity item #{i}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Placeholder description for a recent action in your workspace.
                  </Typography>
                </Box>
              ))}
            </Stack>
          </MotionCard>
        </Stack>
      </DashboardLayout>
    </AnimatedPage>
  )
}
