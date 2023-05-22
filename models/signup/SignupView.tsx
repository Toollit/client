import React from 'react';
import AppLayout from 'components/appLayout';
import { CloseBtn, DisabledBtn, SubmitBtn } from 'components/commons/button';
import Title from '@/components/commons/title';
import Input from '@/components/commons/input';
import InputError from '@/components/commons/error/InputError';
import { Container, Form, InputContainer, PrivacyPolicy } from './styles';

export interface SignUpViewProps {
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
}

const SignUpView = ({
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
}: SignUpViewProps) => {
  return (
    <AppLayout nav={false}>
      <Container>
        <CloseBtn onClick={handleClose} />
        <Form onSubmit={handleSubmit}>
          <Title text='Getit 계정을 생성하세요' />

          <InputContainer>
            <Input
              placeholder='이메일'
              onChange={onChangeEmail}
              value={email as string}
              focus={true}
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
            />
            {passwordMismatchError && (
              <InputError text='비밀번호가 일치하지 않습니다.' />
            )}
          </InputContainer>

          <br />

          {fillFormComplete ? (
            <SubmitBtn text='다음' />
          ) : (
            <DisabledBtn text='다음' />
          )}

          <PrivacyPolicy>
            가입하면 <span>쿠키 사용</span>을 포함해 <span>이용약관</span> 및{' '}
            <span>개인정보 처리방침에</span> 동의하게 됩니다. Getit은 계정을
            안전하게 보호하고 광고를 포함한 맞춤 서비스를 제공하는 등 Getit
            개인정보 처리방침에 명시된 목적을 위해 이메일 주소 정보를 사용할 수
            있습니다. <span>자세히 알아보기.</span> 이메일을 제공하시면 다른
            사람들이 이 정보로 내 계정을 찾을 수 있게 됩니다.
          </PrivacyPolicy>
        </Form>
      </Container>
    </AppLayout>
  );
};

export default SignUpView;
