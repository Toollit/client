import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { mediaQueryMobile } from '@/styles/mediaQuery';

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

const TitleInputContainer = styled.div`
  width: 100%;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 4rem;
  font-size: 1.4rem;
  padding: 0 1rem;
  border-radius: 3px;
  border: 1px solid #dadde6;

  :focus {
    outline: none;
  }
`;

const TuiCustomGlobalStyles = () => {
  return <Global styles={TuiCustomStyles} />;
};

export { TuiCustomGlobalStyles, TuiContainer, TitleInputContainer, TitleInput };
