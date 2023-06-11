import React, { useEffect, useState } from 'react';
import { FilterIcon } from '@/assets/icons';
import { useDispatch } from 'react-redux';
import { updatePostOrder } from '@/features/order';
import { updatePage, updateTotalPage } from '@/features/pagination';
import {
  Button,
  IconContainer,
  Text,
  FilterMenu,
  FilterCondition,
} from './styles';

const Filter = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [order, setOrder] = useState<'최신순' | '인기순'>('최신순');

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // open
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLLIElement>) => {
    const { value } = event.currentTarget.dataset;

    if (value === 'new') {
      dispatch(updatePostOrder({ order: 'new' }));
      setOrder('최신순');
    }

    if (value === 'popularity') {
      dispatch(updatePostOrder({ order: 'popularity' }));
      setOrder('인기순');
    }

    // pagination reset
    dispatch(updatePage({ page: 1 }));
    dispatch(updateTotalPage({ totalPage: 1 }));

    // close
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(updatePostOrder({ order: 'new' }));
  }, [dispatch]);

  return (
    <div>
      <Button onClick={handleClick}>
        <IconContainer>
          <FilterIcon width={20} height={20} />
        </IconContainer>
        <Text>{order}</Text>
      </Button>
      <FilterMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <FilterCondition onClick={handleClose} data-value='new'>
          최신순
        </FilterCondition>
        <FilterCondition onClick={handleClose} data-value='popularity'>
          인기순
        </FilterCondition>
      </FilterMenu>
    </div>
  );
};

export default Filter;
