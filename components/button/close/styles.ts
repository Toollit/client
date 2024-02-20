import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Button = styled.button<{ isMobile: boolean }>`
  display: flex;
  padding: 0.5rem;
  cursor: pointer;
  border-style: none;
  background-color: transparent;

  ${(props) => {
    if (props.isMobile) {
      return css`
        &:active {
          border-radius: 25rem;
          background-color: ${props.theme.colors.button.activeGray};
        }
      `;
    }

    if (!props.isMobile) {
      return css`
        &:hover {
          border-radius: 25rem;
          background-color: ${props.theme.colors.button.hoverGray};
        }

        &:active {
          border-radius: 25rem;
          background-color: ${props.theme.colors.button.activeGray};
        }
      `;
    }
  }}
`;

export { Button };
