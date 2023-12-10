import React from 'react';
import AppLayout from '@/components/appLayout';
import { Button } from '@/components/commons/button';
import Title from '@/components/commons/title';
import Input from '@/components/commons/input';
import {
  Form,
  AuthCodeInputContainer,
  Notice,
  Timer,
  TitleContainer,
  SubmitButtonContainer,
} from './styles';

export interface EmailAuthViewProps {
  handleClose: () => void;
  authCode: string | null;
  handleChangeAuthCode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  timer: string;
  isTimerLeft: boolean;
  authCodeInputRef: React.ForwardedRef<HTMLInputElement>;
}

const EmailAuthView = ({
  handleClose,
  authCode,
  handleChangeAuthCode,
  handleSubmit,
  timer,
  isTimerLeft,
  authCodeInputRef,
}: EmailAuthViewProps) => {
  return (
    <AppLayout
      type='close'
      handleClose={handleClose}
      boundary={false}
      footer={false}
    >
      <Form onSubmit={handleSubmit}>
        <TitleContainer>
          <Title text='Getit 이메일 계정 인증' />
        </TitleContainer>

        <AuthCodeInputContainer>
          <Input
            type='text'
            placeholder='인증번호'
            onChange={handleChangeAuthCode}
            value={authCode as string}
            focus={true}
            ref={authCodeInputRef}
            inputMode='numeric'
          />
          <Timer>인증기한 {timer}</Timer>
        </AuthCodeInputContainer>

        <Notice>메일이 전송되지 않았다면 스팸메일함을 확인해 주세요.</Notice>

        <SubmitButtonContainer>
          {isTimerLeft ? (
            <Button type='submit' text='확인' />
          ) : (
            <Button type='disabled' text='확인' />
          )}
        </SubmitButtonContainer>
      </Form>
    </AppLayout>
  );
};

export default EmailAuthView;
