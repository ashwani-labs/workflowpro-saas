import { Box, Typography } from '@mui/material'

export default function Logo({ size = 'md' }) {
  const fontSize = size === 'lg' ? 22 : 18

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Box
        sx={(t) => ({
          width: 34,
          height: 34,
          borderRadius: 2.5,
          background: `linear-gradient(135deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
          boxShadow: '0px 10px 30px rgba(30, 58, 138, 0.22)',
        })}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          letterSpacing: '-0.02em',
          fontSize,
          lineHeight: 1,
        }}
      >
        WorkFlowPro
      </Typography>
    </Box>
  )
}
