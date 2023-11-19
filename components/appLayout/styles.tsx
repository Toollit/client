import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { NavProps } from '@/components/appLayout/nav';

interface Container extends Pick<NavProps, 'type'> {}

const Container = styled.div<Container>`
  position: relative;
  min-height: 100%; // For Footer
  display: flex;
  flex-direction: column;

  ${(props) => {
    if (props.type === 'none') {
      return css`
        padding: constant(safe-area-inset-top) constant(safe-area-inset-right)
          constant(safe-area-inset-bottom) constant(safe-area-inset-left);

        padding: env(safe-area-inset-top) env(safe-area-inset-right)
          env(safe-area-inset-bottom) env(safe-area-inset-left);
      `;
    } else {
      return css`
        padding: calc(
            ${props.theme.layout.navHeight} + constant(safe-area-inset-top)
          )
          constant(safe-area-inset-right) constant(safe-area-inset-bottom)
          constant(safe-area-inset-left);

        padding: calc(
            ${props.theme.layout.navHeight} + env(safe-area-inset-top)
          )
          env(safe-area-inset-right) env(safe-area-inset-bottom)
          env(safe-area-inset-left);
      `;
    }
  }}/* padding: calc(
      ${(props) => props.theme.layout.navHeight} + constant(safe-area-inset-top)
    )
    constant(safe-area-inset-right) constant(safe-area-inset-bottom)
    constant(safe-area-inset-left);

  padding: calc(
      ${(props) => props.theme.layout.navHeight} + env(safe-area-inset-top)
    )
    env(safe-area-inset-right) env(safe-area-inset-bottom)
    env(safe-area-inset-left); */
`;

const Content = styled.div`
  position: relative;
  flex: 1 1 auto; // For full size content
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export { Container, Content };
