import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
    font-size: 10px;
    font-family: 'Noto Sans KR', sans-serif;
}


/* Google Fonts */
@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url('/static/fonts/NotoSansKR-Thin.otf') format('opentype');
}

@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url('/static/fonts/NotoSansKR-Light.otf') format('opentype');
}

@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400; // default font weight
  font-display: swap;
  src: url('/static/NotoSansKR-Regular.otf') format('opentype');
}

@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/static/fonts/NotoSansKR-Medium.otf') format('opentype');
}

@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: bold; // 700
  font-display: swap;
  src: url('/static/fonts/NotoSansKR-Bold.otf') format('opentype');
}

@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url('/static/fonts/NotoSansKR-Black.otf') format('opentype');
}

`;

export default GlobalStyles;