import styled from '@emotion/styled';
import { mediaQueryTablet } from '@/styles/mediaQuery';

const Button = styled.div`
  display: flex;
  height: 5.3rem;
  align-items: center;
  padding: 0 1.6rem;
  position: relative;
`;

const IconContainer = styled.div`
  display: flex;
  padding: 0.5rem;
  cursor: pointer;

  ${mediaQueryTablet} {
    :hover {
      border-radius: 25rem;
      background-color: ${(props) => props.theme.colors.button.hoverGray};
    }
  }

  :active {
    border-radius: 25rem;
    background-color: ${(props) => props.theme.colors.button.activeGray};
  }
`;

export { Button, IconContainer };
