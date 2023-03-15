import React from 'react';
import AppLayout from 'components/appLayout';
import Button from 'components/commons/button';
import {
  Container,
  Form,
  TitleContainer,
  Title,
  InputContainer,
  EmailInput,
  NextLoginSessionBtn,
  SignInBtn,
  SignInAccent,
  ErrorMessage,
} from './styles';

export interface PwInquiryViewProps {
  email: string | null;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emailInvalidError: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSignup: () => void;
}

const PwInquiryView = ({
  email,
  onChangeEmail,
  emailInvalidError,
  handleSubmit,
  handleSignup,
}: PwInquiryViewProps) => {
  return (
    <AppLayout nav={false}>
      <Container>
        <Button type='close' />
        <Form onSubmit={handleSubmit}>
          <TitleContainer>
            <Title>Getit 계정 찾기</Title>
          </TitleContainer>
          <InputContainer>
            <EmailInput
              type='text'
              placeholder='이메일 주소를 입력해주세요.'
              onChange={onChangeEmail}
              value={email as string}
            />
            {emailInvalidError && (
              <ErrorMessage>올바른 이메일을 입력해 주세요.</ErrorMessage>
            )}
          </InputContainer>

          <NextLoginSessionBtn onClick={() => {}}>확인</NextLoginSessionBtn>
          <SignInBtn>
            계정이 없으신가요?{' '}
            <SignInAccent onClick={handleSignup}>가입하기</SignInAccent>
          </SignInBtn>
        </Form>
      </Container>
    </AppLayout>
  );
};

export default PwInquiryView;
