import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import GetitLogo from '@/assets/images/GetitLogo';
import { closeDrawer, openDrawer } from '@/features/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { BackButton, CloseButton } from '@/components/commons/button';
import { RootState } from '@/store';
import useAuth from '@/hooks/useAuth';
import { InnerContainer } from '@/styles/commons';
import Menu from '@/components/commons/drawer/menu';
import {
  Container,
  ColumnContainer,
  ColumnLeftContainer,
  ColumnRightContainer,
  StyledLogoLink,
  LogoTitle,
  Title,
  DefaultContainer,
  SearchIcon,
  AccountCircleIcon,
  LayoutContainer,
  StyledProfileLink,
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
  const dispatch = useDispatch();
  const { authMutate, nickname } = useAuth();

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

  useEffect(() => {
    (async () => {
      await authMutate();
    })();
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
                  <Link href='/' passHref>
                    <StyledLogoLink onClick={handleLogoRoute}>
                      <GetitLogo width={3.2} height={3.2} />
                      <LogoTitle>Getit</LogoTitle>
                    </StyledLogoLink>
                  </Link>
                </li>
              </ColumnLeftContainer>

              <ColumnRightContainer>
                <li>
                  <SearchIcon onClick={handleSearchDrawer} />
                </li>
                <li>
                  <Link
                    href={nickname ? `/profile/${nickname}` : '/login'}
                    passHref
                  >
                    <StyledProfileLink>
                      <AccountCircleIcon />
                    </StyledProfileLink>
                  </Link>
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
