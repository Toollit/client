import React from 'react';
import AppLayout from 'components/appLayout';
import { NormalBtn, SubmitBtn } from '@/components/commons/button';
import Title from '@/components/commons/title';
import Input from '@/components/commons/input';
import InputError from '@/components/commons/Error/InputError';
import LoadingCircularProgress from '@/components/commons/loading';
import { Container, Form, InputContainer, Notice } from './styles';

export interface ResetPasswordViewProps {
  newPassword: string;
  onChangeNewPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newPasswordInvalidError: boolean;
  doubleCheckPassword: string;
  onChangeDoubleCheckPassword: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  doubleCheckPasswordError: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleLogout: () => void;
  isLoading: boolean;
}

const ResetPasswordView = ({
  newPassword,
  onChangeNewPassword,
  newPasswordInvalidError,
  doubleCheckPassword,
  onChangeDoubleCheckPassword,
  doubleCheckPasswordError,
  handleSubmit,
  handleLogout,
  isLoading,
}: ResetPasswordViewProps) => {
  return (
    <AppLayout nav={false}>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Title text='Getit 비밀번호 재설정' />

          <InputContainer>
            <Input
              type='password'
              placeholder={'새로운 비밀번호'}
              onChange={onChangeNewPassword}
              value={newPassword}
              focus={true}
            />
            {newPasswordInvalidError && (
              <InputError text='영문자, 숫자, 특수문자 조합 8 ~ 20자리' />
            )}
          </InputContainer>

          <InputContainer>
            <Input
              type='password'
              placeholder={'새로운 비밀번호 확인'}
              onChange={onChangeDoubleCheckPassword}
              value={doubleCheckPassword}
              focus={true}
            />
            {doubleCheckPasswordError && (
              <InputError text='비밀번호가 일치하지 않습니다.' />
            )}
          </InputContainer>

          <Notice>
            <span>임시 비밀번호</span>로 로그인한 경우 비밀번호를{' '}
            <span>재설정</span>하지 않으면 서비스 이용이 제한됩니다.
          </Notice>

          <SubmitBtn text='확인' />
          <NormalBtn text='로그아웃' onClick={handleLogout} />
        </Form>
      </Container>
      {isLoading && <LoadingCircularProgress />}
    </AppLayout>
  );
};

export default ResetPasswordView;
