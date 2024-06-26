import React, { FC } from 'react';
import AppLayout from 'components/appLayout';
import { Button } from '@/components/button';
import Title from '@/components/title';
import Input from '@/components/input';
import InputError from '@/components/error/InputError';
import Link from 'next/link';
import {
  EmailPasswordInputContainer,
  Form,
  InputContainer,
  Notice,
  SubmitButtonContainer,
  TitleContainer,
} from './styles';

export interface ViewProps {
  handleClose: () => void;
  email: string | null;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emailInvalidError: boolean;
  password: string | null;
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordRestrictionError: boolean;
  passwordCheck: string | null;
  onChangePasswordCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordMismatchError: boolean;
  fillFormComplete: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  emailInputRef: React.ForwardedRef<HTMLInputElement>;
  passwordInputRef: React.ForwardedRef<HTMLInputElement>;
  passwordCheckInputRef: React.ForwardedRef<HTMLInputElement>;
}

const SignupView: FC<ViewProps> = ({
  handleClose,
  email,
  onChangeEmail,
  emailInvalidError,
  password,
  onChangePassword,
  passwordRestrictionError,
  passwordCheck,
  onChangePasswordCheck,
  passwordMismatchError,
  fillFormComplete,
  handleSubmit,
  emailInputRef,
  passwordInputRef,
  passwordCheckInputRef,
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
          <Title text='Toollit 계정을 생성하세요' />
        </TitleContainer>

        <EmailPasswordInputContainer>
          <InputContainer>
            <Input
              placeholder='이메일'
              onChange={onChangeEmail}
              value={email as string}
              focus={true}
              ref={emailInputRef}
            />
            {emailInvalidError && (
              <InputError text='올바른 이메일을 입력해 주세요.' />
            )}
          </InputContainer>

          <InputContainer>
            <Input
              type='password'
              placeholder='비밀번호'
              onChange={onChangePassword}
              value={password as string}
              focus={true}
              ref={passwordInputRef}
            />
            {passwordRestrictionError && (
              <InputError text='영문자, 숫자, 특수문자 조합 8 ~ 20자리' />
            )}
          </InputContainer>

          <InputContainer>
            <Input
              type='password'
              placeholder='비밀번호 확인'
              onChange={onChangePasswordCheck}
              value={passwordCheck as string}
              focus={true}
              ref={passwordCheckInputRef}
            />
            {passwordMismatchError && (
              <InputError text='비밀번호가 일치하지 않습니다.' />
            )}
          </InputContainer>
        </EmailPasswordInputContainer>

        <SubmitButtonContainer>
          {fillFormComplete ? (
            <Button type='submit' text='다음' />
          ) : (
            <Button type='disabled' text='다음' />
          )}
        </SubmitButtonContainer>

        <Notice>
          가입하면 쿠키 사용을 포함해{' '}
          <Link href={'/policy/terms-of-service'}>이용약관</Link> 및{' '}
          <Link href={'/policy/privacy'}>개인정보 처리방침</Link> 에 동의하게
          됩니다. Toollit은 계정을 안전하게 보호하고 광고를 포함한 맞춤 서비스를
          제공하는 등 Toollit 개인정보 처리방침에 명시된 목적을 위해 이메일 주소
          정보를 사용할 수 있습니다.{' '}
          <Link href={'/policy/privacy'}>자세히 알아보기.</Link>
        </Notice>
      </Form>
    </AppLayout>
  );
};

export default SignupView;
