import React, { FC } from 'react';
import AppLayout from '@/components/appLayout';
import { InnerContainer } from '@/styles/commons';
import Title from '@/components/title';
import Link from 'next/link';
import {
  Content,
  FAQFooter,
  Header,
  InputBox,
  InquiryLink,
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

export interface ViewProps {
  handleSearchFAQ: (e: React.KeyboardEvent<HTMLFormElement>) => void;
  SearchInputRef: React.RefObject<HTMLInputElement>;
}

const FAQView: FC<ViewProps> = ({ handleSearchFAQ, SearchInputRef }) => {
  return (
    <AppLayout type='default'>
      <InnerContainer>
        <Header>
          <Title text='자주 묻는 질문' />
          <SubTitle>궁금하신 내용을 확인해 보세요!</SubTitle>
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
                  자주 묻는 질문 <span>Top 5</span>
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
                        비밀번호를 발급받아 비밀번호를 재설정하세요.
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
                      <p>Q. 이메일 계정을 변경하고 싶어요.</p>
                    </MUIAccordionSummary>
                    <MUIAccordionDetails>
                      <p>
                        <strong>
                          다른 이메일 주소로 변경하고 싶을 경우 방법은 아래와
                          같아요.
                        </strong>
                      </p>
                      <br />
                      <p>현재 개발 진행중입니다. 조금만 더 기다려주세요!</p>
                      <br />
                      <br />
                      <p>
                        <strong>
                          구글 소셜 계정을 일반 이메일로 전환하고 싶을 경우
                          방법은 아래와 같아요.
                        </strong>
                      </p>
                      <br />
                      <p>현재 개발 진행중입니다. 조금만 더 기다려주세요!</p>
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

              <tr>
                <td>
                  <MUIAccordion>
                    <MUIAccordionSummary
                      expandIcon={<MUIExpandMoreIcon />}
                      aria-controls='panel4a-content'
                      id='panel4a-header'
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
                        <strong> [왼쪽 하단]</strong>&rarr;
                        <strong> [탈퇴하기]</strong>를 통해 탈퇴할 수 있어요.
                      </p>
                      <br />
                      <p>
                        탈퇴 요청 시 회원님의 이메일 계정 또는 구글 소셜
                        로그인으로 제공된 이메일로 탈퇴 승인 메일이 발송되며,
                        해당 메일에서 승인해 주시면 탈퇴가 완료돼요.
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
                      aria-controls='panel5a-content'
                      id='panel5a-header'
                    >
                      <p>Q. 탈퇴 인증 이메일이 수신되지 않아요.</p>
                    </MUIAccordionSummary>
                    <MUIAccordionDetails>
                      <p>
                        &#39;메일 발송 완료! 메일을 통해 인증하면 회원 탈퇴가
                        완료됩니다.&#39;라는 메시지가 나왔다면 인증 메일이
                        발송된 상태입니다.
                      </p>
                      <br />
                      <p>
                        <strong>
                          1. 메일 전송 지연일 수 있으니 조금만 기다려 주세요.
                        </strong>
                      </p>
                      <br />
                      <p>
                        네트워크 상황이나 메일 수신 서버 사정에 따라 전송이
                        지연될 수 있습니다. 보통 5분 이내에 수신되지만, 길면
                        30분 ~ 최대 1일까지 지연될 수 있다는 점을 감안하여
                        메일함을 다시 확인해 주시기 바랍니다.
                      </p>
                      <br />
                      <br />
                      <p>
                        <strong>2. 메일 용량을 확인해 주세요.</strong>
                      </p>
                      <br />
                      <p>
                        메일 용량 제한이 초과되어 수신에 실패하는 경우가
                        있습니다. 용량 확보 후 다시 새 인증 메일을 수신해 주시기
                        바랍니다.
                      </p>
                      <br />
                      <br />
                      <p>
                        <strong>3. 스팸 메일함을 확인해 주세요.</strong>
                      </p>
                      <br />
                      <p>
                        종종 메일 수신은 되었으나 스팸 메일함으로 자동 분류되는
                        경우가 있습니다. 특정 단어를 스팸 분류 또는 수신 차단
                        설정해 두었는지도 확인해 주시기 바랍니다.
                      </p>
                      <br />
                      <br />
                      <p>
                        만약 이메일 주소를 사용하지 않는 상태라 인증이
                        불가능하다면 아이디 변경 후 탈퇴 과정을 다시 진행해
                        주시기 바랍니다.
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
          그럼 <InquiryLink href={'/contact'}>‘문의하기’</InquiryLink>
          를 통해 직접 문의 해주세요.
          <br />
          최대한 빠르게 이메일로 답변드리겠습니다.
        </FAQFooter>
      </InnerContainer>
    </AppLayout>
  );
};

export default FAQView;
