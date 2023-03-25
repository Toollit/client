import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    fontSizes: {
      xsmall: string;
      small: string;
      base: string;
      large: string;
      xlarge: string;
      xxlarge: string;
      xxxlarge: string;
      titleSize: string;
    };

    paddings: {
      xsmall: string;
      small: string;
      base: string;
      large: string;
      xlarge: string;
      xxlarge: string;
      xxxlarge: string;
    };

    margins: {
      small: string;
      base: string;
      large: string;
      xlarge: string;
      xxlarge: string;
      xxxlarge: string;
    };

    interval: {
      small: string;
      base: string;
      large: string;
      xlarge: string;
      xxlarge: string;
      xxxlarge: string;
    };

    verticalInterval: {
      base: string;
    };

    colors: {
      theme: string;
      black: string;
      white: string;
      lightGray: string;
      gray: string;
      disabled: string;
      border: string;
      hoverGreen: string;
      activeGreen: string;
    };

    deviceSizes: {};
  }
}

// You are also able to use a 3rd party theme this way:
// import '@emotion/react';
// import { LibTheme } from 'some-lib';

// declare module '@emotion/react' {
//   export interface Theme extends LibTheme {}
// }