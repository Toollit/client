import React from 'react';
import AppLayout from '@/components/appLayout';
import { Button } from '@/components/commons/button';
import Title from '@/components/commons/title';
import Input from '@/components/commons/input';
import Block from '@/components/commons/block';
import { Form, InputContainer, NoticeForSpam, Timer } from './styles';

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
    <AppLayout type='close' onClick={handleClose} boundary={false}>
      <Form onSubmit={handleSubmit}>
        <Block paddingLeft={1.5} paddingRight={1.5}>
          <Title text='Getit 이메일 계정 인증' />
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5}>
          <InputContainer>
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
          </InputContainer>
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5} paddingTop={2}>
          <NoticeForSpam>
            메일이 전송되지 않았다면 스팸메일함을 확인해 주세요.
          </NoticeForSpam>
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5} paddingTop={4}>
          {isTimerLeft ? (
            <Button type='submit' text='확인' />
          ) : (
            <Button type='disabled' text='확인' />
          )}
        </Block>
      </Form>
    </AppLayout>
  );
};

export default EmailAuthView;
