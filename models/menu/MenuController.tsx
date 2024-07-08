import React, { FC, useCallback, useEffect, useState } from 'react';
import MenuView, { ViewProps } from './MenuView';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';
import {
  AccountCircleIcon,
  AdminPanelSettingsIcon,
  ArticleIcon,
  BookmarkIcon,
  CampaignIcon,
  LiveHelpIcon,
  LogoutIcon,
  MouseIcon,
  NotificationsIcon,
} from '@/assets/icons';

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
  const { user } = useAuth();
  const { logout } = useLogout();

  const [menu, setMenu] = useState<MenuItem[]>([]);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const handleUserSession = useCallback(async () => {
    if (user?.nickname) {
      await logout({ push: '/' });
    }

    if (!user?.nickname) {
      router.push('/signin');
    }
  }, [router, logout, user]);

  useEffect(() => {
    setMenu([
      {
        tag: 'profile',
        icon: <AccountCircleIcon width={4} height={4} />,
        text: '내 프로필',
        url: user?.nickname ? `/profile/${user?.nickname}` : '/signin',
      },
      {
        tag: 'project',
        icon: <ArticleIcon width={4} height={4} />,
        text: '내 프로젝트',
        url: user?.nickname
          ? `/profile/${user?.nickname}?tab=viewProjects`
          : '/signin',
      },
      {
        tag: 'bookmark',
        icon: <BookmarkIcon width={4} height={4} />,
        text: '내 북마크',
        url: user?.nickname
          ? `/profile/${user?.nickname}?tab=viewBookmarks`
          : '/signin',
      },
      {
        tag: 'notification',
        icon: <NotificationsIcon width={4} height={4} />,
        text: '알림',
        url: user?.nickname
          ? `/profile/${user?.nickname}?tab=viewNotifications`
          : '/signin',
      },
      {
        tag: 'notice',
        icon: <CampaignIcon width={4} height={4} />,
        text: '공지사항',
        url: '/notice',
      },
      {
        tag: 'terms-of-service',
        icon: <MouseIcon width={4} height={4} />,
        text: '이용약관',
        url: '/policy/terms-of-service',
      },
      {
        tag: 'privacy',
        icon: <AdminPanelSettingsIcon width={4} height={4} />,
        text: '개인정보처리방침',
        url: '/policy/privacy',
      },
      {
        tag: 'faq',
        icon: <LiveHelpIcon width={4} height={4} />,
        text: 'FAQ',
        url: '/faq',
      },
      {
        tag: 'auth',
        icon: <LogoutIcon width={4} height={4} />,
        text: user?.nickname ? '로그아웃' : '로그인',
        url: user?.nickname ? '#' : '/signin',
        handler: handleUserSession,
      },
    ]);
  }, [user, handleUserSession]);

  const props: ViewProps = {
    handleClose,
    menu,
  };

  return <MenuView {...props} />;
};

export default MenuController;
