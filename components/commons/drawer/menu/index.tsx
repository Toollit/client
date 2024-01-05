import React, { useCallback, useEffect, useState } from 'react';
import { Drawer as MUIDrawer } from '@mui/material';
import AppLayout from '@/components/appLayout';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import useLogout from '@/hooks/useLogout';
import {
  OpenButton,
  MenuIcon,
  Container,
  Icon,
  Item,
  Text,
  MenuItemLink,
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

interface MenuItem {
  tag: string;
  icon: React.ReactNode;
  text: string;
  url: string;
}

const Menu = () => {
  const router = useRouter();
  const { nickname } = useAuth();
  const { logOut } = useLogout();

  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuItem[]>([]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleToggleDrawer = useCallback(
    (open: boolean) =>
      async (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setOpen(open);
      },
    [],
  );

  const handleAuth = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>, menuItem: MenuItem) => {
      e.preventDefault();

      if (menuItem.tag === 'auth') {
        if (nickname) {
          await logOut({ replace: '/' });
          handleClose();
        }

        if (!nickname) {
          router.push('/login');
          handleClose();
        }
      } else {
        return undefined;
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
      <React.Fragment>
        <OpenButton onClick={handleToggleDrawer(true)}>
          <MenuIcon />
        </OpenButton>
        <MUIDrawer
          anchor={'top'}
          open={open}
          onClose={handleToggleDrawer(false)}
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
                  <MenuItemLink
                    key={item.url}
                    href={item.url}
                    onClick={(e) => handleAuth(e, item)}
                  >
                    <Item>
                      <Icon>{item.icon}</Icon>
                      <Text>{item.text}</Text>
                    </Item>
                  </MenuItemLink>
                );
              })}
            </Container>
          </AppLayout>
        </MUIDrawer>
      </React.Fragment>
    </div>
  );
};

export default Menu;
