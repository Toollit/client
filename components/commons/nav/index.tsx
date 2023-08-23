import React, { useCallback } from 'react';
import Link from 'next/link';
import { AccountCircleIcon, MenuIcons, SearchIcon } from '@/assets/icons';
import GetitLogo from '@/assets/images/GetitLogo';
import { closeDrawer, openDrawer } from '@/features/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { CloseBtn, BackBtn } from '@/components/commons/button';
import { RootState } from '@/store';
import useAuth from '@/hooks/useAuth';
import {
  Container,
  ColumnContainer,
  ColumnLeftContainer,
  ColumnRightContainer,
  StyledLogoLink,
  LogoText,
  Title,
  StyledLink,
} from './styles';

// optional value only use with close type and back type
export interface NavProps {
  type: 'default' | 'close' | 'back' | 'none';
  title?: string;
  menu?: React.ReactNode[]; // right side menu
  boundary?: boolean; // border bottom line
  onClick?: () => void;
}

const Nav = ({ type, title, menu, boundary = true, onClick }: NavProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { nickname } = useAuth();
  const searchDrawerOpenState = useSelector(
    (state: RootState) => state.drawer.search,
  );

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
    if (searchDrawerOpenState) {
      return dispatch(closeDrawer({ type: 'search' }));
    }

    if (!searchDrawerOpenState) {
      return dispatch(openDrawer({ type: 'search' }));
    }
  }, [dispatch, searchDrawerOpenState]);

  switch (type) {
    case 'default':
      return (
        <Container boundary={boundary}>
          <ColumnContainer>
            <ColumnLeftContainer>
              <li>
                <Link href='/'>
                  <StyledLogoLink onClick={handleLogoRoute}>
                    <GetitLogo />
                    <LogoText>Getit</LogoText>
                  </StyledLogoLink>
                </Link>
              </li>
            </ColumnLeftContainer>

            <ColumnRightContainer>
              <li onClick={handleSearchDrawer}>
                <SearchIcon width={28} height={28} />
              </li>
              <li>
                <Link href={nickname ? `/profile/${nickname}` : '/login'}>
                  <StyledLink>
                    <AccountCircleIcon width={28} height={28} />
                  </StyledLink>
                </Link>
              </li>
              <li>
                <Link href={'/menu'}>
                  <StyledLink>
                    <MenuIcons width={28} height={28} />
                  </StyledLink>
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
            <Title>{title}</Title>
            <ColumnLeftContainer>
              <BackBtn onClick={onClick} />
            </ColumnLeftContainer>
            <ColumnRightContainer></ColumnRightContainer>
          </ColumnContainer>
        </Container>
      );

    case 'close':
      return (
        <Container boundary={boundary}>
          <ColumnContainer>
            <Title>{title}</Title>
            <ColumnLeftContainer>
              <CloseBtn onClick={onClick} />
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
