import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { AccountCircleIcon, MenuIcons, SearchIcon } from 'assets/icons';
import GetitLogo from 'assets/images/GetitLogo';
import {
  Content,
  IconContainer,
  IconContent,
  NavList,
  LeftNavContainer,
  LogoText,
  RightNavContainer,
  StyledLink,
} from './styles';

const Nav = () => {
  const router = useRouter();
  //TODO 서버 nickname 수정 후 email -> nickname으로 변경
  const isLoggedIn = useSelector((state: RootState) => state.user.email);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      const { icon } = event.currentTarget.dataset;

      if (icon === 'search') {
        //TODO search modal 추가
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
    <nav>
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
    </nav>
  );
};

export default Nav;
