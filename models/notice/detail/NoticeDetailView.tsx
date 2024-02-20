import React from 'react';
import {
  Content,
  Header,
  InputBox,
  SearchForm,
  SearchIcon,
  SubTitle,
  Table,
  TableBody,
  TableHeaderRight,
  TableHeader,
  TableHeaderLeft,
} from './styles';
import { Notice } from './NoticeDetailController';
import AppLayout from '@/components/appLayout';
import { InnerContainer } from '@/styles/commons';
import Title from '@/components/title';
import Link from 'next/link';

export interface NoticeDetailViewProps {
  data?: Notice;
}

const NoticeDetailView = ({ data }: NoticeDetailViewProps) => {
  return (
    <AppLayout type='default'>
      <InnerContainer>
        <Header>
          <Title text='공지사항' />
          <SubTitle>
            <p>
              Toollit 서비스 <span>이용</span> 및 <span>업데이트 소식</span>을
              알려드립니다!
            </p>
          </SubTitle>
        </Header>

        <SearchForm onSubmit={() => {}}>
          <InputBox>
            <input type='text' placeholder='제목, 내용' ref={() => {}} />
            <button>
              <SearchIcon fontSize='inherit' />
            </button>
          </InputBox>
        </SearchForm>

        <Content>
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderLeft>제목</TableHeaderLeft>
                <TableHeaderRight>{data?.title}</TableHeaderRight>
              </tr>
            </TableHeader>
            <TableBody>
              <tr>
                <td colSpan={2}>
                  {data?.content.map((text, index) => (
                    <p key={`${text}-${index}`}>{text ? text : <br />}</p>
                  ))}
                </td>
              </tr>
            </TableBody>
          </Table>
        </Content>
      </InnerContainer>
    </AppLayout>
  );
};

export default NoticeDetailView;
