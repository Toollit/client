import styled from '@emotion/styled';
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

const EmailInputContainer = styled.div`
  padding: 0 1.5rem;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const SubmitButtonContainer = styled.div`
  padding: 1.5rem;
`;

const SignInInduceContainer = styled.div`
  padding: 1.5rem 1.5rem 3.5rem 1.5rem;
`;

const SignInInduce = styled.span`
  color: ${(props) => props.theme.colors.text.gray};
  font-size: 1.5rem;
`;

const SignupLink = styled(Link)`
  color: ${(props) => props.theme.colors.theme};
  margin-left: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
`;

export {
  Form,
  TitleContainer,
  EmailInputContainer,
  InputContainer,
  SubmitButtonContainer,
  SignInInduceContainer,
  SignInInduce,
  SignupLink,
};
