import styled from '@emotion/styled';
import { Theme, css } from '@emotion/react';

const commonStyles = (theme: Theme) => css`
  width: 4rem;
  height: 4rem;
  color: ${theme.colors.gray};
  border: 2px solid ${theme.colors.lightGray};
  border-radius: 50%;
  margin: 0.5rem 0;
  backdrop-filter: blur(4px);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const ArrowButton = styled.button`
  ${(props) => commonStyles(props.theme)}
`;

export { Container, ArrowButton };
