import React, { useCallback } from 'react';
import Link from 'next/link';
import { AccountCircleIcon, MenuIcons, SearchIcon } from '@/assets/icons';
import GetitLogo from '@/assets/images/GetitLogo';
import SearchDrawer from '@/components/commons/drawer/search';
import { openDrawer } from '@/features/drawer';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { updatePostOrder } from '@/features/order';
import { updatePage } from '@/features/pagination';
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
  ResetPage,
} from './styles';

const Nav = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isMainPage = router.asPath === '/';

  const handlePagination = useCallback(() => {
    dispatch(updatePostOrder({ order: 'new' }));
    dispatch(updatePage({ page: 1 }));
    window.scrollTo({ top: 0 });
  }, [dispatch]);

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
              {isMainPage ? (
                <ResetPage onClick={handlePagination}>
                  <GetitLogo />
                  <LogoText>Getit</LogoText>
                </ResetPage>
              ) : (
                <Link href='/' passHref>
                  <StyledLink>
                    <GetitLogo />
                    <LogoText>Getit</LogoText>
                  </StyledLink>
                </Link>
              )}
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
