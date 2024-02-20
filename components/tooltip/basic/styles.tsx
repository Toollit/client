import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';

const CustomMUIStyles = css`
  &.MuiTooltip-tooltip {
    min-width: 4rem;
    width: fit-content;
    min-height: 3rem;
    height: fit-content;
    font-size: 1.4rem !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CustomTooltipStyles = () => {
  return <Global styles={CustomMUIStyles} />;
};

export { CustomTooltipStyles };
