import React from 'react';
import { Wrapper } from './styles';

interface ImageWrapperProps {
  children: React.ReactNode;
  width: number;
  height: number;
}

const ImageWrapper = ({ children, width, height }: ImageWrapperProps) => {
  return (
    <Wrapper width={width} height={height}>
      {children}
    </Wrapper>
  );
};

export default ImageWrapper;
