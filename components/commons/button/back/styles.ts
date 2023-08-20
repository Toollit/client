import styled from '@emotion/styled';
import { mediaQueryTablet } from '@/styles/mediaQuery';

const Button = styled.div`
  display: flex;
  padding: 0.5rem;
  cursor: pointer;

  :active {
    border-radius: 25rem;
    background-color: ${(props) => props.theme.colors.button.activeGray};
  }

  ${mediaQueryTablet} {
    :hover {
      border-radius: 25rem;
      background-color: ${(props) => props.theme.colors.button.hoverGray};
    }
  }
`;

export { Button };
