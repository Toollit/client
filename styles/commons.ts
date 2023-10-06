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

interface ImageWrapperProps {
  width: number;
  height: number;
}

const ImageWrapper = styled.div<ImageWrapperProps>`
  position: relative;
  min-width: ${(props) => `${props.width}rem`};
  min-height: ${(props) => `${props.height}rem`};
  width: ${(props) => `${props.width}rem`};
  height: ${(props) => `${props.height}rem`};
`;

const CenterLayoutContainer = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 102.4rem;
  width: 100%;
`;

export { SVGContainer, ImageWrapper, CenterLayoutContainer };
