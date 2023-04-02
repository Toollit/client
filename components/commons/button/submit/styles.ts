import styled from '@emotion/styled';

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.theme};
  margin-bottom: 2rem;
  border-radius: 25rem;
  height: 4rem;
  font-weight: 600;
  letter-spacing: 0.025rem;
  border-style: none;

  &:active {
    background-color: ${(props) => props.theme.colors.activeGreen};
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }
`;

const Text = styled.div<{ color?: 'black' | 'gray' | 'white' }>`
  font-size: 1.5rem;
  letter-spacing: 0.025rem;

  color: ${(props) => {
    const color = props.color;
    switch (color) {
      case 'black':
        return props.theme.colors.black;

      case 'gray':
        return props.theme.colors.gray;

      case 'white':
        return props.theme.colors.white;

      default:
        return props.theme.colors.black;
    }
  }};
`;

export { Button, Text };
