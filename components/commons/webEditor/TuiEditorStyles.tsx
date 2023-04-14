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
    width: 100% !important;
    right: 0 !important;
    margin-left: auto !important;
    left: 0 !important;
    max-width: 100% !important;

    ${mediaQueryMobile} {
      width: 100% !important;
      left: auto !important;
      max-width: 39.8rem !important;
    }
  }

  .toastui-editor-popup-body {
    .toastui-editor-file-select-button {
      ::after {
        display: inline-block;
        margin-top: 0.2rem;
        font-size: 1.1rem;
        white-space: pre;
        position: absolute;
        left: 0;
        top: 5.2rem;
        content: '• 10MB 미만 3개까지, JPG/JPEG/PNG 형식만 등록 할 수 있습니다.';
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
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  border: 1px solid ${(props) => props.theme.colors.border.base};

  :focus {
    outline: none;
  }
`;

const TuiCustomGlobalStyles = () => {
  return <Global styles={TuiCustomStyles} />;
};

export { TuiCustomGlobalStyles, TuiContainer, TitleInputContainer, TitleInput };
