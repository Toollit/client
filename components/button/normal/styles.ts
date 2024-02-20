import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface CommonStylesProps {
  shape?: 'round' | 'square';
  width?: number;
  height?: number;
}

const commonStyles = (props: CommonStylesProps) => css`
  width: ${props.width ? `${props.width}rem` : '100%'};
  height: ${props.height ? `${props.height}rem` : '4rem'};
  border-radius: ${props.shape === 'round' ? '25rem' : '0.3rem'};
`;

const NormalButton = styled.button<{
  isMobile: boolean;
  shape?: 'round' | 'square';
  width?: number;
  height?: number;
}>`
  ${commonStyles}
  background-color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.base};
  font-weight: 400;
  border: 1px solid ${(props) => props.theme.colors.border.base};

  ${(props) => {
    if (props.isMobile) {
      return css`
        &:active {
          background-color: ${props.theme.colors.button.lightGreen};
        }
      `;
    }

    if (!props.isMobile) {
      return css`
        &:hover {
          background-color: ${props.theme.colors.button.lightGreen};
        }

        &:active {
          background-color: ${props.theme.colors.button.lightGreen};
        }
      `;
    }
  }}
`;

const SubmitButton = styled.button<{
  isMobile: boolean;
  shape?: 'round' | 'square';
  width?: number;
  height?: number;
}>`
  ${commonStyles}
  background-color: ${(props) => props.theme.colors.theme};
  font-size: ${(props) => props.theme.fontSizes.base};
  font-weight: 600;
  border: none;

  &:active {
    background-color: ${(props) => props.theme.colors.button.darkGreen};
  }
`;

const DisabledButton = styled.button<{
  isMobile: boolean;
  shape?: 'round' | 'square';
  width?: number;
  height?: number;
}>`
  ${commonStyles}
  background-color: ${(props) => props.theme.colors.theme};
  font-size: ${(props) => props.theme.fontSizes.base};
  font-weight: 600;
  border: none;

  background-color: ${(props) => props.theme.colors.button.disabled};
  cursor: not-allowed;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Text = styled.span<{ color?: 'black' | 'gray' | 'white' }>`
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

export { NormalButton, SubmitButton, DisabledButton, Text, ContentContainer };
