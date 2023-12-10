import React from 'react';
import AppLayout from '@/components/appLayout';
import { GoogleIcon, GithubIcon } from '@/assets/icons';
import { Button } from '@/components/commons/button';
import Title from '@/components/commons/title';
import Divider from '@/components/commons/divider';
import Input from '@/components/commons/input';
import Link from 'next/link';
import {
  DividerContainer,
  Form,
  InputContainer,
  PasswordInputContainer,
  SubmitButtonContainer,
  SearchPasswordButtonContainer,
  SignInContainer,
  SignInInduce,
  SocialLoginButtonContainer,
  StyledLink,
  TitleContainer,
  IdPasswordInputContainer,
} from './styles';

export interface LoginViewProps {
  handleClose: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  email: string;
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordInputRef: React.ForwardedRef<HTMLInputElement>;
  showPasswordInput: boolean;
  isFormValid: boolean;
  handlePwInquiryRouting: () => void;
  handleSocialLogin: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LoginView = ({
  handleClose,
  handleSubmit,
  email,
  handleEmail,
  password,
  handlePassword,
  passwordInputRef,
  showPasswordInput,
  isFormValid,
  handlePwInquiryRouting,
  handleSocialLogin,
}: LoginViewProps) => {
  return (
    <AppLayout
      type='close'
      handleClose={handleClose}
      boundary={false}
      footer={false}
    >
      <Form onSubmit={handleSubmit}>
        <TitleContainer>
          <Title text='Getit 로그인' />
        </TitleContainer>

        <SocialLoginButtonContainer>
          <Button
            type='normal'
            text='Google 계정으로 로그인'
            icon={<GoogleIcon width={3.5} height={3.5} />}
            name='google'
            onClick={handleSocialLogin}
          />

          <Button
            type='normal'
            text='Github 계정으로 로그인'
            icon={<GithubIcon width={3.5} height={3.5} />}
            name='github'
            onClick={handleSocialLogin}
          />
        </SocialLoginButtonContainer>

        <DividerContainer>
          <Divider type='text' text='또는' />
        </DividerContainer>

        <IdPasswordInputContainer>
          <InputContainer show={showPasswordInput}>
            <Input
              type='text'
              placeholder={'이메일 주소를 입력해주세요.'}
              onChange={handleEmail}
              value={email}
              focus={true}
              enterSubmit={true}
            />
            {showPasswordInput && (
              <PasswordInputContainer>
                <Input
                  type='password'
                  placeholder='비밀번호를 입력해주세요.'
                  onChange={handlePassword}
                  value={password}
                  ref={passwordInputRef}
                  focus={true}
                  enterSubmit={true}
                />
              </PasswordInputContainer>
            )}
          </InputContainer>
        </IdPasswordInputContainer>

        <SubmitButtonContainer>
          {isFormValid ? (
            <Button type='submit' text='확인' />
          ) : (
            <Button type='submit' text='다음' />
          )}
        </SubmitButtonContainer>

        <SearchPasswordButtonContainer>
          <Button
            type='normal'
            text='비밀번호를 잊으셨나요?'
            onClick={handlePwInquiryRouting}
          />
        </SearchPasswordButtonContainer>

        <SignInContainer>
          <SignInInduce>계정이 없으신가요?</SignInInduce>
          <Link href={'/signUp'} passHref>
            <StyledLink>가입하기</StyledLink>
          </Link>
        </SignInContainer>
      </Form>
    </AppLayout>
  );
};

export default LoginView;
