import { mediaQueryMobile } from '@/styles/mediaQuery';
import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
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

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
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

export { Container, Form, InputContainer, SignInBtn, SignInAccent };
