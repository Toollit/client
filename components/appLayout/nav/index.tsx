import React, { useCallback } from 'react';
import GetitLogo from '@/assets/images/GetitLogo';
import { useRouter } from 'next/router';
import { BackButton, CloseButton } from '@/components/commons/button';
import useAuth from '@/hooks/useAuth';
import { InnerContainer } from '@/styles/commons';
import Menu from '@/components/commons/drawer/menu';
import SearchDrawer from '@/components/commons/drawer/search';
import {
  Container,
  ColumnContainer,
  ColumnLeftContainer,
  ColumnRightContainer,
  LogoLink,
  LogoTitle,
  Title,
  DefaultContainer,
  SearchIcon,
  AccountCircleIcon,
  LayoutContainer,
  ProfileLink,
} from './styles';

type Default = {
  type: 'default';
  boundary?: boolean;
};

type None = {
  type: 'none';
};

type Close = {
  type: 'close';
  title?: string;
  boundary?: boolean;
  fullSize?: boolean;
  handleClose: () => void;
};

type Back = {
  type: 'back';
  title?: string;
  boundary?: boolean;
  fullSize?: boolean;
  handleBack: () => void;
};

export type NavProps = Default | None | Close | Back;

/**
 * Renders a navigation component based on the specified type.
 */
const Nav = <T extends Default | Close | Back | None>(props: T) => {
  const { type } = props;
  const router = useRouter();
  const { nickname, authMutate } = useAuth();

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

  const handleAuthMutate = useCallback(() => {
    authMutate();
  }, [authMutate]);

  switch (type) {
    case 'default':
      const { boundary: defaultBoundary } = props;
      return (
        <DefaultContainer boundary={defaultBoundary ?? true}>
          <InnerContainer>
            <ColumnContainer>
              <ColumnLeftContainer>
                <li>
                  <LogoLink href='/' onClick={handleLogoRoute}>
                    <GetitLogo width={3.2} height={3.2} />
                    <LogoTitle>Getit</LogoTitle>
                  </LogoLink>
                </li>
              </ColumnLeftContainer>

              <ColumnRightContainer>
                <li>
                  <SearchDrawer icon={<SearchIcon />} />
                </li>
                <li>
                  <ProfileLink
                    href={nickname ? `/profile/${nickname}` : '/login'}
                    onClick={handleAuthMutate}
                  >
                    <AccountCircleIcon />
                  </ProfileLink>
                </li>
                <li>
                  <Menu />
                </li>
              </ColumnRightContainer>
            </ColumnContainer>
          </InnerContainer>
        </DefaultContainer>
      );

    case 'back':
      const {
        boundary: backBoundary,
        title: backTitle,
        fullSize: backFullSize,
        handleBack,
      } = props;
      return (
        <Container
          boundary={backBoundary ?? true}
          fullSize={backFullSize ?? true}
        >
          <LayoutContainer>
            <BackButton handleBack={handleBack} />
            <Title>{backTitle}</Title>
          </LayoutContainer>
        </Container>
      );

    case 'close':
      const {
        boundary: closeBoundary,
        title: closeTitle,
        fullSize: closeFullSize,
        handleClose,
      } = props;

      return (
        <Container
          boundary={closeBoundary ?? true}
          fullSize={closeFullSize ?? true}
        >
          <LayoutContainer>
            <CloseButton handleClose={handleClose} />
            <Title>{closeTitle}</Title>
          </LayoutContainer>
        </Container>
      );

    case 'none':
      return null;

    default:
      return null;
  }
};

export default Nav;
