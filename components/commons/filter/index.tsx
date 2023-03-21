import React from 'react';
import { FilterIcon, Button, FilterMenu, FilterCondition } from './styles';

const Filter = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <FilterIcon />
      </Button>
      <FilterMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <FilterCondition onClick={handleClose}>최신순</FilterCondition>
        <FilterCondition onClick={handleClose}>인기순</FilterCondition>
      </FilterMenu>
    </div>
  );
};

export default Filter;
