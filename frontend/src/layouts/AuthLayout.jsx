import { Box, Container } from '@mui/material'
import Navbar from '../components/Navbar'

export default function AuthLayout({ children }) {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Container maxWidth="sm" sx={{ flex: 1, display: 'grid', placeItems: 'center', py: 6 }}>
        {children}
      </Container>
    </Box>
  )
}
