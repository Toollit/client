import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';

const mediaQueryMobile = `@media (max-width: 480px)`;

const TuiCustomStyles = css`
  .Tui-editor-root {
    width: 100%;
  }

  .toastui-editor-dropdown-toolbar {
    display: flex;
    flex-flow: wrap;
    height: fit-content !important;
  }

  .ProseMirror {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }

  .toastui-editor-popup {
    ${mediaQueryMobile} {
      width: 100% !important;
      right: 0 !important;
      margin-left: auto !important;
    }
  }

  .toastui-editor-popup-body {
    div {
      div {
        :nth-of-type(3) {
          ::after {
            display: block;
            margin-top: 0.2rem;
            font-size: 1.1rem;
            content: '* 10mb 이하 총합 최대 30mb 까지 업로드 가능합니다.';
          }
        }
      }
    }
  }
`;

const TuiContainer = styled.div`
  width: 100%;
`;

const TuiCustomGlobalStyles = () => {
  return <Global styles={TuiCustomStyles} />;
};

export { TuiCustomGlobalStyles, TuiContainer };
