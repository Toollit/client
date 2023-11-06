import styled from '@emotion/styled';
import { css } from '@emotion/react';

export interface MarginPaddingProps {
  marginTop?: `${number}rem`;
  marginRight?: `${number}rem`;
  marginBottom?: `${number}rem`;
  marginLeft?: `${number}rem`;
  paddingTop?: `${number}rem`;
  paddingRight?: `${number}rem`;
  paddingBottom?: `${number}rem`;
  paddingLeft?: `${number}rem`;
}

const commonMarginPaddingStyles = (props: MarginPaddingProps) => css`
  margin-top: ${props.marginTop ? props.marginTop : 0};
  margin-right: ${props.marginRight ? props.marginRight : 0};
  margin-bottom: ${props.marginBottom ? props.marginBottom : 0};
  margin-left: ${props.marginLeft ? props.marginLeft : 0};
  padding-top: ${props.paddingTop ? props.paddingTop : 0};
  padding-right: ${props.paddingRight ? props.paddingRight : 0};
  padding-bottom: ${props.paddingBottom ? props.paddingBottom : 0};
  padding-left: ${props.paddingLeft ? props.paddingLeft : 0};
`;

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

const BoxContainer = styled.div<MarginPaddingProps>`
  border: 1px solid ${(props) => props.theme.colors.border.base};
  border-radius: ${(props) => props.theme.borderRadius.base};
  border-top: none;
  box-shadow: ${(props) => props.theme.boxShadow.base};
  ${commonMarginPaddingStyles}
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
