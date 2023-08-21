import styled from '@emotion/styled';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: ${(props) => `calc(100vh - ${props.theme.layout.navHeight})`};
  height: 100%;
  margin: 0 auto;
  max-width: 32rem;
  width: 100%;

  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
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

  :active {
    background-color: #3da571;
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
  bottom: 0rem;
`;

export { Form, InputContainer, NextBtn, NoticeForSpam, Timer };
