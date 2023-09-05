import styled from '@emotion/styled';

interface SVGContainerProps {
  width: number;
  height: number;
}

const SVGContainer = styled.span<SVGContainerProps>`
  display: inline-block;
  width: ${(props) => `${props.width}rem`};
  height: ${(props) => `${props.height}rem`};
`;

export { SVGContainer };
