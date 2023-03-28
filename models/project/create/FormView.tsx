import React from 'react';
import dynamic from 'next/dynamic';
import AppLayout from '@/components/appLayout';
import {
  Container,
  TitleInput,
  TitleInputContainer,
  ButtonContainer,
  Button,
} from './styles';
import Title from 'components/commons/title';
import Label from '@/components/commons/label';

const DynamicTuiEditor = dynamic(
  () => import('@/components/commons/webEditor/TuiEditor'),
  {
    ssr: false,
  },
);

export interface FormViewProps {
  title: string | null;
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  editorRef: React.MutableRefObject<any>;
}

const FormView = ({
  title,
  onChangeTitle,
  handleSubmit,
  editorRef,
}: FormViewProps) => {
  return (
    <AppLayout nav={true}>
      <Container onSubmit={handleSubmit}>
        <Title text='프로젝트 생성' />
        <TitleInputContainer>
          <Label htmlFor='title' text='제목' />
          <TitleInput
            name='title'
            value={title as string}
            onChange={onChangeTitle}
          />
        </TitleInputContainer>
        <br />
        <DynamicTuiEditor editorRef={editorRef} />

        <ButtonContainer>
          <Button>작성 완료</Button>
        </ButtonContainer>
      </Container>
    </AppLayout>
  );
};

export default FormView;
