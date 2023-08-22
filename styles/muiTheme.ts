import { createTheme } from '@mui/material/styles';
import { colors } from './theme';

export const theme = createTheme({
  palette: {
    error: {
      main: colors.error,
    },
    warning: {
      main: colors.warning,
    },
    info: {
      main: colors.info,
    },
    success: {
      main: colors.success,
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
