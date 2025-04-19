import { createTheme } from '@mui/material/styles';

const baseTheme = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
};

export const theme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#25D366',
      light: '#5DFF8E',
      dark: '#00A03A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#128C7E',
      light: '#4ABFAC',
      dark: '#005B52',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A202C',
      secondary: '#4A5568',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
          borderRadius: 8,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(26, 32, 44, 0.9)',
          borderRadius: 6,
          padding: '8px 12px',
          fontSize: '0.75rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export const commonStyles = {
  pageContainer: {
    p: 2,
    height: '100%',
    overflow: 'auto',
    '& .MuiCard-root': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    '& .MuiCardContent-root': {
      flex: 1,
      p: 2,
    },
    '& .MuiCardHeader-root': {
      p: 2,
    },
  },
  button: {
    backgroundColor: 'primary.main',
    color: 'white',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  },
  input: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
        borderWidth: 2,
      },
    },
  },
  card: {
    borderRadius: 2,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    transition: 'all 0.2s ease',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
  },
}; 