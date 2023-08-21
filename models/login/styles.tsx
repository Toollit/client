import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: ${(props) => `calc(100vh - ${props.theme.layout.navHeight})`};
  height: 100%;
  margin: 0 auto;
  max-width: 32rem;
  width: 100%;

  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

const InputContainer = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  height: 8.5rem;
  position: relative;

  ${(props) =>
    props.show &&
    css`
      height: 14rem;
    `}
`;

const PasswordInput = styled.input`
  border: 1px solid ${(props) => props.theme.colors.border.base};
  height: 5rem;
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  padding: 0 1rem;
  font-size: 1.6rem;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;

  position: absolute;
  width: 100%;
  z-index: 9;

  &:focus {
    border-style: solid;
    border-color: ${(props) => props.theme.colors.theme};
    outline-style: none;
  }

  animation-name: passwordInput;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  @keyframes passwordInput {
    0% {
      top: 0;
    }
    100% {
      top: 7rem;
    }
  }
`;

const SignInInduce = styled.span`
  color: ${(props) => props.theme.colors.text.gray};
  font-size: 1.5rem;
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.colors.theme};
  margin-left: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
`;

export { Form, InputContainer, PasswordInput, SignInInduce, StyledLink };
