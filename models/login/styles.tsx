import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { mediaQueryMobile } from '@/styles/mediaQuery';

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto auto;
  width: calc(100vw - 6rem);

  ${mediaQueryMobile} {
    min-width: 36.4rem;
    max-width: 36.4rem;
    padding: 0 3.2rem 4.8rem 3.2rem;
  }
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

const SignInBtn = styled.div`
  color: ${(props) => props.theme.colors.text.gray};
  font-size: 1.5rem;
`;

const SignInAccent = styled.span`
  color: ${(props) => props.theme.colors.theme};
  font-weight: 500;
  cursor: pointer;
`;

export {
  Container,
  Form,
  InputContainer,
  PasswordInput,
  SignInBtn,
  SignInAccent,
};
