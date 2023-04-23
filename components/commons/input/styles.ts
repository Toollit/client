import styled from '@emotion/styled';

const StyledInput = styled.input`
  border: 1px solid ${(props) => props.theme.colors.border.base};
  width: 100%;
  height: 5rem;
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  padding: 0 1rem;
  font-size: 1.6rem;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  z-index: 10;

  &:focus {
    border-style: solid;
    border-color: ${(props) => props.theme.colors.theme};
    outline-style: none;
  }
`;

export { StyledInput };
