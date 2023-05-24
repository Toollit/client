import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Skeleton from '@mui/material/Skeleton';

interface SkeletonProps {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

const StyledSkeleton = styled(Skeleton)<SkeletonProps>`
  &.MuiSkeleton-root {
  }
  margin-top: ${(props) => `${props.top}rem`};
  margin-right: ${(props) => `${props.right}rem`};
  margin-bottom: ${(props) => `${props.bottom}rem`};
  margin-left: ${(props) => `${props.left}rem}`};
`;

export { StyledSkeleton };
