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
    /* tap-highlight-color, touch-callout 속성은 모바일 환경에서만 적용됨 */
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }

  body > div:first-of-type,
  div#__next,
  div#__next > div {
    height: 100%;
  }

  a {
    cursor: pointer;

    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  input {
    border-radius: 0;
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
