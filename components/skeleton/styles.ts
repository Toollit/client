import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

const StyledSkeleton = styled(Skeleton)<SkeletonProps>`
  &.MuiSkeleton-root {
  }

  min-width: ${(props) =>
    typeof props.width === 'number' ? `${props.width}rem` : props.width};
  min-height: ${(props) =>
    typeof props.height === 'number' ? `${props.height}rem` : props.height};

  margin-top: ${(props) => `${props.top}rem`};
  margin-right: ${(props) => `${props.right}rem`};
  margin-bottom: ${(props) => `${props.bottom}rem`};
  margin-left: ${(props) => `${props.left}rem}`};
`;

export { StyledSkeleton };
