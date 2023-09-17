import React from 'react';
import AppLayout from 'components/appLayout';
import { Button } from '@/components/commons/button';
import Title from '@/components/commons/title';
import Input from '@/components/commons/input';
import InputError from '@/components/commons/error/InputError';
import Block from '@/components/commons/block';
import { Form, InputContainer, Notice } from './styles';

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
  passwordRef: React.ForwardedRef<HTMLInputElement>;
  doubleCheckPasswordRef: React.ForwardedRef<HTMLInputElement>;
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
  passwordRef,
  doubleCheckPasswordRef,
}: ResetPasswordViewProps) => {
  return (
    <AppLayout type='none'>
      <Form onSubmit={handleSubmit}>
        <Block paddingLeft={1.5} paddingRight={1.5}>
          <Title text='Getit 비밀번호 재설정' />
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5}>
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
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5}>
          <Notice>
            <span>임시 비밀번호</span>로 로그인한 경우 비밀번호를{' '}
            <span>재설정</span>하지 않으면 서비스 이용이 제한됩니다.
          </Notice>
        </Block>

        <Block
          paddingLeft={1.5}
          paddingRight={1.5}
          paddingTop={1}
          paddingBottom={1}
        >
          <Button type='submit' text='확인' />
        </Block>

        <Block
          paddingLeft={1.5}
          paddingRight={1.5}
          paddingTop={1}
          paddingBottom={1}
        >
          <Button type='normal' text='로그아웃' onClick={handleLogout} />
        </Block>
      </Form>
    </AppLayout>
  );
};

export default ResetPasswordView;
