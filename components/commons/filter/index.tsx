import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FilterIcon } from '@/assets/icons';
import {
  Button,
  IconContainer,
  Text,
  FilterMenu,
  FilterCondition,
} from './styles';

const Filter = () => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [displayOrderText, setDisplayOrderText] = useState<'최신순' | '인기순'>(
    '최신순',
  );

  const open = Boolean(anchorEl);

  const handleOpenOrderSelector = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    // open
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      const { value } = event.currentTarget.dataset;

      if (value === 'new' || value === 'popularity') {
        router.push({
          pathname: router.pathname,
          query: {
            page: 1,
            order: value,
          },
        });
      }

      // close
      setAnchorEl(null);
    },
    [router],
  );

  // Set post order
  useEffect(() => {
    const order = router.query['order'];

    if (Array.isArray(order) || order === undefined) {
      return;
    }

    if (order !== 'new' && order !== 'popularity') {
      return;
    }

    if (order === 'new') {
      setDisplayOrderText('최신순');
    }

    if (order === 'popularity') {
      setDisplayOrderText('인기순');
    }
  }, [router]);

  return (
    <div>
      <Button onClick={handleOpenOrderSelector}>
        <IconContainer>
          <FilterIcon width={20} height={20} />
        </IconContainer>
        <Text>{displayOrderText}</Text>
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
