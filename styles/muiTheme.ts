import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0fed',
    },
    secondary: {
      main: '#fff',
    },
  },
  breakpoints: {
    values: {
      xsMobile: 0,
      mobile: 425,
      tablet: 768,
      laptop: 1024,
    },
  },
});
