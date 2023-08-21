import React from 'react';
import AppLayout from '@/components/appLayout';
import { DisabledBtn } from '@/components/commons/button';
import { SubmitBtn } from '@/components/commons/button';
import Title from '@/components/commons/title';
import Input from '@/components/commons/input';
import LoadingCircularProgress from '@/components/commons/loading';
import { Form, InputContainer, NoticeForSpam, Timer } from './styles';

export interface EmailAuthViewProps {
  handleClose: () => void;
  authCode: string | null;
  handleChangeAuthCode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  timer: string;
  isTimerLeft: boolean;
  requestPending: boolean;
}

const EmailAuthView = ({
  handleClose,
  authCode,
  handleChangeAuthCode,
  handleSubmit,
  timer,
  isTimerLeft,
  requestPending,
}: EmailAuthViewProps) => {
  return (
    <AppLayout type='close' onClick={handleClose} boundary={false}>
      <Form onSubmit={handleSubmit}>
        <Title text='Getit 이메일 계정 인증' />

        <InputContainer>
          <Input
            type='text'
            placeholder='인증번호'
            onChange={handleChangeAuthCode}
            value={authCode as string}
            focus={true}
          />
          <Timer>인증기한 {timer}</Timer>
        </InputContainer>

        <NoticeForSpam>
          메일이 전송되지 않았다면 스팸메일함을 확인해 주세요.
        </NoticeForSpam>
        <br />

        {isTimerLeft ? <SubmitBtn text='확인' /> : <DisabledBtn text='확인' />}
      </Form>
      {requestPending && <LoadingCircularProgress />}
    </AppLayout>
  );
};

export default EmailAuthView;
