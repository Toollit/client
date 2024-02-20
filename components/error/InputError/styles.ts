import styled from '@emotion/styled';

const ErrorMessage = styled.div`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.error};
  position: absolute;
  bottom: 0.2rem;
  left: 0;
`;

export { ErrorMessage };
