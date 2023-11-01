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

const InnerContainer = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 102.4rem;
  width: 100%;
`;

const BoxContainer = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border.base};
  border-radius: ${(props) => props.theme.borderRadius.base};
  border-top: none;
  box-shadow: ${(props) => props.theme.boxShadow.base};
  margin-top: 3rem;
`;

const BoxTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: ${(props) => props.theme.borderRadius.base}
    ${(props) => props.theme.borderRadius.base} 0 0;
  color: #fff;
  background-image: linear-gradient(
    98deg,
    ${(props) => props.theme.colors.theme},
    #49c6dd
  );
`;

export { SVGContainer, ImageWrapper, InnerContainer, BoxContainer, BoxTitle };
