import styled from '@emotion/styled';

const Button = styled.div`
  font-size: ${(props) => props.theme.fontSizes.base};
  font-weight: 600;
  border-style: none;
  margin-bottom: 2rem;
  border-radius: 25rem;
  height: 4rem;
  background-color: ${(props) => props.theme.colors.button.disabled};
  cursor: not-allowed;
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

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export { Button, Text, ContentContainer };
