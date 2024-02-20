import styled from '@emotion/styled';
import { BlockProps } from '.';

const Container = styled.div<BlockProps>`
  padding-left: ${(props) =>
    typeof props.paddingLeft === 'number'
      ? `${props.paddingLeft}rem`
      : `${props.paddingLeft}`};
  padding-top: ${(props) =>
    typeof props.paddingTop === 'number'
      ? `${props.paddingTop}rem`
      : `${props.paddingTop}`};
  padding-right: ${(props) =>
    typeof props.paddingRight === 'number'
      ? `${props.paddingRight}rem`
      : `${props.paddingRight}`};
  padding-bottom: ${(props) =>
    typeof props.paddingBottom === 'number'
      ? `${props.paddingBottom}rem`
      : `${props.paddingBottom}`};

  margin-left: ${(props) =>
    typeof props.marginLeft === 'number'
      ? `${props.marginLeft}rem`
      : `${props.marginLeft}`};
  margin-top: ${(props) =>
    typeof props.marginTop === 'number'
      ? `${props.marginTop}rem`
      : `${props.marginTop}`};
  margin-right: ${(props) =>
    typeof props.marginRight === 'number'
      ? `${props.marginRight}rem`
      : `${props.marginRight}`};
  margin-bottom: ${(props) =>
    typeof props.marginBottom === 'number'
      ? `${props.marginBottom}rem`
      : `${props.marginBottom}`};
`;

export { Container };
