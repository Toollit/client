import React from 'react';
import AppLayout from 'components/appLayout';
import { CloseBtn, DisabledBtn } from 'components/commons/button';
import { SubmitBtn } from 'components/commons/button';
import Title from 'components/commons/title';
import Input from 'components/commons/input';
import {
  Container,
  Form,
  InputContainer,
  ErrorMessage,
  NoticeForSpam,
  Timer,
} from './styles';

export interface EmailAuthViewProps {
  handleClose: () => void;
  inputAuthNums: string | null;
  onChangeInputAuthNums: (event: React.ChangeEvent<HTMLInputElement>) => void;
  invalidAuthNumsError: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  timer: string;
  authNums: string;
}

const EmailAuthView = ({
  handleClose,
  inputAuthNums,
  onChangeInputAuthNums,
  invalidAuthNumsError,
  handleSubmit,
  timer,
  authNums,
}: EmailAuthViewProps) => {
  return (
    <AppLayout nav={false}>
      <Container>
        <CloseBtn onClick={handleClose} />

        <Form onSubmit={handleSubmit}>
          <Title text='Getit 이메일 계정 인증' />

          <InputContainer>
            <Input
              type='text'
              placeholder='인증번호'
              onChange={onChangeInputAuthNums}
              value={inputAuthNums as string}
            />
            {invalidAuthNumsError && (
              <ErrorMessage>인증번호가 일치하지 않습니다.</ErrorMessage>
            )}
            <Timer>인증기한 {timer}</Timer>
          </InputContainer>

          <NoticeForSpam>
            메일이 전송되지 않았다면 스팸메일함을 확인해 주세요.
          </NoticeForSpam>
          <br />

          {authNums ? <SubmitBtn text='확인' /> : <DisabledBtn text='확인' />}
        </Form>
      </Container>
    </AppLayout>
  );
};

export default EmailAuthView;
