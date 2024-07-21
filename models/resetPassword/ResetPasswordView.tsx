import React, { FC } from 'react';
import AppLayout from '@/components/appLayout';
import { Button } from '@/components/button';
import Title from '@/components/title';
import Input from '@/components/input';
import InputError from '@/components/error/InputError';
import {
  Form,
  TitleContainer,
  PasswordSettingsContainer,
  InputContainer,
  Notice,
  SubmitButtonContainer,
} from './styles';

export interface ViewProps {
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
  passwordRef: React.ForwardedRef<HTMLInputElement>;
  doubleCheckPasswordRef: React.ForwardedRef<HTMLInputElement>;
}

const ResetPasswordView: FC<ViewProps> = ({
  newPassword,
  onChangeNewPassword,
  newPasswordInvalidError,
  doubleCheckPassword,
  onChangeDoubleCheckPassword,
  doubleCheckPasswordError,
  handleSubmit,
  handleLogout,
  passwordRef,
  doubleCheckPasswordRef,
}) => {
  return (
    <AppLayout type='none' footer={false}>
      <Form onSubmit={handleSubmit}>
        <TitleContainer>
          <Title text='Toollit 비밀번호 재설정' />
        </TitleContainer>

        <PasswordSettingsContainer>
          <InputContainer>
            <Input
              type='password'
              placeholder={'새로운 비밀번호'}
              onChange={onChangeNewPassword}
              value={newPassword}
              focus={true}
              ref={passwordRef}
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
              ref={doubleCheckPasswordRef}
            />
            {doubleCheckPasswordError && (
              <InputError text='비밀번호가 일치하지 않습니다.' />
            )}
          </InputContainer>
        </PasswordSettingsContainer>

        <Notice>
          <span>임시 비밀번호</span>로 로그인한 경우 비밀번호를{' '}
          <span>재설정</span>하지 않으면 서비스 이용이 제한됩니다.
        </Notice>

        <SubmitButtonContainer>
          <div>
            <Button type='submit' text='확인' />
          </div>
          <div>
            <Button type='normal' text='로그아웃' onClick={handleLogout} />
          </div>
        </SubmitButtonContainer>
      </Form>
    </AppLayout>
  );
};

export default ResetPasswordView;
