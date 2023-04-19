import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSWRConfig, Cache } from 'swr';
import { AuthAPIRes } from '@/apis/authFetcher';
import { AccountCircleIcon, MenuIcons, SearchIcon } from 'assets/icons';
import GetitLogo from 'assets/images/GetitLogo';
import {
  NavContainer,
  Content,
  IconContainer,
  IconContent,
  NavList,
  LeftNavContainer,
  LogoText,
  RightNavContainer,
  StyledLink,
  SearchBoxPositionContainer,
  SearchBoxContainer,
  SearchBoxIconInputPositionContainer,
  SearchBox,
  SearchIconContainer,
  SearchInput,
  SearchRecommendation,
} from './styles';
import { AUTH_USER } from '@/apis/keys';

const Nav = () => {
  const router = useRouter();

  const { cache }: { cache: Cache<AuthAPIRes> } = useSWRConfig();

  const isLoggedIn = cache.get(AUTH_USER)?.data?.data?.nickname;

  const [showSearch, setShowSearch] = useState(false);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      const { icon } = event.currentTarget.dataset;

      if (icon === 'search') {
        setShowSearch((prev) => !prev);
      }

      if (icon === 'account') {
        if (isLoggedIn) {
          return router.push('/profile');
        }
        if (!isLoggedIn) {
          return router.push('/login');
        }
      }

      if (icon === 'menu') {
        //TODO menu modal 추가
      }
    },
    [isLoggedIn, router],
  );

  return (
    <NavContainer>
      <Content>
        <NavList>
          <LeftNavContainer>
            <Link href={process.env.NEXT_PUBLIC_CLIENT_HOST} passHref>
              <StyledLink>
                <GetitLogo />
                <LogoText>Getit</LogoText>
              </StyledLink>
            </Link>
          </LeftNavContainer>

          <RightNavContainer>
            <ul>
              <IconContainer data-icon='search' onClick={handleClick}>
                <IconContent>
                  <SearchIcon />
                </IconContent>
              </IconContainer>
              <IconContainer data-icon='account' onClick={handleClick}>
                <IconContent>
                  <AccountCircleIcon />
                </IconContent>
              </IconContainer>
              <IconContainer data-icon='menu' onClick={handleClick}>
                <IconContent>
                  <MenuIcons />
                </IconContent>
              </IconContainer>
            </ul>
          </RightNavContainer>
        </NavList>
      </Content>
      {showSearch && (
        <SearchBoxPositionContainer>
          <SearchBoxContainer>
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
        </SearchBoxPositionContainer>
      )}
    </NavContainer>
  );
};

export default Nav;
