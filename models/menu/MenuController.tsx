import React, { FC, useCallback, useEffect, useState } from 'react';
import MenuView, { ViewProps } from './MenuView';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';
import {
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

export interface MenuItem {
  tag: string;
  icon: React.ReactNode;
  text: string;
  url: string;
  handler?: () => void;
}

export interface ControllerProps {}

const MenuController: FC<ControllerProps> = ({}) => {
  const router = useRouter();
  const { nickname } = useAuth();
  const { logOut } = useLogout();

  const [menu, setMenu] = useState<MenuItem[]>([]);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const handleUserSession = useCallback(async () => {
    if (nickname) {
      await logOut({ push: '/' });
    }

    if (!nickname) {
      router.push('/login');
    }
  }, [router, logOut, nickname]);

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

  const props: ViewProps = {
    handleClose,
    menu,
  };

  return <MenuView {...props} />;
};

export default MenuController;
