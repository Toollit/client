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
import { CloseBtn, BackBtn } from '@/components/commons/button';
import {
  Container,
  ColumnContainer,
  ColumnLeftContainer,
  ColumnRightContainer,
  StyledLink,
  LogoText,
} from './styles';

// optional value only use with close type and back type
export interface NavProps {
  type: 'default' | 'close' | 'back' | 'none';
  title?: string;
  menu?: React.ReactNode[]; // right side menu
  onClick?: () => void;
  boundary?: boolean;
}

const Nav = ({ type, title, menu, onClick, boundary = true }: NavProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogoRoute = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();

      window.scrollTo({ top: 0, behavior: 'auto' });

      const isMainPage = router.asPath === '/';

      // If click logo, you are supposed to go to the main page. One problem that arise here. If current page is the main page, but if you route it back to the main page, an API request will be made to the server due to the getServersideProps written for seo. so prevent api request if current page is main page
      if (isMainPage) {
        return;
      } else {
        router.push('/', undefined, { shallow: true });
      }
    },
    [router],
  );

  const handleSearchDrawer = useCallback(() => {
    dispatch(openDrawer({ type: 'search' }));
  }, [dispatch]);

  const handleProfileRoute = useCallback(
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

  switch (type) {
    case 'default':
      return (
        <Container boundary={boundary}>
          <ColumnContainer type='default'>
            <ColumnLeftContainer>
              <li>
                <Link href='/'>
                  <a onClick={handleLogoRoute}>
                    <GetitLogo />
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/' passHref>
                  <StyledLink onClick={handleLogoRoute}>
                    <LogoText>Getit</LogoText>
                  </StyledLink>
                </Link>
              </li>
            </ColumnLeftContainer>

            <ColumnRightContainer>
              <li onClick={handleSearchDrawer}>
                <SearchIcon />
                <SearchDrawer />
              </li>
              <li>
                <Link href={'/profile'}>
                  <a onClick={handleProfileRoute}>
                    <AccountCircleIcon />
                  </a>
                </Link>
              </li>
              <li>
                <Link href={'/menu'}>
                  <a>
                    <MenuIcons />
                  </a>
                </Link>
              </li>
            </ColumnRightContainer>
          </ColumnContainer>
        </Container>
      );

    case 'back':
      return (
        <Container boundary={boundary}>
          <ColumnContainer>
            <ColumnLeftContainer>
              <BackBtn onClick={onClick} title={title} menu={menu} />
            </ColumnLeftContainer>
            <ColumnRightContainer></ColumnRightContainer>
          </ColumnContainer>
        </Container>
      );

    case 'close':
      return (
        <Container boundary={boundary}>
          <ColumnContainer>
            <ColumnLeftContainer>
              <CloseBtn onClick={onClick} title={title} menu={menu} />
            </ColumnLeftContainer>
            <ColumnRightContainer></ColumnRightContainer>
          </ColumnContainer>
        </Container>
      );

    case 'none':
      return null;

    default:
      return null;
  }
};

export default Nav;
