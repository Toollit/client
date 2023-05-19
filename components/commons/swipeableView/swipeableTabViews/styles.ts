import styled from '@emotion/styled';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface CustomMuiTabsProps {
  width: number;
}

const CustomMuiTabs = styled(Tabs)<CustomMuiTabsProps>`
  &.MuiTabs-root {
    width: calc(100vw - 4rem);
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

export { CustomMuiTabs, CustomMuiTab };
