import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    xsMobile: true; //extra-small mobile breakpoint
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    // desktop: true;
  }
}
