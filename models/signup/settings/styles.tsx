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

const NicknameInputContainer = styled.div`
  padding: 0 1.5rem;
`;

const NoticeContainer = styled.div`
  font-size: 1.3rem;
  color: #000;
  padding: 1rem 1.5rem 2rem 1.5rem;

  p:nth-last-of-type(1) {
    padding-top: 1rem;
  }
`;

const SubmitButtonContainer = styled.div`
  padding: 0 1.5rem;
`;

export {
  Form,
  TitleContainer,
  NicknameInputContainer,
  NoticeContainer,
  SubmitButtonContainer,
};
