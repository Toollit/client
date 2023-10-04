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

const Notice = styled.div`
  font-size: 1.3rem;
  color: #000;
`;

export { Form, Notice };
