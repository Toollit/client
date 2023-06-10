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

  ${mediaQueryLaptop} {
    :hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;

const PageNumberButton = styled.button<{ selected: boolean }>`
  width: 4rem;
  height: 4rem;
  border: 1px solid ${(props) => props.theme.colors.gray};
  margin: 0rem 0.1rem;
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  background-color: ${(props) =>
    props.selected ? 'rgba(0, 0, 0, 0.08)' : '#fff'};
  font-size: 1.4rem;
  color: #000;
`;

export { Container, PageControlButton, PageNumberButton };
