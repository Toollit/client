import React from 'react';
import { StyledSkeleton } from './styles';

interface SkeletonProps {
  width?: number;
  height?: number;
  shape?: 'circular' | 'rectangular' | 'rounded' | 'text';
  animation?: 'pulse' | 'wave';
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

const Skeleton = ({
  width,
  height = 20,
  shape = 'rounded',
  animation = 'wave',
  top,
  right,
  bottom,
  left,
}: SkeletonProps) => {
  return (
    <StyledSkeleton
      animation={animation}
      variant={shape}
      width={width}
      height={height}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
    />
  );
};

export default Skeleton;
