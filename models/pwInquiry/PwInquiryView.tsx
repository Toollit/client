import React, { FC } from 'react';
import AppLayout from '@/components/appLayout';
import { Button } from '@/components/button';
import Title from '@/components/title';
import Input from '@/components/input';
import InputError from '@/components/error/InputError';
import {
  EmailInputContainer,
  Form,
  InputContainer,
  SignInInduce,
  SignInInduceContainer,
  SignUpLink,
  SubmitButtonContainer,
  TitleContainer,
} from './styles';

export interface ViewProps {
  handleClose: () => void;
  email: string | null;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emailInvalidError: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  inputRef: React.ForwardedRef<HTMLInputElement>;
}

const PwInquiryView: FC<ViewProps> = ({
  handleClose,
  email,
  onChangeEmail,
  emailInvalidError,
  handleSubmit,
  inputRef,
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
          <Title text='Toollit 계정 찾기' />
        </TitleContainer>

        <EmailInputContainer>
          <InputContainer>
            <Input
              placeholder='이메일 주소를 입력해주세요.'
              onChange={onChangeEmail}
              value={email as string}
              focus={true}
              ref={inputRef}
            />
            {emailInvalidError && (
              <InputError text='올바른 이메일을 입력해 주세요.' />
            )}
          </InputContainer>
        </EmailInputContainer>

        <SubmitButtonContainer>
          <Button type='submit' text='확인' />
        </SubmitButtonContainer>

        <SignInInduceContainer>
          <SignInInduce>계정이 없으신가요?</SignInInduce>
          <SignUpLink href={'/signUp'}>가입하기</SignUpLink>
        </SignInInduceContainer>
      </Form>
    </AppLayout>
  );
};

export default PwInquiryView;
