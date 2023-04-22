import React, { useCallback } from 'react';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { closeDrawer, openDrawer } from '@/features/drawer';
import { CloseBtn } from '@/components/commons/button';
import { SearchIcon } from '@/assets/icons';
import {
  SearchBoxContainer,
  SearchBoxIconInputPositionContainer,
  SearchBox,
  SearchIconContainer,
  SearchInput,
  SearchRecommendation,
} from './styles';

export default function SearchDrawer() {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.drawer.search);

  const toggleDrawer = useCallback(
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      if (open) {
        dispatch(
          openDrawer({
            type: 'search',
          }),
        );
      }

      if (!open) {
        dispatch(
          closeDrawer({
            type: 'search',
          }),
        );
      }
    },
    [dispatch],
  );

  const handleClose = useCallback(() => {
    dispatch(
      closeDrawer({
        type: 'search',
      }),
    );
  }, [dispatch]);

  return (
    <Drawer anchor={'top'} open={open} onClose={toggleDrawer(false)}>
      <SearchBoxContainer>
        <CloseBtn onClick={handleClose} />
        <SearchBox>
          <SearchBoxIconInputPositionContainer>
            <SearchIconContainer>
              <SearchIcon />
            </SearchIconContainer>

            <SearchInput type='text' placeholder='Getit.kr 검색하기' />
          </SearchBoxIconInputPositionContainer>

          <SearchRecommendation>검색 제안</SearchRecommendation>
          {/* TODO 검색제안 만들기 */}
        </SearchBox>
      </SearchBoxContainer>
    </Drawer>
  );
}
