import React, { useCallback } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { authFetcher } from '@/apis/authFetcher';
import { AccountCircleIcon, MenuIcons, SearchIcon } from '@/assets/icons';
import GetitLogo from '@/assets/images/GetitLogo';
import { AUTH_USER } from '@/apis/keys';
import SearchDrawer from '@/components/commons/drawer/search';
import { openDrawer } from '@/features/drawer';
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

const Nav = () => {
  const dispatch = useDispatch();

  const { data } = useSWR(AUTH_USER, authFetcher);

  const nickname = data?.data?.nickname;

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
                  <Link href={nickname ? `/profile/${nickname}` : '/login'}>
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
