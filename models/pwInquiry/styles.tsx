import { mediaQueryMobile } from '@/styles/mediaQuery';
import styled from '@emotion/styled';

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

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
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

export { Form, InputContainer, SignInInduce, StyledLink };
