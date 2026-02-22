import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
  Paper,
} from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AnimatedPage from '../components/AnimatedPage'
import {
  FolderRounded,
  ChecklistRounded,
  GroupsRounded,
  QueryStatsRounded,
} from '@mui/icons-material'

const MotionCard = motion.create(Card)

const features = [
  {
    title: 'Projects',
    desc: 'Plan, track, and ship with clarity across teams and timelines.',
    icon: <FolderRounded fontSize="medium" />,
  },
  {
    title: 'Tasks',
    desc: 'Turn goals into actionable work with smart prioritization.',
    icon: <ChecklistRounded fontSize="medium" />,
  },
  {
    title: 'Teams',
    desc: 'Bring everyone together with shared context and fast updates.',
    icon: <GroupsRounded fontSize="medium" />,
  },
  {
    title: 'Analytics',
    desc: 'See progress in real time with executive-ready insights.',
    icon: <QueryStatsRounded fontSize="medium" />,
  },
]

export default function Landing() {
  return (
    <AnimatedPage>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Navbar />

        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 }, flex: 1 }}>
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack spacing={2.5}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 850,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.05,
                    }}
                  >
                    Manage Work Smarter
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    WorkFlowPro helps you align projects, tasks, and teams in one premium workspace.
                    Beautiful UI. Smooth flow. Serious output.
                  </Typography>
                </motion.div>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 1 }}>
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button component={RouterLink} to="/register" size="large" variant="contained">
                      Start Free
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button component={RouterLink} to="/login" size="large" variant="outlined">
                      Sign In
                    </Button>
                  </motion.div>
                </Stack>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.12 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Trusted by modern teams who value speed, clarity, and craft.
                  </Typography>
                </motion.div>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Paper
                  elevation={0}
                  sx={(t) => ({
                    borderRadius: 4,
                    p: { xs: 2.5, md: 3 },
                    border: `1px solid ${t.palette.divider}`,
                    background:
                      'radial-gradient(1200px 420px at 20% 0%, rgba(124, 58, 237, 0.14), transparent 60%), radial-gradient(1000px 420px at 80% 10%, rgba(30, 58, 138, 0.14), transparent 62%), linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                    overflow: 'hidden',
                    position: 'relative',
                  })}
                >
                  <Box
                    component={motion.div}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    sx={{
                      borderRadius: 3,
                      height: { xs: 280, md: 360 },
                      display: 'grid',
                      placeItems: 'center',
                      border: (t) => `1px solid ${t.palette.divider}`,
                      background:
                        'linear-gradient(135deg, rgba(30, 58, 138, 0.10), rgba(124, 58, 237, 0.10))',
                    }}
                  >
                    <Typography sx={{ fontWeight: 800 }} color="text.secondary">
                      Illustration Placeholder
                    </Typography>
                  </Box>

                  <Box
                    component={motion.div}
                    animate={{ rotate: [0, 3, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    sx={(t) => ({
                      position: 'absolute',
                      top: -50,
                      right: -60,
                      width: 180,
                      height: 180,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, rgba(124, 58, 237, 0.25), transparent 60%)`,
                      filter: 'blur(0px)',
                    })}
                  />
                </Paper>
              </motion.div>
            </Grid>
          </Grid>

          <Box sx={{ pt: { xs: 6, md: 9 } }}>
            <Typography variant="h4" sx={{ fontWeight: 820, letterSpacing: '-0.02em', mb: 2.5 }}>
              Built for momentum
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5, maxWidth: 720 }}>
              A premium foundation for building your workflow: fast navigation, clean surfaces, and
              smooth motion everywhere.
            </Typography>

            <Grid container spacing={2.5}>
              {features.map((f, idx) => (
                <Grid item xs={12} sm={6} md={3} key={f.title}>
                  <MotionCard
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.55, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                    sx={{
                      p: 2.5,
                      height: '100%',
                      borderRadius: 3,
                      boxShadow: '0px 10px 40px rgba(15, 23, 42, 0.06)',
                    }}
                  >
                    <Box
                      sx={(t) => ({
                        width: 44,
                        height: 44,
                        borderRadius: 2.5,
                        display: 'grid',
                        placeItems: 'center',
                        mb: 1.5,
                        background: `linear-gradient(135deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
                        color: 'white',
                      })}
                    >
                      {f.icon}
                    </Box>
                    <Typography sx={{ fontWeight: 780, mb: 0.5 }}>{f.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                      {f.desc}
                    </Typography>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>

        <Box sx={{ borderTop: (t) => `1px solid ${t.palette.divider}`, py: 3 }}>
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} WorkFlowPro. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </AnimatedPage>
  )
}
