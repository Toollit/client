import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import ArrowRightAltIcon from '@/assets/icons/ArrowRightAltIcon';
import { InnerContainer } from '@/styles/commons';
import {
  MUIDrawer,
  FastLinkContainer,
  Container,
  SearchIconLayoutContainer,
  SearchInput,
  Description,
  FastLink,
  LinkContainer,
  Form,
  SearchIcon,
  OpenButton,
} from './styles';

interface SearchDrawerProps {
  icon: React.ReactNode;
}

const SearchDrawer = ({ icon }: SearchDrawerProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const fastLink = useRef<{ href: string; text: string }[]>([
    { href: '/faq', text: '자주 찾는 질문' },
    { href: '/notice', text: '공지사항' },
    { href: '/contact', text: '1:1 문의' },
  ]);

  const toggleDrawer = useCallback(
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(open);
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const searchText = searchInputRef.current?.value;

      router.push(`/search?q=${searchText}`);

      setOpen(false);
    },
    [router],
  );

  useEffect(() => {
    searchButtonRef.current?.blur();
  }, [open]);

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, [toggleDrawer]);

  return (
    <div>
      <React.Fragment>
        <OpenButton onClick={toggleDrawer(true)} ref={searchButtonRef}>
          {icon}
        </OpenButton>
        <MUIDrawer anchor={'top'} open={open} onClose={toggleDrawer(false)}>
          <Container>
            <InnerContainer>
              <Form onSubmit={handleSubmit}>
                <SearchInput
                  type='text'
                  placeholder='프로젝트 검색'
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
                      <FastLink href={item.href} onClick={toggleDrawer(false)}>
                        {item.text}
                      </FastLink>
                    </LinkContainer>
                  );
                })}
              </FastLinkContainer>
            </InnerContainer>
          </Container>
        </MUIDrawer>
      </React.Fragment>
    </div>
  );
};

export default SearchDrawer;
