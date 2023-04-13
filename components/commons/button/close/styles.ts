import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Button = styled.div`
  display: flex;
  height: 5.3rem;
  align-items: center;
  padding: 0 1.6rem;
  position: relative;
`;

const IconContainer = styled.div<{ isMobile: null | boolean }>`
  display: flex;
  padding: 0.5rem;

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
  cursor: pointer;
`;

export { Button, IconContainer };
