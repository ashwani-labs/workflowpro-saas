import { createTheme, alpha } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1E3A8A',
    },
    secondary: {
      main: '#7C3AED',
    },
    background: {
      default: '#F6F7FB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A',
      secondary: alpha('#0F172A', 0.72),
    },
    divider: alpha('#0F172A', 0.10),
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: [
      'Inter',
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: { fontWeight: 750, letterSpacing: '-0.02em' },
    h2: { fontWeight: 740, letterSpacing: '-0.02em' },
    h3: { fontWeight: 720, letterSpacing: '-0.01em' },
    button: { textTransform: 'none', fontWeight: 650 },
  },
  shadows: [
    'none',
    '0px 2px 10px rgba(15, 23, 42, 0.06)',
    '0px 6px 18px rgba(15, 23, 42, 0.08)',
    '0px 10px 30px rgba(15, 23, 42, 0.10)',
    ...Array.from({ length: 21 }, () => '0px 12px 34px rgba(15, 23, 42, 0.10)'),
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F6F7FB',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${alpha('#0F172A', 0.08)}`,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingInline: 14,
          paddingBlock: 10,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'medium',
      },
    },
  },
})
