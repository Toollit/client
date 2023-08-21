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
  max-width: 102.4rem;
  width: 100%;
  margin: 0 auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const Button = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 5rem;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.colors.button.disabled
      : props.theme.colors.theme};
  border: none;
  border-radius: 25rem;
  color: #ffffff;
  font-size: 1.6rem;

  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

export { Container, Button };
