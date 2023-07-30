import React, { useCallback } from 'react';
import Link from 'next/link';
import { AccountCircleIcon, MenuIcons, SearchIcon } from '@/assets/icons';
import GetitLogo from '@/assets/images/GetitLogo';
import SearchDrawer from '@/components/commons/drawer/search';
import { openDrawer } from '@/features/drawer';
import { useDispatch } from 'react-redux';
import useAuth from '@/hooks/useAuth';
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
import { useRouter } from 'next/router';
import { updatePostOrder } from '@/features/order';
import { updatePage } from '@/features/pagination';

const Nav = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isAuthenticated, nickname } = useAuth();

  const isMainPage = router.asPath === '/';

  const handlePagination = useCallback(() => {
    dispatch(updatePostOrder({ order: 'new' }));
    dispatch(updatePage({ page: 1 }));
    window.scrollTo({ top: 0 });
  }, [dispatch]);

  const handleSearchDrawer = useCallback(() => {
    dispatch(openDrawer({ type: 'search' }));
  }, [dispatch]);

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
                  <Link
                    href={isAuthenticated ? `/profile/${nickname}` : '/login'}
                  >
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
      <SearchDrawer />
    </>
  );
};

export default Nav;
