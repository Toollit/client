import React from 'react';
import AppLayout from '@/components/appLayout';
import { CenterLayoutContainer } from '@/styles/commons';
import Title from '@/components/commons/title';
import Block from '@/components/commons/block';
import {
  Container,
  InputBox,
  SearchForm,
  SearchIcon,
  SubTitle,
} from './styles';

export interface NoticeViewProps {}

const NoticeView = ({}: NoticeViewProps) => {
  return (
    <AppLayout type='default'>
      <CenterLayoutContainer>
        <Block paddingLeft={1.5} paddingRight={1.5}>
          <Title text='공지사항' />
          <SubTitle>
            <p>
              Getit 서비스 <span>이용</span> 및 <span>업데이트 소식</span>을
              알려드립니다!
            </p>
          </SubTitle>
        </Block>

        {/* Notice search input */}
        <Block
          paddingLeft={1.5}
          paddingRight={1.5}
          paddingTop={2}
          paddingBottom={2}
        >
          <SearchForm>
            <InputBox>
              <input type='text' placeholder='제목, 내용' />
              <button>
                <SearchIcon fontSize='inherit' />
              </button>
            </InputBox>
          </SearchForm>
        </Block>

        {/* Notice list or search result */}
        <Container>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
          </ul>
        </Container>
      </CenterLayoutContainer>
    </AppLayout>
  );
};

export default NoticeView;
