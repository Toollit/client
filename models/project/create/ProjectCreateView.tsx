import React from 'react';
import dynamic from 'next/dynamic';
import AppLayout from '@/components/appLayout';
import Title from '@/components/commons/title';
import { Container, ButtonContainer, Button } from './styles';

const DynamicTuiEditor = dynamic(
  () => import('@/components/commons/webEditor/TuiEditor'),
  {
    ssr: false,
  },
);

export interface ProjectCreateViewProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string | null;
  onChangeTitle: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  editorRef: React.MutableRefObject<any>;
  setUploadImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProjectCreateView = ({
  handleSubmit,
  title,
  onChangeTitle,
  editorRef,
  setUploadImageUrls,
}: ProjectCreateViewProps) => {
  return (
    <AppLayout nav={true}>
      <Container onSubmit={handleSubmit}>
        <Title text='프로젝트 생성' />
        <DynamicTuiEditor
          title={title}
          onChangeTitle={onChangeTitle}
          editorRef={editorRef}
          setUploadImageUrls={setUploadImageUrls}
        />
        <ButtonContainer>
          <Button>작성 완료</Button>
        </ButtonContainer>
      </Container>
    </AppLayout>
  );
};

export default ProjectCreateView;
