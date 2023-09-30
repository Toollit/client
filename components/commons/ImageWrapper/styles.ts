import styled from '@emotion/styled';

interface WidthHeight {
  width: number;
  height: number;
}

const Wrapper = styled.div<WidthHeight>`
  position: relative;
  min-width: ${(props) => `${props.width}rem`};
  min-height: ${(props) => `${props.height}rem`};
  width: ${(props) => `${props.width}rem`};
  height: ${(props) => `${props.height}rem`};
`;

export { Wrapper };
