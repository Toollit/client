import React from 'react';
import AppLayout from '@/components/appLayout';
import Input from '@/components/commons/input';
import Title from '@/components/commons/title';
import { Button } from '@/components/commons/button';
import Block from '@/components/commons/block';
import { Form, Notice } from './styles';

export interface NicknameViewProps {
  handleClose: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  nickname: string;
  handleNickname: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nicknameInputRef: React.ForwardedRef<HTMLInputElement>;
}

const NicknameView = ({
  handleClose,
  handleSubmit,
  nickname,
  handleNickname,
  nicknameInputRef,
}: NicknameViewProps) => {
  return (
    <AppLayout type='close' onClick={handleClose} boundary={false}>
      <Form onSubmit={handleSubmit}>
        <Block paddingLeft={1.5} paddingRight={1.5}>
          <Title text={'닉네임 설정'} />
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5}>
          <Input
            type={'text'}
            placeholder='닉네임'
            value={nickname}
            onChange={handleNickname}
            focus={true}
            ref={nicknameInputRef}
          />
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5}>
          <Notice>
            <b>회원가입이 완료되었습니다.</b>
          </Notice>
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5}>
          <Notice>닉네임 설정을 완료해야 서비스 이용이 가능합니다.</Notice>
        </Block>

        <Block
          paddingLeft={1.5}
          paddingRight={1.5}
          paddingTop={1}
          paddingBottom={2}
        >
          <Notice>
            {'\u273B'}&nbsp;최대 20자, 영어, 숫자 조합만 가능합니다.
          </Notice>
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5}>
          <Button type='submit' text='확인' />
        </Block>
      </Form>
    </AppLayout>
  );
};

export default NicknameView;
