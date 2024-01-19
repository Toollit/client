import React from 'react';
import Link from 'next/link';
import { LogInOut, MyProfileLink, Container, LogoLink } from './styles';

interface ProfileFooterLink {
  me: boolean;
  accessUser: string | null;
  loginState?: string | null;
  handleLogInOut: () => void;
}

const ProfileFooterLink = ({
  me,
  accessUser,
  loginState,
  handleLogInOut,
}: ProfileFooterLink) => {
  return (
    <Container>
      <ul>
        <li>
          {me ? (
            <LogInOut onClick={handleLogInOut}>
              {loginState ? '로그아웃' : '로그인'}
            </LogInOut>
          ) : (
            <MyProfileLink
              href={accessUser ? `/profile/${accessUser}` : '/login'}
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
