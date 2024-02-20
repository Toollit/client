import React, { useCallback, useEffect, useState } from 'react';
import { Drawer as MUIDrawer } from '@mui/material';
import AppLayout from '@/components/appLayout';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import useLogout from '@/hooks/useLogout';
import Link from 'next/link';
import {
  OpenButton,
  MenuIcon,
  Container,
  Icon,
  Item,
  Text,
  AccountCircleIcon,
  ArticleIcon,
  BookmarkIcon,
  NotificationsIcon,
  CampaignIcon,
  MouseIcon,
  AdminPanelSettingsIcon,
  LiveHelpOutlinedIcon,
  LogoutOutlinedIcon,
  StyledList,
} from './styles';

interface MenuItem {
  tag: string;
  icon: React.ReactNode;
  text: string;
  url: string;
  handler?: () => void;
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

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleUserSession = useCallback(async () => {
    if (nickname) {
      await logOut({ push: '/' });
      handleClose();
    }

    if (!nickname) {
      router.push('/login');
      handleClose();
    }
  }, [router, logOut, nickname, handleClose]);

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
        handler: handleUserSession,
      },
    ]);
  }, [nickname, handleUserSession]);

  return (
    <div>
      <React.Fragment>
        <OpenButton onClick={handleOpen}>
          <MenuIcon />
        </OpenButton>
        <MUIDrawer anchor={'top'} open={open}>
          <AppLayout
            type='close'
            handleClose={handleClose}
            title='메뉴'
            boundary={true}
            fullSize={false}
            footer={false}
          >
            <Container>
              <ul>
                {menu.map((item) => {
                  return (
                    <StyledList key={item.tag}>
                      <Link href={item.url} onClick={item.handler}>
                        <Item>
                          <Icon>{item.icon}</Icon>
                          <Text>{item.text}</Text>
                        </Item>
                      </Link>
                    </StyledList>
                  );
                })}
              </ul>
            </Container>
          </AppLayout>
        </MUIDrawer>
      </React.Fragment>
    </div>
  );
};

export default Menu;
