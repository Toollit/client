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

const AuthCodeInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 1.5rem;
`;

const Timer = styled.div`
  font-size: 1.4rem;
  position: absolute;
  right: 2rem;
  bottom: 0rem;
`;

const Notice = styled.div`
  font-size: 1.2rem;
  color: #000;
  text-align: center;
  padding: 2rem 1.5rem 0rem 1.5rem;
`;

const SubmitButtonContainer = styled.div`
  padding: 4rem 1.5rem 0rem 1.5rem;
`;

export {
  Form,
  TitleContainer,
  AuthCodeInputContainer,
  Notice,
  Timer,
  SubmitButtonContainer,
};
