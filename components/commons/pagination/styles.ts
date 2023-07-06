import { mediaQueryLaptop } from '@/styles/mediaQuery';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: center;

  padding: 4rem 0rem 8rem;
`;

const PageControlButton = styled.button`
  width: 4rem;
  height: 4rem;
  border: none;
  margin: 0rem 0.1rem;
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const PageNumberButton = styled.button<{ selected: boolean }>`
  border: none;
  height: 100%;
  padding: 0 2rem;
  background-color: #fff;
  font-size: 1.8rem;
  color: ${(props) => (props.selected ? '#000' : '#d4d4d4')};

  ${mediaQueryLaptop} {
    font-size: 2rem;
  }
`;

export { Container, PageControlButton, PageNumberButton };
