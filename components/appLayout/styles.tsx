import styled from '@emotion/styled';
import { NavProps } from '@/components/commons/nav';
import { css } from '@emotion/react';

const Container = styled.div`
  position: relative;
  height: 100%;
`;

interface ContentProps extends Pick<NavProps, 'type'> {}

const Content = styled.div<ContentProps>`
  position: relative;
  margin: 0 auto;
  max-width: 102.4rem;
  width: 100%;
  min-height: fit-content;

  ${(props) => {
    if (props.type !== 'none') {
      return css`
        height: calc(100% - ${props.theme.layout.navHeight});
      `;
    }

    if (props.type === 'none') {
      return css`
        height: 100%;
      `;
    }
  }};

  padding: constant(safe-area-inset-top) constant(safe-area-inset-right)
    constant(safe-area-inset-bottom) constant(safe-area-inset-left);
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
`;

export { Container, Content };
