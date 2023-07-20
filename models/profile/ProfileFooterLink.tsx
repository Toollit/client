import React from 'react';
import { LogInOut, FooterLink, FooterLogo } from './styles';
import Link from 'next/link';

interface ProfileFooterLink {
  loginState?: string | null;
  handleLogInOut: () => void;
}

const ProfileFooterLink = ({
  loginState,
  handleLogInOut,
}: ProfileFooterLink) => {
  return (
    <FooterLink>
      <ul>
        <li>
          <LogInOut onClick={handleLogInOut}>
            {loginState ? '로그아웃' : '로그인'}
          </LogInOut>
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
            <FooterLogo>Getit</FooterLogo>
          </Link>
        </li>
      </ul>
    </FooterLink>
  );
};

export default ProfileFooterLink;
