import React from 'react';
import Link from 'next/link';
import { useSWRConfig, Cache } from 'swr';
import { AuthAPIRes } from '@/apis/authFetcher';
import { AccountCircleIcon, MenuIcons, SearchIcon } from '@/assets/icons';
import GetitLogo from '@/assets/images/GetitLogo';
import { AUTH_USER } from '@/apis/keys';
import {
  NavContainer,
  Content,
  IconContainer,
  NavList,
  ColumnLeftContainer,
  LogoText,
  ColumnRightContainer,
  StyledLink,
} from './styles';

const Nav = () => {
  const { cache }: { cache: Cache<AuthAPIRes> } = useSWRConfig();
  const isLoggedIn = cache.get(AUTH_USER)?.data?.data?.nickname;

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
                <li>
                  <Link href='/search'>
                    <a>
                      <IconContainer>
                        <SearchIcon />
                      </IconContainer>
                    </a>
                  </Link>
                </li>
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
    </>
  );
};

export default Nav;
