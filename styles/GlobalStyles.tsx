import { Global, css } from '@emotion/react';

const styles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    font-size: 10px;
    font-family: 'Noto Sans KR', sans-serif;
    height: 100%;
    overflow: hidden;
  }

  body > div:first-of-type,
  div#__next,
  div#__next > div {
    height: 100%;
  }

  a {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
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
    src: url('/static/fonts/NotoSansKR-Regular.otf') format('opentype');
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

const GlobalStyles = () => {
  return <Global styles={styles} />;
};

export default GlobalStyles;