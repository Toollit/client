import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 34rem;
  width: 100%;
  min-height: 100%;
  height: fit-content;
  margin: 0 auto;

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

const PasswordInputContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 9;

  animation-name: passwordInput;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  @keyframes passwordInput {
    0% {
      top: 0;
    }
    100% {
      top: 6rem;
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

export {
  Form,
  InputContainer,
  PasswordInputContainer,
  SignInInduce,
  StyledLink,
};
