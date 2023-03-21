import styled from '@emotion/styled';

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
  min-width: 36.4rem;
  max-width: 36.4rem;
  padding: 0 3.2rem 4.8rem 3.2rem;
`;

const TitleContainer = styled.div`
  height: 7.2rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  padding-top: 2rem;
  padding-bottom: 2rem;
  width: 100%;
  font-size: ${(props) => props.theme.fontSizes.xxxlarge};
  line-height: 3.2rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ErrorMessage = styled.div`
  font-size: 1.4rem;
  color: #e5503c;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const EmailInput = styled.input`
  border: 1px solid rgb(207, 217, 222);
  height: 5rem;
  border-radius: 0.4rem;
  padding: 0 1rem;
  font-size: 1.6rem;
  margin-bottom: 2rem;
  z-index: 10;

  &:focus {
    border-style: solid;
    border-color: #4dd290;
    outline-style: none;
  }
`;

const NextLoginSessionBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 30rem;
  width: 100%;
  font-size: ${(props) => props.theme.fontSizes.base};
  font-weight: 400;
  background-color: #4dd290;
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 25rem;
  height: 4rem;
  font-weight: 600;
  letter-spacing: 0.025rem;
  border-style: none;

  &:active {
    background-color: #3da571;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }
`;

const SignInBtn = styled.div`
  color: #536471;
  font-size: 1.5rem;
`;

const SignInAccent = styled.span`
  color: #4dd290;
  font-weight: 500;
  cursor: pointer;
`;

export {
  Container,
  Form,
  TitleContainer,
  Title,
  InputContainer,
  EmailInput,
  NextLoginSessionBtn,
  SignInBtn,
  SignInAccent,
  ErrorMessage,
};
