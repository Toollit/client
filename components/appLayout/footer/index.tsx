import React, { useCallback } from 'react';
import Link from 'next/link';
import { InnerContainer } from '@/styles/commons';
import {
  AsideArea,
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
          <Link href='/notice'>
            <a>공지사항</a>
          </Link>
        </NoticeArea>

        <AsideArea>
          <PartnersContainer>
            <h3>Partners</h3>
            <Link href={'#'}>
              <a onClick={handleServiceUnavailable}>비즈니스 · 광고</a>
            </Link>
          </PartnersContainer>
          <DeveloperContainer>
            <h3>Developer</h3>
            <Link href='https://github.com/seungwonleee'>
              <a target='_blank' rel='noopener noreferrer'>
                Github
              </a>
            </Link>
            <Link href='https://seungwon-code.blogspot.com/'>
              <a target='_blank' rel='noopener noreferrer'>
                Blog
              </a>
            </Link>
          </DeveloperContainer>
        </AsideArea>

        <CorpArea>
          <ul>
            <li>
              <Link href={'#'}>
                <a onClick={handleServiceUnavailable}>제휴제안</a>
              </Link>
            </li>
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

            <li>
              <Link href={'/faq'}>
                <a>FAQ</a>
              </Link>
            </li>
            <li>ⓒ Getit Corp.</li>
          </ul>
        </CorpArea>
      </InnerContainer>
    </Container>
  );
};

export default Footer;
