import styled from '@emotion/styled';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled as muiStyled } from '@mui/material/styles';

const CustomMuiTabs = muiStyled(Tabs)(({ theme }) => ({
  '&.MuiTabs-root': {
    width: 'calc(100vw - 4rem)',
    margin: '0 auto',
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#303038',
    width: '4.8rem !important',
    marginLeft: '2.1rem',
  },

  [theme.breakpoints.up('laptop')]: {
    display: 'none',
  },
})) as typeof Tabs;

const CustomMuiTab = muiStyled(Tab)(({ theme }) => ({
  '&.MuiTab-root': {
    fontSize: '1.4rem',
    color: 'gray',
  },

  '&.Mui-selected': {
    color: '#303038',
  },
})) as typeof Tab;

export { CustomMuiTabs, CustomMuiTab };
