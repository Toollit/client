import React, { useCallback, useEffect, useState } from 'react';
import { FilterIcon } from '@/assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostOrder } from '@/features/order';
import { RootState } from '@/store';
import {
  Button,
  IconContainer,
  Text,
  FilterMenu,
  FilterCondition,
} from './styles';

const Filter = () => {
  const dispatch = useDispatch();

  const order = useSelector((state: RootState) => state.postOrder.order);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [orderText, setOrderText] = useState<'최신순' | '인기순'>('최신순');

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // open
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      const { value } = event.currentTarget.dataset;

      if (value === 'new') {
        dispatch(updatePostOrder({ order: 'new' }));
      }

      if (value === 'popularity') {
        dispatch(updatePostOrder({ order: 'popularity' }));
      }

      window.scrollTo({ top: 0 });

      // close
      setAnchorEl(null);
    },
    [dispatch],
  );

  useEffect(() => {
    if (order === 'new') {
      setOrderText('최신순');
    }

    if (order === 'popularity') {
      setOrderText('인기순');
    }
  }, [order]);

  return (
    <div>
      <Button onClick={handleClick}>
        <IconContainer>
          <FilterIcon width={20} height={20} />
        </IconContainer>
        <Text>{orderText}</Text>
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
