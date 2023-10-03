import React from 'react';
import Block from '@/components/commons/block';
import {
  AsideArea,
  CenterContainer,
  Container,
  CorpArea,
  NoticeArea,
} from './styles';

const Footer = () => {
  return (
    <Container>
      <CenterContainer>
        <Block paddingLeft={1.5} paddingRight={1.5} paddingTop={2}>
          <NoticeArea>공지사항</NoticeArea>
        </Block>
        <Block paddingLeft={1.5} paddingRight={1.5} paddingTop={2}>
          <AsideArea>
            <div>Creators</div>
            <div>Partners</div>
          </AsideArea>
        </Block>
        <Block paddingLeft={1.5} paddingRight={1.5} paddingTop={2}>
          <CorpArea>
            <ul>
              <li>회사소개</li>
              <li>인재채용</li>
              <li>제휴제한</li>
              <li>이용약관</li>
              <li>개인정보처리방침</li>
              <li>Getit 정책</li>
              <li>고객센터</li>
              <li>ⓒ Getit Corp.</li>
            </ul>
          </CorpArea>
        </Block>
      </CenterContainer>
    </Container>
  );
};

export default Footer;
