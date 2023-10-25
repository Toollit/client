import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { closeDrawer, openDrawer } from '@/features/drawer';
import { SearchIcon } from '@/assets/icons';
import ArrowRightAltIcon from '@/assets/icons/ArrowRightAltIcon';
import Link from 'next/link';
import { InnerContainer } from '@/styles/commons';
import {
  CustomDrawer,
  FastLinkContainer,
  Container,
  SearchIconContainer,
  SearchInput,
  Description,
  StyledLink,
  LinkContainer,
  SearchInputContainer,
} from './styles';

export default function SearchDrawer() {
  const dispatch = useDispatch();
  const searchDrawerOpenState = useSelector(
    (state: RootState) => state.drawer.search,
  );

  const fastLink = useRef<{ href: string; text: string }[]>([
    { href: '/faq', text: '자주 찾는 질문' },
    { href: '/notice', text: '공지사항' },
    { href: '/contact', text: '1:1 문의' },
  ]);

  const handleCloseDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    dispatch(closeDrawer({ type: 'search' }));
  };

  useEffect(() => {
    return () => {
      dispatch(closeDrawer({ type: 'search' }));
    };
  }, [dispatch]);

  return (
    <CustomDrawer
      anchor={'top'}
      open={searchDrawerOpenState}
      onClose={handleCloseDrawer}
    >
      <Container>
        <InnerContainer>
          <SearchInputContainer>
            <SearchInput type='text' placeholder='Getit.kr 검색하기' />
            <SearchIconContainer>
              <SearchIcon width={3} height={3} color='#e8e8ed' />
            </SearchIconContainer>
          </SearchInputContainer>

          <Description>빠른 링크</Description>

          <FastLinkContainer>
            {fastLink.current.map((item) => {
              return (
                <LinkContainer key={item.href}>
                  <ArrowRightAltIcon color='#86868b' width={2} height={2} />
                  <Link href={item.href}>
                    <StyledLink>{item.text}</StyledLink>
                  </Link>
                </LinkContainer>
              );
            })}
          </FastLinkContainer>
        </InnerContainer>
      </Container>
    </CustomDrawer>
  );
}
