import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

const StyledSkeleton = styled(Skeleton)<SkeletonProps>`
  &.MuiSkeleton-root {
  }

  min-width: ${(props) =>
    typeof props.width === 'number' ? `${props.width}rem` : props.width};
  min-height: ${(props) =>
    typeof props.height === 'number' ? `${props.height}rem` : props.height};

  margin-top: ${(props) => `${props.marginTop}rem`};
  margin-right: ${(props) => `${props.marginRight}rem`};
  margin-bottom: ${(props) => `${props.marginBottom}rem`};
  margin-left: ${(props) => `${props.marginLeft}rem}`};
`;

export { StyledSkeleton };
