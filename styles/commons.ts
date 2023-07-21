import styled from '@emotion/styled';

interface SVGContainerProps {
  width: number;
  height: number;
}

const SVGContainer = styled.span<SVGContainerProps>`
  display: inline-block;
  width: ${(props) => `${props.width * 0.1}rem`};
  height: ${(props) => `${props.height * 0.1}rem`};
`;

export { SVGContainer };
