import styled from '@emotion/styled';
import { mediaQueryTablet } from '@/styles/mediaQuery';

const Container = styled.div`
  display: flex;
  height: 6rem;
  align-items: center;
  padding: 0 1.6rem;
  position: relative;
`;

const Button = styled.div`
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

const Title = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem;
  font-weight: 500;
`;

export { Container, Button, Title };
