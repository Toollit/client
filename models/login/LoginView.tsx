import React from 'react';
import AppLayout from '@/components/appLayout';
import { GoogleIcon, GithubIcon } from '@/assets/icons';
import { Button } from '@/components/commons/button';
import Title from '@/components/commons/title';
import Divider from '@/components/commons/divider';
import Input from '@/components/commons/input';
import Link from 'next/link';
import Block from '@/components/commons/block';
import {
  Form,
  InputContainer,
  PasswordInputContainer,
  SignInInduce,
  StyledLink,
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
  fillFormComplete: boolean;
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
  fillFormComplete,
  handlePwInquiryRouting,
  handleSocialLogin,
}: LoginViewProps) => {
  return (
    <AppLayout
      type='close'
      onClick={handleClose}
      boundary={false}
      fullSize={true}
    >
      <Form onSubmit={handleSubmit}>
        <Block paddingLeft={1.5} paddingRight={1.5}>
          <Title text='Getit 로그인' />
        </Block>

        <Block
          paddingLeft={1.5}
          paddingRight={1.5}
          paddingTop={0.5}
          paddingBottom={0.5}
        >
          <Button
            type='normal'
            text='Google 계정으로 로그인'
            icon={<GoogleIcon width={4} height={4} />}
            name='google'
            onClick={handleSocialLogin}
          />
        </Block>

        <Block
          paddingLeft={1.5}
          paddingRight={1.5}
          paddingTop={0.5}
          paddingBottom={0.5}
        >
          <Button
            type='normal'
            text='Github 계정으로 로그인'
            icon={<GithubIcon width={4} height={4} />}
            name='github'
            onClick={handleSocialLogin}
          />
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5}>
          <Divider type='text' text='또는' />
        </Block>

        <Block
          paddingLeft={1.5}
          paddingRight={1.5}
          paddingTop={0.5}
          paddingBottom={0.5}
        >
          <InputContainer show={showPasswordInput}>
            <Input
              type='text'
              placeholder={'이메일 주소를 입력해주세요.'}
              onChange={handleEmail}
              value={email}
              focus={true}
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
                />
              </PasswordInputContainer>
            )}
          </InputContainer>
        </Block>

        <Block
          paddingLeft={1.5}
          paddingRight={1.5}
          paddingTop={1}
          paddingBottom={0.5}
        >
          {fillFormComplete ? (
            <Button type='submit' text='확인' />
          ) : (
            <Button type='submit' text='다음' />
          )}
        </Block>

        <Block
          paddingLeft={1.5}
          paddingRight={1.5}
          paddingTop={0.5}
          paddingBottom={1}
        >
          <Button
            type='normal'
            text='비밀번호를 잊으셨나요?'
            onClick={handlePwInquiryRouting}
          />
        </Block>

        <Block
          paddingLeft={1.5}
          paddingRight={1.5}
          paddingTop={1.5}
          paddingBottom={1.5}
        >
          <SignInInduce>계정이 없으신가요?</SignInInduce>
          <Link href={'/signUp'} passHref>
            <StyledLink>가입하기</StyledLink>
          </Link>
        </Block>
      </Form>
    </AppLayout>
  );
};

export default LoginView;
