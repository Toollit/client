import styled from '@emotion/styled';
import { NavProps } from '@/components/appLayout/nav';

const Container = styled.div`
  position: relative;
  min-height: 100%; // For Footer
  display: flex;
  flex-direction: column;

  padding: calc(
      ${(props) => props.theme.layout.navHeight} + constant(safe-area-inset-top)
    )
    constant(safe-area-inset-right) constant(safe-area-inset-bottom)
    constant(safe-area-inset-left);

  padding: calc(
      ${(props) => props.theme.layout.navHeight} + env(safe-area-inset-top)
    )
    env(safe-area-inset-right) env(safe-area-inset-bottom)
    env(safe-area-inset-left);
`;

interface ContentProps extends Pick<NavProps, 'type'> {}

const Content = styled.div<ContentProps>`
  position: relative;
  flex: 1 1 auto; // For full size content
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export { Container, Content };
