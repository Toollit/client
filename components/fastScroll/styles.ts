import styled from '@emotion/styled';
import { Theme, css } from '@emotion/react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const commonStyles = (theme: Theme) => css`
  font-size: 4rem;
  color: ${theme.colors.gray};
  border: 2px solid ${theme.colors.lightGray};
  border-radius: 50%;
  margin: 0.5rem 0;
  backdrop-filter: blur(4px);
  cursor: pointer;
`;

const Container = styled.div`
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const TopArrow = styled(ExpandLess)`
  ${(props) => commonStyles(props.theme)}
`;

const DownArrow = styled(ExpandMore)`
  ${(props) => commonStyles(props.theme)}
`;

export { Container, TopArrow, DownArrow };
