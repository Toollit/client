import React, { useCallback } from 'react';
import Link from 'next/link';
import { AccountCircleIcon, MenuIcons, SearchIcon } from '@/assets/icons';
import GetitLogo from '@/assets/images/GetitLogo';
import SearchDrawer from '@/components/commons/drawer/search';
import { openDrawer } from '@/features/drawer';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import { authUserKey } from '@/apis/keys';
import { errorMessage } from '@/apis/errorMessage';
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
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogoRoute = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();

      const isMainPage = router.asPath === '/';

      // If click logo, you are supposed to go to the main page. One problem that arise here. If current page is the main page, but if you route it back to the main page, an API request will be made to the server due to the getServersideProps written for seo. so prevent api request if current page is main page
      if (isMainPage) {
        return;
      } else {
        router.push('/');
      }
    },
    [router],
  );

  const handleSearchDrawer = useCallback(() => {
    dispatch(openDrawer({ type: 'search' }));
  }, [dispatch]);

  const handleRoute = useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault();

      try {
        const {
          data: { nickname },
        } = await mutate(authUserKey);

        if (nickname) {
          router.push(`/profile/${nickname}`);
        }

        if (!nickname) {
          router.push('/login');
        }
      } catch (error) {
        errorMessage(error);
      }
    },
    [router],
  );

  return (
    <>
      <NavContainer>
        <Content>
          <NavList>
            <ColumnLeftContainer>
              <Link href='/' passHref>
                <StyledLink onClick={handleLogoRoute}>
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
                  <Link href={'/profile'}>
                    <a onClick={handleRoute}>
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
