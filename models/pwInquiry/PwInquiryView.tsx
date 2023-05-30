import React from 'react';
import AppLayout from 'components/appLayout';
import { CloseBtn, SubmitBtn } from 'components/commons/button';
import Title from '@/components/commons/title';
import Input from '@/components/commons/input';
import InputError from '@/components/commons/error/InputError';
import LoadingCircularProgress from '@/components/commons/loading';
import {
  Container,
  Form,
  InputContainer,
  SignInBtn,
  SignInAccent,
} from './styles';

export interface PwInquiryViewProps {
  handleClose: () => void;
  email: string | null;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emailInvalidError: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSignUp: () => void;
  requestPending: boolean;
}

const PwInquiryView = ({
  handleClose,
  email,
  onChangeEmail,
  emailInvalidError,
  handleSubmit,
  handleSignUp,
  requestPending,
}: PwInquiryViewProps) => {
  return (
    <AppLayout nav={false}>
      <Container>
        <CloseBtn onClick={handleClose} />

        <Form onSubmit={handleSubmit}>
          <Title text='Getit 계정 찾기' />
          <InputContainer>
            <Input
              placeholder='이메일 주소를 입력해주세요.'
              onChange={onChangeEmail}
              value={email as string}
              focus={true}
            />
            {emailInvalidError && (
              <InputError text='올바른 이메일을 입력해 주세요.' />
            )}
          </InputContainer>

          <SubmitBtn text='확인' />
          <SignInBtn>
            계정이 없으신가요?{' '}
            <SignInAccent onClick={handleSignUp}>가입하기</SignInAccent>
          </SignInBtn>
        </Form>
      </Container>
      {requestPending && <LoadingCircularProgress />}
    </AppLayout>
  );
};

export default PwInquiryView;
