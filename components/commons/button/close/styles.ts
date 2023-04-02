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
          background-color: rgba(15, 20, 25, 0.1);
        }
      `;
    }

    if (!props.isMobile) {
      return css`
        &:hover {
          border-radius: 25rem;
          background-color: rgba(15, 20, 25, 0.1);
        }

        &:active {
          border-radius: 25rem;
          background-color: rgba(15, 20, 25, 0.2);
        }
      `;
    }
  }}
  cursor: pointer;
`;

export { Button, IconContainer };
