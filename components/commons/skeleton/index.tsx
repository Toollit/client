import React from 'react';
import { StyledSkeleton } from './styles';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  shape?: 'circular' | 'rectangular' | 'rounded' | 'text';
  animation?: 'pulse' | 'wave';
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

/**
 * @prop width - Skeleton width. default width is 100%;
 * @prop height - Skeleton height. default height is 2rem(20px);
 * @prop shape - Skeleton shape
 * @prop animation - Skeleton animation
 * @prop marginTop - Skeleton margin top
 * @prop marginRight - Skeleton margin right
 * @prop marginBottom - Skeleton margin bottom
 * @prop marginLeft - Skeleton margin left
 */
const Skeleton = ({
  width,
  height = 2,
  shape = 'rounded',
  animation = 'wave',
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
}: SkeletonProps) => {
  return (
    <StyledSkeleton
      animation={animation}
      variant={shape}
      width={width}
      height={height}
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
    />
  );
};

export default Skeleton;
