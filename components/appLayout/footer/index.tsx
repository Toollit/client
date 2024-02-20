import React, { useCallback } from 'react';
import Link from 'next/link';
import { InnerContainer } from '@/styles/commons';
import {
  AsideArea,
  ContactContainer,
  Container,
  CorpArea,
  DeveloperContainer,
  NoticeArea,
  PartnersContainer,
} from './styles';

const Footer = () => {
  const handleServiceUnavailable = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      alert('서비스 준비 중입니다.');
    },
    [],
  );

  return (
    <Container>
      <InnerContainer>
        <NoticeArea>
          <Link href='/notice'>공지사항</Link>
        </NoticeArea>

        <AsideArea>
          <PartnersContainer>
            <h3>Partners</h3>
            <Link href={'#'} onClick={handleServiceUnavailable}>
              비즈니스 · 광고
            </Link>
          </PartnersContainer>
          <DeveloperContainer>
            <h3>Developer</h3>
            <Link
              href='https://github.com/seungwonleee'
              target='_blank'
              rel='noopener noreferrer'
            >
              Github
            </Link>
            <Link
              href='https://seungwon-code.blogspot.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Blog
            </Link>
          </DeveloperContainer>
          <ContactContainer>
            <h3>Contact</h3>
            <Link
              href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
            </Link>
          </ContactContainer>
        </AsideArea>

        <CorpArea>
          <ul>
            <li>
              <Link href={'#'} onClick={handleServiceUnavailable}>
                제휴제안
              </Link>
            </li>
            <li>
              <Link href={'/policy/terms-of-service'}>이용약관</Link>
            </li>
            <li>
              <Link href={'/policy/privacy'}>개인정보처리방침</Link>
            </li>

            <li>
              <Link href={'/faq'}>FAQ</Link>
            </li>
            <li>ⓒ Toollit Corp.</li>
          </ul>
        </CorpArea>
      </InnerContainer>
    </Container>
  );
};

export default Footer;
