import React from 'react';
import Link from 'next/link';
import { LogInOut, MyProfile, Container, Logo } from './FooterStyles';

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
            <Link
              href={accessUser ? `/profile/${accessUser}` : '/login'}
              passHref
            >
              <MyProfile>내프로필</MyProfile>
            </Link>
          )}
        </li>
        <li>
          <Link href='/'>
            <a>고객센터</a>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href={'/policy/terms-of-service'}>
            <a>이용약관</a>
          </Link>
        </li>

        <li>
          <Link href={'/policy/privacy'}>
            <a>개인정보처리방침</a>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href='/' passHref>
            <Logo>Getit</Logo>
          </Link>
        </li>
      </ul>
    </Container>
  );
};

export default ProfileFooterLink;
