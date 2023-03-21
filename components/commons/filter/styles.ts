import styled from '@emotion/styled';
import TuneIcon from '@mui/icons-material/Tune';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const FilterIcon = styled(TuneIcon)`
  width: 2.5rem;
  height: 2.5rem;
  color: #000;
`;

const Button = styled.button`
  border-style: none;
  background-color: transparent;
  font-size: 1.5rem;
`;

const FilterMenu = styled(Menu)`
  .MuiList-padding {
    padding: 0;
  }
`;

const FilterCondition = styled(MenuItem)`
  font-size: 1.4rem;
  padding: 0.5rem 2rem;
`;

export { FilterIcon, Button, FilterMenu, FilterCondition };
