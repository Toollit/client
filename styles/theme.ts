const fontSizes = {
  xsmall: '1.2rem',
  small: '1.4rem',
  base: '1.6rem',
  large: '1.8rem',
  xlarge: '2.0rem',
  xxlarge: '2.2rem',
  xxxlarge: '2.4rem',
  titleSize: '3.4rem',
};

const paddings = {
  xsmall: '0.5rem',
  small: '0.8rem',
  base: '1rem',
  large: '1.2rem',
  xlarge: '1.4rem',
  xxlarge: '1.6rem',
  xxxlarge: '1.8rem',
};

const margins = {
  small: '0.8rem',
  base: '1rem',
  large: '1.2rem',
  xlarge: '1.4rem',
  xxlarge: '1.6rem',
  xxxlarge: '1.8rem',
};

const interval = {
  small: '2.5rem',
  base: '5rem',
  large: '10rem',
  xlarge: '15',
  xxlarge: '20rem',
  xxxlarge: '25rem',
};

const verticalInterval = {
  base: `10rem 0 1rem 0`,
};

export const colors = {
  theme: '#4dd290',
  black: '#303038', // #3c4043
  white: '#ffffff',
  lightGray: '#f2f2f2',
  gray: '#767678',
  developer: '#4dd290',
  designer: '#ffb65a',
  pm: '#fc9557',
  anyone: '#868686',
  error: '#e5503c',
  warning: '#ffb65a',
  info: '#767678',
  success: '#4dd290',
  button: {
    activeGreen: '#3da571',
    activeGray: 'rgba(15, 20, 25, 0.2)',
    disabled: '#0f141950',
    hoverGreen: '#f0fff0',
    hoverGray: 'rgba(15, 20, 25, 0.1)',
  },
  border: {
    container: '#e9ecef',
    divider: '#cfd9de',
    base: '#cfd9de',
  },
  text: {
    gray: '#868e96',
  },
};

const borderRadius = {
  base: '0.8rem',
  sharp: '0.3rem',
};

const boxShadow = {
  base: `0 1px 3px rgba(0, 0, 0, 0.05),
  0 10px 15px -5px rgba(0, 0, 0, 0.05), 0 7px 7px -5px rgba(0, 0, 0, 0.04)`,
  hover: `0px 0px #767678, 0px 0 0.4rem #767678`,
};

const layout = {
  navHeight: '6rem',
  bottomButtonHeight: '9rem',
};

const theme = {
  fontSizes,
  colors,
  layout,
  paddings,
  margins,
  interval,
  verticalInterval,
  borderRadius,
  boxShadow,
};

export default theme;
