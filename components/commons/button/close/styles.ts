import styled from '@emotion/styled';
import { mediaQueryLaptop } from '@/styles/mediaQuery';

const Button = styled.div`
  display: flex;
  padding: 0.5rem;
  cursor: pointer;

  :active {
    border-radius: 25rem;
    background-color: ${(props) => props.theme.colors.button.activeGray};
  }

  ${mediaQueryLaptop} {
    :hover {
      border-radius: 25rem;
      background-color: ${(props) => props.theme.colors.button.hoverGray};
    }
  }
`;

export { Button };
