import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Link from 'next/link';

const Form = styled.form`
  flex: 1 1 auto; // For content height 100%
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 34rem;
  width: 100%;
  margin: 0 auto;

  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

const TitleContainer = styled.div`
  padding: 0 1.5rem;
`;

const SocialLoginButtonContainer = styled.div`
  padding: 0.5rem 1.5rem;

  button {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const DividerContainer = styled.div`
  padding: 0 1.5rem;
`;

const IdPasswordInputContainer = styled.div`
  padding: 0.5rem 1.5rem;
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

const SubmitButtonContainer = styled.div`
  padding: 1rem 1.5rem 0.5rem 1.5rem;
`;

const SearchPasswordButtonContainer = styled.div`
  padding: 0.5rem 1.5rem 1rem 1.5rem;
`;

const SignInContainer = styled.div`
  padding: 1.5rem 1.5rem 3.5rem 1.5rem;
`;

const SignInInduce = styled.span`
  color: ${(props) => props.theme.colors.text.gray};
  font-size: 1.5rem;
`;

const SignUpLink = styled(Link)`
  color: ${(props) => props.theme.colors.theme};
  margin-left: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
`;

export {
  Form,
  TitleContainer,
  SocialLoginButtonContainer,
  DividerContainer,
  IdPasswordInputContainer,
  InputContainer,
  PasswordInputContainer,
  SubmitButtonContainer,
  SearchPasswordButtonContainer,
  SignInContainer,
  SignInInduce,
  SignUpLink,
};
