import React, { useCallback, useEffect, useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import AppLayout from '@/components/appLayout';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import useLogout from '@/hooks/useLogout';
import {
  MenuButton,
  MenuIcon,
  Container,
  Icon,
  Item,
  Text,
  StyledLink,
  AccountCircleIcon,
  ArticleIcon,
  BookmarkIcon,
  NotificationsIcon,
  CampaignIcon,
  MouseIcon,
  AdminPanelSettingsIcon,
  LiveHelpOutlinedIcon,
  LogoutOutlinedIcon,
} from './styles';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Menu = () => {
  const router = useRouter();
  const { nickname } = useAuth();
  const { logOut } = useLogout();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [menu, setMenu] = useState<
    { tag: string; icon: React.ReactNode; text: string; url: string }[]
  >([]);

  const handleClose = useCallback(() => {
    setState({ ...state, ['top']: false });
  }, [state]);

  const toggleDrawer = useCallback(
    (anchor: Anchor, open: boolean) =>
      async (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      },
    [state],
  );

  const handleAuth = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (nickname) {
        await logOut({ replace: '/' });
        handleClose();
      }

      if (!nickname) {
        router.push('/login');
        handleClose();
      }
    },
    [router, logOut, nickname, handleClose],
  );

  useEffect(() => {
    setMenu([
      {
        tag: 'profile',
        icon: <AccountCircleIcon />,
        text: '내 프로필',
        url: nickname ? `/profile/${nickname}` : '/login',
      },
      {
        tag: 'project',

        icon: <ArticleIcon />,
        text: '내 프로젝트',
        url: nickname ? `/profile/${nickname}?tab=viewProjects` : '/login',
      },
      {
        tag: 'bookmark',
        icon: <BookmarkIcon />,
        text: '내 북마크',
        url: nickname ? `/profile/${nickname}?tab=viewBookmarks` : '/login',
      },
      {
        tag: 'notification',
        icon: <NotificationsIcon />,
        text: '알림',
        url: nickname ? `/profile/${nickname}?tab=viewNotifications` : '/login',
      },
      {
        tag: 'notice',
        icon: <CampaignIcon />,
        text: '공지사항',
        url: '/notice',
      },
      {
        tag: 'terms-of-service',
        icon: <MouseIcon />,
        text: '이용약관',
        url: '/policy/terms-of-service',
      },
      {
        tag: 'privacy',
        icon: <AdminPanelSettingsIcon />,
        text: '개인정보처리방침',
        url: '/policy/privacy',
      },
      { tag: 'faq', icon: <LiveHelpOutlinedIcon />, text: 'FAQ', url: '/faq' },
      {
        tag: 'auth',
        icon: <LogoutOutlinedIcon />,
        text: nickname ? '로그아웃' : '로그인',
        url: nickname ? '#' : '/login',
      },
    ]);
  }, [nickname]);

  return (
    <div>
      <React.Fragment key={'top'}>
        <MenuButton onClick={toggleDrawer('top', true)}>
          <MenuIcon />
        </MenuButton>
        <SwipeableDrawer
          anchor={'top'}
          open={state['top']}
          onClose={toggleDrawer('top', false)}
          onOpen={toggleDrawer('top', true)}
        >
          <AppLayout
            type='close'
            handleClose={handleClose}
            title='메뉴'
            boundary={true}
            fullSize={false}
            footer={false}
          >
            <Container>
              {menu.map((item) => {
                return (
                  <Link key={item.text} href={item.url} passHref>
                    <StyledLink
                      onClick={item.tag === 'auth' ? handleAuth : undefined}
                    >
                      <Item>
                        <Icon>{item.icon}</Icon>
                        <Text>{item.text}</Text>
                      </Item>
                    </StyledLink>
                  </Link>
                );
              })}
            </Container>
          </AppLayout>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default Menu;
