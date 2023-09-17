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
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const Notice = styled.div`
  font-size: 1.2rem;
  margin: 2rem 0;

  span {
    color: #26a063;
  }
`;

export { Form, InputContainer, Notice };
