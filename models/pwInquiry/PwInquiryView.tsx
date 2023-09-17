import React from 'react';
import Link from 'next/link';
import AppLayout from '@/components/appLayout';
import { Button } from '@/components/commons/button';
import Title from '@/components/commons/title';
import Input from '@/components/commons/input';
import InputError from '@/components/commons/error/InputError';
import Block from '@/components/commons/block';
import { Form, InputContainer, SignInInduce, StyledLink } from './styles';

export interface PwInquiryViewProps {
  handleClose: () => void;
  email: string | null;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emailInvalidError: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  inputRef: React.ForwardedRef<HTMLInputElement>;
}

const PwInquiryView = ({
  handleClose,
  email,
  onChangeEmail,
  emailInvalidError,
  handleSubmit,
  inputRef,
}: PwInquiryViewProps) => {
  return (
    <AppLayout
      type='close'
      onClick={handleClose}
      boundary={false}
      fullSize={true}
    >
      <Form onSubmit={handleSubmit}>
        <Block paddingLeft={1.5} paddingRight={1.5}>
          <Title text='Getit 계정 찾기' />
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5}>
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
        </Block>

        <Block
          paddingLeft={1.5}
          paddingRight={1.5}
          paddingTop={1.5}
          paddingBottom={1.5}
        >
          <Button type='submit' text='확인' />
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

export default PwInquiryView;
