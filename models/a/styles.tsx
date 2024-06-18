import styled from '@emotion/styled';

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

const EmailPasswordInputContainer = styled.div`
  padding: 0 1.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SubmitButtonContainer = styled.div`
  padding: 1rem 1.5rem 2rem 1.5rem;
`;

const Notice = styled.div`
  font-size: 1.2rem;
  padding: 1rem 1.5rem 3.5rem 1.5rem;

  a {
    text-decoration: none;
    color: #26a063;
  }
`;

export {
  Form,
  TitleContainer,
  EmailPasswordInputContainer,
  InputContainer,
  SubmitButtonContainer,
  Notice,
};
