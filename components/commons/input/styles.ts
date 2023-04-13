import styled from '@emotion/styled';

const StyledInput = styled.input`
  border: 1px solid #cfd9de;
  height: 5rem;
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  padding: 0 1rem;
  font-size: 1.6rem;
  margin-bottom: 2rem;
  z-index: 10;

  /* TODO focus 속성 공통 속성으로 놔둘지 말지 수정하기 */
  &:focus {
    border-style: solid;
    border-color: ${(props) => props.theme.colors.theme};
    outline-style: none;
  }
`;

export { StyledInput };
