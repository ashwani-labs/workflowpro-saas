import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

export default function AuthLayout({ children }) {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: 'grid',
          alignItems: 'center',
          py: { xs: 4, md: 6 },
        }}
      >
        <Paper
          elevation={0}
          sx={(t) => ({
            borderRadius: 5,
            overflow: 'hidden',
            border: `1px solid ${t.palette.divider}`,
            background: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(16px)',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
            minHeight: { xs: 'auto', md: 620 },
          })}
        >
          <Box
            sx={(t) => ({
              display: { xs: 'none', md: 'block' },
              position: 'relative',
              p: 5,
              color: 'white',
              background:
                'radial-gradient(900px 380px at 20% 10%, rgba(124, 58, 237, 0.75), transparent 55%), radial-gradient(900px 380px at 70% 0%, rgba(30, 58, 138, 0.85), transparent 60%), linear-gradient(135deg, #0B1224, #111B36)',
            })}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              sx={{ maxWidth: 520 }}
            >
              <Typography variant="h3" sx={{ fontWeight: 880, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                Work that feels effortless.
              </Typography>
              <Typography sx={{ mt: 1.5, opacity: 0.85, lineHeight: 1.7 }}>
                WorkFlowPro brings projects, tasks, and teams into a single premium workspace.
              </Typography>

              <Stack spacing={1.4} sx={{ mt: 3.2 }}>
                {[
                  'Fast navigation and clean surfaces',
                  'Smooth motion and delightful micro-interactions',
                  'Built for modern teams and serious output',
                ].map((text, idx) => (
                  <Box
                    key={text}
                    component={motion.div}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.08 + idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.2,
                      p: 1.2,
                      borderRadius: 3,
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.9)',
                        boxShadow: '0px 10px 30px rgba(124, 58, 237, 0.45)',
                      }}
                    />
                    <Typography sx={{ fontWeight: 650, opacity: 0.95 }}>{text}</Typography>
                  </Box>
                ))}
              </Stack>

              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                sx={{
                  mt: 4,
                  p: 2.2,
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.14)',
                }}
              >
                <Typography sx={{ fontWeight: 750, letterSpacing: '-0.01em' }}>
                  “Feels like Linear-level polish.”
                </Typography>
                <Typography sx={{ mt: 0.6, opacity: 0.85 }}>
                  A premium base UI you can build into a real SaaS product.
                </Typography>
              </Box>
            </Box>

            <Box
              component={motion.div}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              sx={{
                position: 'absolute',
                right: -80,
                bottom: -80,
                width: 260,
                height: 260,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(124, 58, 237, 0.55), transparent 60%)',
                filter: 'blur(2px)',
              }}
            />
            <Box
              component={motion.div}
              animate={{ y: [0, 12, 0], rotate: [0, 4, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              sx={{
                position: 'absolute',
                left: -90,
                top: -90,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(30, 58, 138, 0.65), transparent 60%)',
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'grid',
              placeItems: 'center',
              p: { xs: 2.5, sm: 3.5, md: 4 },
              background:
                'radial-gradient(900px 400px at 20% 0%, rgba(124, 58, 237, 0.10), transparent 55%), radial-gradient(900px 400px at 90% 10%, rgba(30, 58, 138, 0.10), transparent 60%)',
            }}
          >
            <Box sx={{ width: '100%', maxWidth: 460 }}>{children}</Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
