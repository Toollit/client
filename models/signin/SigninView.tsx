import React, { FC } from 'react';
import AppLayout from '@/components/appLayout';
import { GoogleIcon, GithubIcon } from '@/assets/icons';
import { Button } from '@/components/button';
import Title from '@/components/title';
import Divider from '@/components/divider';
import Input from '@/components/input';
import {
  DividerContainer,
  Form,
  InputContainer,
  PasswordInputContainer,
  SubmitButtonContainer,
  SearchPasswordButtonContainer,
  SignInContainer,
  SignInInduce,
  SocialSigninButtonContainer,
  SignupLink,
  TitleContainer,
  IdPasswordInputContainer,
} from './styles';

export interface ViewProps {
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
  handleSocialSignin: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SigninView: FC<ViewProps> = ({
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
  handleSocialSignin,
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
          <Title text='Toollit 로그인' />
        </TitleContainer>

        <SocialSigninButtonContainer>
          <Button
            type='normal'
            text='Google 계정으로 로그인'
            icon={<GoogleIcon width={3.5} height={3.5} />}
            name='google'
            onClick={handleSocialSignin}
          />

          <Button
            type='normal'
            text='Github 계정으로 로그인'
            icon={<GithubIcon width={3.5} height={3.5} />}
            name='github'
            onClick={handleSocialSignin}
          />
        </SocialSigninButtonContainer>

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
          <SignupLink href={'/signup'}>가입하기</SignupLink>
        </SignInContainer>
      </Form>
    </AppLayout>
  );
};

export default SigninView;
