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
`;

const TuiFormContainer = styled.form`
  width: 100%;
`;

const TitleInputContainer = styled.div``;

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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 1rem;
`;

const Button = styled.button`
  height: 4rem;
  text-align: center;
  border-radius: 25rem;
  border-style: none;
  background-color: #4dd290;
  color: #fff;
  font-weight: 600;
  font-size: 1.3rem;
  padding: 1rem 2rem;
`;

const TuiCustomGlobalStyles = () => {
  return <Global styles={TuiCustomStyles} />;
};

export {
  TuiCustomGlobalStyles,
  TuiFormContainer,
  TitleInputContainer,
  TitleInput,
  ButtonContainer,
  Button,
};
