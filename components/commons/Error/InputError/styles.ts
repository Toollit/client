import styled from '@emotion/styled';

const ErrorMessage = styled.div`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.error};
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(0.8rem);
`;

export { ErrorMessage };
