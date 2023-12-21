import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store';
import { closeDrawer, openDrawer } from '@/features/drawer';
import ArrowRightAltIcon from '@/assets/icons/ArrowRightAltIcon';
import Link from 'next/link';
import { InnerContainer } from '@/styles/commons';
import {
  MUIDrawer,
  FastLinkContainer,
  Container,
  SearchIconLayoutContainer,
  SearchInput,
  Description,
  StyledLink,
  LinkContainer,
  Form,
  SearchIcon,
} from './styles';

const SearchDrawer = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchDrawerOpenState = useAppSelector((state) => state.drawer.search);

  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const searchText = searchInputRef.current?.value;

      router.push(`/search?q=${searchText}`);

      dispatch(closeDrawer({ type: 'search' }));
    },
    [dispatch, router],
  );

  useEffect(() => {
    return () => {
      dispatch(closeDrawer({ type: 'search' }));
    };
  }, [dispatch]);

  return (
    <MUIDrawer
      anchor={'top'}
      open={searchDrawerOpenState}
      onClose={handleCloseDrawer}
    >
      <Container>
        <InnerContainer>
          <Form onSubmit={handleSubmit}>
            <SearchInput
              type='text'
              placeholder='Getit.kr 검색하기'
              ref={searchInputRef}
            />
            <SearchIconLayoutContainer>
              <SearchIcon />
            </SearchIconLayoutContainer>
          </Form>

          <Description>빠른 링크</Description>

          <FastLinkContainer>
            {fastLink.current.map((item) => {
              return (
                <LinkContainer key={item.href}>
                  <ArrowRightAltIcon color='#86868b' width={2} height={2} />
                  <Link href={item.href}>
                    <StyledLink onClick={handleCloseDrawer}>
                      {item.text}
                    </StyledLink>
                  </Link>
                </LinkContainer>
              );
            })}
          </FastLinkContainer>
        </InnerContainer>
      </Container>
    </MUIDrawer>
  );
};

export default SearchDrawer;
