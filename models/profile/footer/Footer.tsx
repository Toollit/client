import React from 'react';
import Link from 'next/link';
import { LogInOut, MyProfileLink, Container, LogoLink } from './styles';

interface ProfileFooterLink {
  isMyProfile: boolean;
  userNickname?: string | null;
  isLogin?: string | null;
  handleLogInOut: () => void;
}

const ProfileFooterLink = ({
  isMyProfile,
  userNickname,
  isLogin,
  handleLogInOut,
}: ProfileFooterLink) => {
  return (
    <Container>
      <ul>
        <li>
          {isMyProfile ? (
            <LogInOut onClick={handleLogInOut}>
              {isLogin ? '로그아웃' : '로그인'}
            </LogInOut>
          ) : (
            <MyProfileLink
              href={userNickname ? `/profile/${userNickname}` : '/login'}
            >
              내프로필
            </MyProfileLink>
          )}
        </li>
        <li>
          <Link href={'/'}>고객센터</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href={'/policy/terms-of-service'}>이용약관</Link>
        </li>

        <li>
          <Link href={'/policy/privacy'}>개인정보처리방침</Link>
        </li>
      </ul>
      <ul>
        <li>
          <LogoLink href={'/'}>Toollit</LogoLink>
        </li>
      </ul>
    </Container>
  );
};

export default ProfileFooterLink;
