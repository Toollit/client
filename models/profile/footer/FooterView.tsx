import React, { FC } from 'react';
import Link from 'next/link';
import { SignInOut, MyProfileLink, Container, LogoLink } from './styles';

export interface ViewProps {
  isMyProfile: boolean;
  handleSignInOut: () => void;
  signInOutText: string;
  myProfileLink: string;
  noticeLink: string;
  privacyLink: string;
  termsOfServiceLink: string;
  logoLink: string;
}

const FooterView: FC<ViewProps> = ({
  isMyProfile,
  handleSignInOut,
  signInOutText,
  myProfileLink,
  noticeLink,
  privacyLink,
  termsOfServiceLink,
  logoLink,
}) => {
  return (
    <Container>
      <ul>
        <li>
          {isMyProfile ? (
            <SignInOut onClick={handleSignInOut}>{signInOutText}</SignInOut>
          ) : (
            <MyProfileLink href={myProfileLink}>내프로필</MyProfileLink>
          )}
        </li>
        <li>
          <Link href={noticeLink}>공지사항</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href={privacyLink}>개인정보처리방침</Link>
        </li>
        <li>
          <Link href={termsOfServiceLink}>이용약관</Link>
        </li>
      </ul>
      <ul>
        <li>
          <LogoLink href={logoLink}>Toollit</LogoLink>
        </li>
      </ul>
    </Container>
  );
};

export default FooterView;
