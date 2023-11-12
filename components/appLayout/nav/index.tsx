import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { AccountCircleIcon, MenuIcon, SearchIcon } from '@/assets/icons';
import GetitLogo from '@/assets/images/GetitLogo';
import { closeDrawer, openDrawer } from '@/features/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { BackButton, CloseButton } from '@/components/commons/button';
import { RootState } from '@/store';
import useAuth from '@/hooks/useAuth';
import useCheckUserAgent from '@/hooks/useCheckUserAgent';
import useCachedKeys from '@/hooks/useCachedKeys';
import { InnerContainer } from '@/styles/commons';
import {
  Container,
  ColumnContainer,
  ColumnLeftContainer,
  ColumnRightContainer,
  StyledLogoLink,
  LogoText,
  Title,
  StyledLink,
  DefaultContainer,
} from './styles';

export interface NavProps {
  type: 'default' | 'close' | 'back' | 'none';
  title?: string;
  menu?: React.ReactNode[];
  boundary?: boolean;
  fullSize?: boolean;
  onClick?: () => void;
}

/**
 * @props type - 'default' | 'close' | 'back' | 'none';
 * @props title - nav center text
 * @props menu - nav right side icons
 * @props boundary - nav bottom border show
 * @props fullSize - use only when type back or close and boundary false
 * @props onClick - nav left side default icons click handler
 */
const Nav = ({
  type,
  title,
  menu,
  boundary = true,
  fullSize = true,
  onClick,
}: NavProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { authMutate } = useAuth();
  const { isMobile } = useCheckUserAgent();
  const { mutatePage } = useCachedKeys();

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

  const handleProfileRoute = useCallback(async () => {
    const response = await authMutate();

    const nickname = response?.data.nickname;

    if (response?.success === false) {
      router.push('/login');
    } else {
      router.push(`/profile/${nickname}`);
    }
  }, [authMutate, router]);

  useEffect(() => {
    mutatePage({ page: '/' });
  }, [mutatePage]);

  switch (type) {
    case 'default':
      return (
        <DefaultContainer boundary={boundary}>
          <InnerContainer>
            <ColumnContainer>
              <ColumnLeftContainer isMobile={isMobile}>
                <li>
                  <Link href='/' passHref>
                    <StyledLogoLink onClick={handleLogoRoute}>
                      <GetitLogo />
                      <LogoText>Getit</LogoText>
                    </StyledLogoLink>
                  </Link>
                </li>
              </ColumnLeftContainer>

              <ColumnRightContainer isMobile={isMobile}>
                <li onClick={handleSearchDrawer}>
                  <StyledLink>
                    <SearchIcon width={2.8} height={2.8} />
                  </StyledLink>
                </li>
                <li>
                  <StyledLink onClick={handleProfileRoute}>
                    <AccountCircleIcon width={2.8} height={2.8} />
                  </StyledLink>
                </li>
                <li>
                  <Link href={'/menu'} passHref>
                    <StyledLink>
                      <MenuIcon width={2.8} height={2.8} />
                    </StyledLink>
                  </Link>
                </li>
              </ColumnRightContainer>
            </ColumnContainer>
          </InnerContainer>
        </DefaultContainer>
      );

    case 'back':
      return (
        <Container boundary={boundary} fullSize={fullSize}>
          <ColumnContainer>
            <Title>{title}</Title>
            <ColumnLeftContainer isMobile={isMobile}>
              <li onClick={onClick}>
                <BackButton />
              </li>
            </ColumnLeftContainer>
            <ColumnRightContainer isMobile={isMobile}></ColumnRightContainer>
          </ColumnContainer>
        </Container>
      );

    case 'close':
      return (
        <Container boundary={boundary} fullSize={fullSize}>
          <ColumnContainer>
            <Title>{title}</Title>
            <ColumnLeftContainer isMobile={isMobile}>
              <li onClick={onClick}>
                <CloseButton />
              </li>
            </ColumnLeftContainer>
            <ColumnRightContainer isMobile={isMobile}></ColumnRightContainer>
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
