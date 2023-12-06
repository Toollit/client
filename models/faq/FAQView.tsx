import React from 'react';
import AppLayout from '@/components/appLayout';
import { InnerContainer } from '@/styles/commons';
import Title from '@/components/commons/title';
import {
  ChangeEmailCategory,
  ChangeEmailInfo,
  Content,
  FAQFooter,
  Header,
  InputBox,
  Inquiry,
  MUIAccordion,
  MUIAccordionDetails,
  MUIAccordionSummary,
  MUIExpandMoreIcon,
  SearchForm,
  SearchIcon,
  SubTitle,
  Table,
  TableBody,
  TableHeader,
  TableTitle,
} from './styles';

export interface FAQViewProps {
  handleSearchFAQ: (e: React.KeyboardEvent<HTMLFormElement>) => void;
  SearchInputRef: React.RefObject<HTMLInputElement>;
}

const FAQView = ({ handleSearchFAQ, SearchInputRef }: FAQViewProps) => {
  return (
    <AppLayout type='default'>
      <InnerContainer>
        <Header>
          <Title text='자주 묻는 질문' />
          <SubTitle>
            <p>궁금하신 내용을 확인해 보세요!</p>
          </SubTitle>
        </Header>

        <SearchForm onSubmit={handleSearchFAQ}>
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
                <TableTitle>
                  자주 묻는 질문 <span>Top 4</span>
                </TableTitle>
              </tr>
            </TableHeader>
            <TableBody>
              <tr>
                <td>
                  <MUIAccordion>
                    <MUIAccordionSummary
                      expandIcon={<MUIExpandMoreIcon />}
                      aria-controls='panel1a-content'
                      id='panel1a-header'
                    >
                      <p>Q. 비밀번호를 여러번 틀려서 로그인이 불가해요.</p>
                    </MUIAccordionSummary>
                    <MUIAccordionDetails>
                      <p>
                        비밀번호를 5회 이상 틀린 경우 비밀번호 찾기를 통해 임시
                        비밀번호를 재발급 받아 비밀번호를 재설정하시기 바랍니다.
                      </p>
                      <br />
                      <p>
                        바로 이전과 동일한 비밀번호로의 변경은 불가할 수
                        있습니다.
                      </p>
                    </MUIAccordionDetails>
                  </MUIAccordion>
                </td>
              </tr>
              <tr>
                <td>
                  <MUIAccordion>
                    <MUIAccordionSummary
                      expandIcon={<MUIExpandMoreIcon />}
                      aria-controls='panel2a-content'
                      id='panel2a-header'
                    >
                      <p>Q. 서비스를 탈퇴하고 싶어요.</p>
                    </MUIAccordionSummary>
                    <MUIAccordionDetails>
                      <p>
                        <strong>
                          탈퇴하시기 전에 아래 내용을 꼭 확인해 주세요.
                        </strong>
                      </p>
                      <br />
                      <p>
                        탈퇴 시 계정 정보는 완전히 소멸되며 복구가 불가해요.
                      </p>
                      <br />
                      <p>
                        탈퇴를 하더라도 일정 기간 동안은 사용자의 활동 내역과
                        관련된 기록은 부정 사용 추적을 위해 관리될 수 있어요.
                      </p>
                      <br />
                      <p>
                        주의 사항을 모두 확인하셨다면
                        <strong> [내 프로필 페이지]</strong>&rarr;
                        <strong> [하단 오른쪽]</strong>&rarr;
                        <strong> [탈퇴하기]</strong>를 통해 탈퇴할 수 있어요.
                      </p>
                      <br />
                      <p>
                        탈퇴 요청 시 회원님의 이메일 계정 또는 구글 소셜
                        로그인으로 제공된 이메일로 탈퇴 승인 메일이 발송되며,
                        해당 메일에서 승인해 주시면 탈퇴가 완료돼요.
                      </p>
                      <br />
                      <p>
                        가입하신 이메일이 유효하지 않거나 Getit 발신 이메일이
                        스팸으로 처리된 경우 탈퇴 승인 메일 확인이 불가해요.
                        이럴 경우 <Inquiry>[문의 하기]</Inquiry>를 통해 연락
                        주세요.
                      </p>
                    </MUIAccordionDetails>
                  </MUIAccordion>
                </td>
              </tr>
              <tr>
                <td>
                  <MUIAccordion>
                    <MUIAccordionSummary
                      expandIcon={<MUIExpandMoreIcon />}
                      aria-controls='panel3a-content'
                      id='panel3a-header'
                    >
                      <p>Q. 이메일 계정을 변경하고 싶어요.</p>
                    </MUIAccordionSummary>
                    <MUIAccordionDetails>
                      <p>
                        <ChangeEmailCategory>
                          다른 이메일 주소로 변경하고 싶을 경우 방법은 아래와
                          같아요.
                        </ChangeEmailCategory>
                      </p>
                      <ChangeEmailInfo>
                        현재 개발 진행중입니다. 조금만 더 기다려주세요!
                      </ChangeEmailInfo>
                      <p>
                        <ChangeEmailCategory>
                          구글 소셜 계정을 일반 이메일로 전환하고 싶을 경우
                          방법은 아래와 같아요.
                        </ChangeEmailCategory>
                      </p>
                      <ChangeEmailInfo>
                        현재 개발 진행중입니다. 조금만 더 기다려주세요!
                      </ChangeEmailInfo>
                    </MUIAccordionDetails>
                  </MUIAccordion>
                </td>
              </tr>
              <tr>
                <td>
                  <MUIAccordion>
                    <MUIAccordionSummary
                      expandIcon={<MUIExpandMoreIcon />}
                      aria-controls='panel4a-content'
                      id='panel4a-header'
                    >
                      <p>
                        Q. 프로젝트 참가(신청)를 했는데 프로필 페이지에 참가
                        목록(신청 목록) 없어졌어요.
                      </p>
                    </MUIAccordionSummary>
                    <MUIAccordionDetails>
                      <p>
                        프로젝트 게시글 작성자가 게시글을 삭제할 경우 신청내역과
                        목록이 같이 삭제됩니다.
                      </p>
                    </MUIAccordionDetails>
                  </MUIAccordion>
                </td>
              </tr>
            </TableBody>
          </Table>
        </Content>

        <FAQFooter>
          원하는 답변을 찾지 못하셨나요?
          <br />
          그럼 <Inquiry>‘문의하기’</Inquiry>를 통해 직접 문의 해주세요.
          <br />
          최대한 빠르게 이메일로 답변드리겠습니다.
        </FAQFooter>
      </InnerContainer>
    </AppLayout>
  );
};

export default FAQView;
