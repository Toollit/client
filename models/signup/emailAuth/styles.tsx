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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const NoticeForSpam = styled.div`
  font-size: 1.2rem;
  color: #000;
  text-align: center;
`;

const Timer = styled.div`
  font-size: 1.4rem;
  position: absolute;
  right: 0;
  bottom: 0rem;
`;

export { Form, InputContainer, NoticeForSpam, Timer };
