import React from 'react';
import AppLayout from 'components/appLayout';
import { GoogleIcon, GithubIcon } from 'assets/icons';
import {
  Container,
  Form,
  InputContainer,
  PasswordInput,
  SignInBtn,
  SignInAccent,
} from './styles';
import { CloseBtn, NormalBtn, SubmitBtn } from 'components/commons/button';
import Title from 'components/commons/title';
import Divider from 'components/commons/divider';
import Input from 'components/commons/input';

export interface LoginViewProps {
  handleClose: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  email: string;
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordInputRef: React.RefObject<HTMLInputElement>;
  showPasswordInput: boolean;
  fillFormComplete: boolean;
  handleSignUpRouting: () => void;
  handlePwInquiryRouting: () => void;
  handleSocialLogin: (event: React.MouseEvent) => void;
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
  handleSignUpRouting,
  handlePwInquiryRouting,
  handleSocialLogin,
}: LoginViewProps) => {
  return (
    <AppLayout nav={false}>
      <Container>
        <CloseBtn onClick={handleClose} />

        <Form onSubmit={handleSubmit}>
          <Title text='Getit 로그인' />

          <NormalBtn
            text='Google 계정으로 로그인'
            icon={<GoogleIcon />}
            name='google'
            onClick={handleSocialLogin}
          />
          <NormalBtn
            text='Github 계정으로 로그인'
            icon={<GithubIcon />}
            name='github'
            onClick={handleSocialLogin}
          />
          <Divider type='text' text='또는' />
          <InputContainer show={showPasswordInput}>
            <Input
              placeholder={'이메일 주소를 입력해주세요.'}
              onChange={handleEmail}
              value={email}
            />
            {showPasswordInput && (
              <PasswordInput
                type='password'
                placeholder='비밀번호를 입력해주세요.'
                onChange={handlePassword}
                value={password}
                ref={passwordInputRef}
              />
            )}
          </InputContainer>

          <SubmitBtn text={fillFormComplete ? '확인' : '다음'} />

          <NormalBtn
            text='비밀번호를 잊으셨나요?'
            onClick={handlePwInquiryRouting}
          />
          <SignInBtn>
            계정이 없으신가요?{' '}
            <SignInAccent onClick={handleSignUpRouting}>가입하기</SignInAccent>
          </SignInBtn>
        </Form>
      </Container>
    </AppLayout>
  );
};

export default LoginView;
