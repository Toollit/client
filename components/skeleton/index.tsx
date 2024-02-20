import React from 'react';
import { StyledSkeleton } from './styles';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  shape?: 'circular' | 'rectangular' | 'rounded' | 'text';
  animation?: 'pulse' | 'wave';
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

/**
 * @prop width - Skeleton width. default width is 100%;
 * @prop height - Skeleton height. default height is 2rem(20px);
 * @prop shape - Skeleton shape
 * @prop animation - Skeleton animation
 * @prop top - Skeleton margin top
 * @prop right - Skeleton margin right
 * @prop bottom - Skeleton margin bottom
 * @prop left - Skeleton margin left
 */
const Skeleton = ({
  width,
  height = 2,
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
