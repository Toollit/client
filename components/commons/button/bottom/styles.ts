import styled from '@emotion/styled';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 9rem;
  /* background: #fffffff5; */
  background: transparent;
`;

const Button = styled.button<{ disabled: boolean }>`
  width: calc(100vw - 4rem);
  height: 5rem;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.colors.button.disabled
      : props.theme.colors.theme};
  margin: 0 auto;
  border: none;
  border-radius: 25rem;
  color: #ffffff;
  font-size: 1.6rem;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

export { Container, Button };
