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

const NextBtn = styled.button`
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
  cursor: 'pointer';

  &:active {
    background-color: #3da571;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }
`;

const NoticeForSpam = styled.div`
  font-size: 1.2rem;
  color: #000;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

const Timer = styled.div`
  font-size: 1.4rem;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export {
  Container,
  Form,
  InputContainer,
  ErrorMessage,
  NextBtn,
  NoticeForSpam,
  Timer,
};
