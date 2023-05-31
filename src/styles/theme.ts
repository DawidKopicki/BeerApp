import { createTheme } from '@mui/material/styles';
import { amber, brown } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: amber[600],
    },
    secondary: {
      main: brown[700],
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiLink-root': {
            color: brown[700],
          },
        },
      }
    },
  },
});

export { theme };
