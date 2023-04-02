import styled from '@emotion/styled';

const Button = styled.div`
  background-color: ${(props) => props.theme.colors.disabled};
  margin-bottom: 2rem;
  border-radius: 25rem;
  max-width: 30rem;
  height: 4rem;
  font-weight: 600;
  letter-spacing: 0.025rem;
  border-style: none;
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
