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
    margin-left: auto !important;
  }

  .toastui-editor-popup-add-heading {
    ${mediaQueryMobile} {
      width: auto !important;
      left: 30px !important;
      top: 39px !important;
    }
  }

  .toastui-editor-popup-color {
    ${mediaQueryMobile} {
      width: auto !important;
      right: initial !important;
      margin-left: initial !important;
      left: 156px !important;
      max-width: initial !important;
    }
  }

  .toastui-editor-popup-add-table {
    ${mediaQueryMobile} {
      width: auto !important;
      left: 651px !important;
      top: 39px !important;
    }
  }

  .toastui-editor-popup-add-image {
    width: 100% !important;
    right: 0 !important;
    left: 0 !important;
    max-width: 100% !important;

    .toastui-editor-popup-body {
      padding-left: 1rem !important;
      padding-right: 1rem !important;
    }

    ${mediaQueryMobile} {
      width: 100% !important;
      max-width: 39.8rem !important;
      /* left: 562px !important; */
      /* top: 39px !important; */
      left: auto !important;
      /* top: auto !important; */

      .toastui-editor-popup-body {
        padding-left: 2rem !important;
        padding-right: 2rem !important;
      }
    }
  }

  .toastui-editor-popup-add-link {
    width: 100% !important;
    right: 0 !important;
    left: 0 !important;
    max-width: 100% !important;

    ${mediaQueryMobile} {
      width: 100% !important;
      max-width: 39.8rem !important;
      /* left: 517px !important; */
      /* top: 39px !important; */
      left: auto !important;
      /* top: auto !important; */
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
        content: '• 10MB 미만 3개까지, JPG/JPEG/PNG 형식만 가능';
      }
    }

    div[aria-label='Insert image'] {
      div[aria-label='File'] {
        color: #555 !important;
        border-bottom: 2px solid #555 !important;
      }

      div[aria-label='URL'] {
        display: none !important;
      }
    }
  }
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

export { TuiCustomGlobalStyles, TitleInput };
