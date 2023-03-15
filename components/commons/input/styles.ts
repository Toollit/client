import styled from '@emotion/styled';

const StyledInput = styled.input`
  border: 1px solid #cfd9de;
  height: 5rem;
  border-radius: 0.4rem;
  padding: 0 1rem;
  font-size: 1.6rem;
  margin-bottom: 2rem;
  z-index: 10;

  &:focus {
    border-style: solid;
    border-color: #4dd290;
    outline-style: none;
  }
`;

export { StyledInput };
