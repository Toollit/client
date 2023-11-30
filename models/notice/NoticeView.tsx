import React from 'react';
import Link from 'next/link';
import { Notice } from './NoticeController';
import AppLayout from '@/components/appLayout';
import { InnerContainer } from '@/styles/commons';
import Title from '@/components/commons/title';
import {
  Content,
  Header,
  InputBox,
  SearchForm,
  SearchIcon,
  SubTitle,
  Table,
  TableBody,
  TableDate,
  TableHeader,
  TableTitle,
} from './styles';

export interface NoticeViewProps {
  handleSearchNotice: (e: React.KeyboardEvent<HTMLFormElement>) => void;
  SearchInputRef: React.RefObject<HTMLInputElement>;
  data: Notice[];
}

const NoticeView = ({
  handleSearchNotice,
  SearchInputRef,
  data,
}: NoticeViewProps) => {
  return (
    <AppLayout type='default'>
      <InnerContainer>
        <Header>
          <Title text='공지사항' />
          <SubTitle>
            <p>
              Getit 서비스 <span>이용</span> 및 <span>업데이트 소식</span>을
              알려드립니다!
            </p>
          </SubTitle>
        </Header>

        <SearchForm onSubmit={handleSearchNotice}>
          <InputBox>
            <input type='text' placeholder='제목, 내용' ref={SearchInputRef} />
            <button>
              <SearchIcon fontSize='inherit' />
            </button>
          </InputBox>
        </SearchForm>

        <Content>
          <Table>
            <TableHeader>
              <tr>
                <TableTitle>제목</TableTitle>
                <TableDate>작성일</TableDate>
              </tr>
            </TableHeader>
            <TableBody>
              {data.map((notice) => (
                <tr key={notice.title}>
                  <td>
                    <Link href={`/notice/${notice.id}`}>
                      <a>{notice.title}</a>
                    </Link>
                  </td>
                  <td>{notice.date}</td>
                </tr>
              ))}
            </TableBody>
          </Table>
        </Content>
      </InnerContainer>
    </AppLayout>
  );
};

export default NoticeView;
