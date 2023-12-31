import styled from '@emotion/styled';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { css, Global } from '@emotion/react';

interface CustomMuiTabsProps {
  width: number;
}

const CustomMuiTabs = styled(Tabs)<CustomMuiTabsProps>`
  &.MuiTabs-root {
    // The safe-area-inset value is required because of the problem of horizontal scrolling when using mobile in landscape mode.
    // calc(100% - 3rem) is works the same way
    width: calc(
      100vw - 3rem - env(safe-area-inset-right) - env(safe-area-inset-left)
    );
    margin: 0 auto;
  }

  & .MuiTabs-indicator {
    background-color: #303038;
    width: ${(props) => `${props.width * 0.1 - 3.2}rem`} !important;
    margin-left: 1.6rem;
    margin-right: 1.6rem;
  }
`;

const CustomMuiTab = styled(Tab)`
  &.MuiTab-root {
    font-size: 1.4rem;
    color: gray;
    min-width: fit-content !important;
    font-weight: 700;
  }

  &.Mui-selected {
    color: #303038;
  }
`;

const swipeableViewStyles = css`
  // Scrollbar is created for each view. Swipe the screen and the scrollbar is displayed for each view block. To make this invisible, I created a scrollbar width of zero.
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const SwipeableViewsCustomStyles = () => {
  return <Global styles={swipeableViewStyles} />;
};

export { CustomMuiTabs, CustomMuiTab, SwipeableViewsCustomStyles };
