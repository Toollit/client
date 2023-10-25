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

const PasswordSettingsContainer = styled.div`
  padding: 0 1.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const Notice = styled.div`
  font-size: 1.2rem;
  padding: 2rem 1.5rem;

  span {
    color: #26a063;
  }
`;

const SubmitButtonContainer = styled.div`
  padding: 1rem 1.5rem 1rem 1.5rem;
  div {
    padding: 0.5rem 0;
  }
`;

export {
  Form,
  TitleContainer,
  PasswordSettingsContainer,
  InputContainer,
  Notice,
  SubmitButtonContainer,
};
