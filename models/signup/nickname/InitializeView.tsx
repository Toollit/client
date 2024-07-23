import React, { FC } from 'react';
import AppLayout from '@/components/appLayout';
import Input from '@/components/input';
import Title from '@/components/title';
import { Button } from '@/components/button';
import {
  Form,
  TitleContainer,
  NicknameInputContainer,
  NoticeContainer,
  SubmitButtonContainer,
} from './styles';

export interface ViewProps {
  handleClose: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  nickname: string;
  handleNickname: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nicknameInputRef: React.ForwardedRef<HTMLInputElement>;
}

const InitializeView: FC<ViewProps> = ({
  handleClose,
  handleSubmit,
  nickname,
  handleNickname,
  nicknameInputRef,
}) => {
  return (
    <AppLayout
      type='close'
      handleClose={handleClose}
      boundary={false}
      footer={false}
    >
      <Form onSubmit={handleSubmit}>
        <TitleContainer>
          <Title text={'닉네임 설정'} />
        </TitleContainer>

        <NicknameInputContainer>
          <Input
            type={'text'}
            placeholder='닉네임'
            value={nickname}
            onChange={handleNickname}
            focus={true}
            ref={nicknameInputRef}
          />
        </NicknameInputContainer>

        <NoticeContainer>
          <b>회원가입이 완료되었습니다.</b>
          <p>닉네임 설정을 완료해야 서비스 이용이 가능합니다.</p>
          <p>{'\u273B'}&nbsp;최대 20자, 영어, 숫자 조합만 가능합니다.</p>
        </NoticeContainer>

        <SubmitButtonContainer>
          <Button type='submit' text='확인' />
        </SubmitButtonContainer>
      </Form>
    </AppLayout>
  );
};

export default InitializeView;
