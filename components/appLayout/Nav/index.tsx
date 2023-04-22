import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useSWRConfig, Cache } from 'swr';
import { AuthAPIRes } from '@/apis/authFetcher';
import { AccountCircleIcon, MenuIcons, SearchIcon } from '@/assets/icons';
import GetitLogo from '@/assets/images/GetitLogo';
import { AUTH_USER } from '@/apis/keys';
import SearchDrawer from '@/components/commons/drawer/search';
import { useDispatch } from 'react-redux';
import {
  NavContainer,
  Content,
  IconContainer,
  NavList,
  ColumnLeftContainer,
  LogoText,
  ColumnRightContainer,
  StyledLink,
  SearchDrawerBtn,
} from './styles';
import { openDrawer } from '@/features/drawer';

const Nav = () => {
  const dispatch = useDispatch();
  const { cache }: { cache: Cache<AuthAPIRes> } = useSWRConfig();
  const isLoggedIn = cache.get(AUTH_USER)?.data?.data?.nickname;

  const handleSearchDrawer = useCallback(() => {
    dispatch(openDrawer({ type: 'search' }));
  }, [dispatch]);

  return (
    <>
      <NavContainer>
        <Content>
          <NavList>
            <ColumnLeftContainer>
              <Link href='/' passHref>
                <StyledLink>
                  <GetitLogo />
                  <LogoText>Getit</LogoText>
                </StyledLink>
              </Link>
            </ColumnLeftContainer>

            <ColumnRightContainer>
              <ul>
                <SearchDrawerBtn onClick={handleSearchDrawer}>
                  <IconContainer>
                    <SearchIcon />
                  </IconContainer>
                </SearchDrawerBtn>
                <li>
                  <Link href={isLoggedIn ? '/profile' : '/login'}>
                    <a>
                      <IconContainer>
                        <AccountCircleIcon />
                      </IconContainer>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={'/menu'}>
                    <a>
                      <IconContainer>
                        <MenuIcons />
                      </IconContainer>
                    </a>
                  </Link>
                </li>
              </ul>
            </ColumnRightContainer>
          </NavList>
        </Content>
      </NavContainer>
      <SearchDrawer />
    </>
  );
};

export default Nav;
