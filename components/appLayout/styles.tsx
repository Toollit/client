import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { NavProps } from '@/components/appLayout/nav';

interface Container extends Pick<NavProps, 'type'> {}

const Container = styled.div<Container>`
  position: relative;
  min-height: 100%; // For Footer
  display: flex;
  flex-direction: column;

  /* ${(props) => {
    if (props.type === 'none') {
      return css`
        padding: env(safe-area-inset-top) env(safe-area-inset-right)
          env(safe-area-inset-bottom) env(safe-area-inset-left);
      `;
    } else {
      return css`
        padding: calc(
            ${props.theme.layout.navHeight} + env(safe-area-inset-top)
          )
          env(safe-area-inset-right) env(safe-area-inset-bottom)
          env(safe-area-inset-left);
      `;
    }
  }} */

  ${(props) => {
    if (props.type === 'none') {
      return css`
        padding-top: env(safe-area-inset-top);
        padding-right: env(safe-area-inset-right);
        padding-bottom: 0;
        padding-left: env(safe-area-inset-left);
      `;
    } else {
      return css`
        padding-top: calc(
          ${props.theme.layout.navHeight} + env(safe-area-inset-top)
        );
        padding-right: env(safe-area-inset-right);
        padding-bottom: 0
        padding-left: env(safe-area-inset-left);
      `;
    }
  }}
`;

const Content = styled.div<{ hasFooter?: boolean }>`
  position: relative;
  flex: 1 1 auto; // For full size content
  display: flex;
  flex-direction: column;
  height: 100%;

  ${(props) => {
    const hasFooter = props.hasFooter;

    if (hasFooter) {
      return css`
        padding-bottom: 0;
      `;
    }

    if (!hasFooter) {
      return css`
        padding-bottom: env(safe-area-inset-bottom);
      `;
    }
  }}
`;

export { Container, Content };
