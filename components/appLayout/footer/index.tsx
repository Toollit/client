import React from 'react';
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
  return (
    <Container>
      <InnerContainer>
        <NoticeArea>
          <Link href=''>
            <a>공지사항</a>
          </Link>
        </NoticeArea>

        <AsideArea>
          <PartnersContainer>
            <h3>Partners</h3>
            <Link href=''>
              <a>비즈니스 · 광고</a>
            </Link>
          </PartnersContainer>
          <DeveloperContainer>
            <h3>Developer</h3>
            <Link href=''>
              <a>Github</a>
            </Link>
            <Link href=''>
              <a>Blog</a>
            </Link>
          </DeveloperContainer>
        </AsideArea>

        <CorpArea>
          <ul>
            <li>
              <Link href={''}>
                <a>회사소개</a>
              </Link>
            </li>
            {/* <li>인재채용</li> */}
            <li>
              <Link href={''}>
                <a>제휴제안</a>
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
              <Link href={''}>
                <a>Getit 정책</a>
              </Link>
            </li>
            <li>
              <Link href={''}>
                <a>고객센터</a>
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
