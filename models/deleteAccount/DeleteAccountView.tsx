import React from 'react';
import AppLayout from '@/components/appLayout';
import { InnerContainer } from '@/styles/commons';
import Title from '@/components/title';
import Input from '@/components/input';
import { Button } from '@/components/button';
import {
  ButtonContainer,
  CheckList,
  Content,
  DropoutAgreeCheckBox,
  DropoutAgreeContainer,
  DropoutAgreeLabel,
  Header,
  SubTitle,
} from './styles';

export interface DeleteAccountViewProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteAgree: boolean;
  handleDeleteAgree: () => void;
  isFormValid: boolean;
}

const DeleteAccountView = ({
  handleSubmit,
  deleteAgree,
  handleDeleteAgree,

  isFormValid,
}: DeleteAccountViewProps) => {
  return (
    <AppLayout type='default'>
      <InnerContainer>
        <Header>
          <Title text='탈퇴 안내' />
          <SubTitle>
            회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요.
          </SubTitle>
        </Header>

        <Content>
          <ul>
            <CheckList>
              1. 탈퇴 후 회원정보 관련 내역은 모두 삭제되며, 삭제된 데이터는
              복구되지 않습니다. 단, 탈퇴 후 일정 기간 동안 사용자의 활동 내역과
              관련된 기록은 부정 사용 추적을 위해 관리될 수 있습니다.
            </CheckList>

            <CheckList>
              2. 탈퇴 후 동일한 메일 또는 소셜 계정으로 재가입이 가능하나,
              탈퇴한 계정과 연동되지 않습니다.
            </CheckList>

            <CheckList>
              3. 탈퇴 후 부정 사용이 적발될 경우 재가입이 불가할 수 있으며,
              가입하더라도 이후 탈퇴될 수 있습니다.
            </CheckList>

            <CheckList>
              4. 탈퇴 요청 후 회원님의 이메일 계정 또는 구글 소셜 로그인으로
              제공된 이메일 주소로 탈퇴 승인 이메일이 발송되며, 해당 이메일을
              통해 인증하면 회원 탈퇴가 완료됩니다.
            </CheckList>
          </ul>

          <form onSubmit={handleSubmit}>
            <DropoutAgreeContainer>
              <DropoutAgreeCheckBox
                type='checkbox'
                name='deleteAgree'
                id='deleteAgree'
                checked={deleteAgree}
                onChange={handleDeleteAgree}
              />
              <DropoutAgreeLabel htmlFor='deleteAgree'>
                안내 사항을 모두 확인하였으며, 이에 동의합니다.
              </DropoutAgreeLabel>
            </DropoutAgreeContainer>

            <ButtonContainer>
              {isFormValid ? (
                <Button type='submit' text='탈퇴하기' />
              ) : (
                <Button type='disabled' text='탈퇴하기' />
              )}
            </ButtonContainer>
          </form>
        </Content>
      </InnerContainer>
    </AppLayout>
  );
};

export default DeleteAccountView;
