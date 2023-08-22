import styled from '@emotion/styled';
import { BlockProps } from './';

const Container = styled.div<BlockProps>`
  padding-left: ${(props) => `${props.paddingLeft}rem`};
  padding-top: ${(props) => `${props.paddingTop}rem`};
  padding-right: ${(props) => `${props.paddingRight}rem`};
  padding-bottom: ${(props) => `${props.paddingBottom}rem`};
`;

export { Container };
