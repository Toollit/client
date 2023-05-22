import React from 'react';
import { StyledSkeleton } from './styles';

interface SkeletonProps {
  width?: number;
  height?: number;
  shape?: 'circular' | 'rectangular' | 'rounded' | 'text';
  animation?: 'pulse' | 'wave';
}

const Skeleton = ({
  width,
  height = 20,
  shape = 'rounded',
  animation = 'wave',
}: SkeletonProps) => {
  return (
    <StyledSkeleton
      animation={animation}
      variant={shape}
      width={width}
      height={height}
    />
  );
};

export default Skeleton;
