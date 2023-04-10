import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import AppLayout from '@/components/appLayout';
import Title from '@/components/commons/title';
import {
  Container,
  ProjectTeamContainer,
  HashtagInputContainer,
  ButtonContainer,
  Button,
} from './styles';
import HashtagInput from '@/components/commons/HashtagInput';
import MemberType from '@/components/commons/memberType';
import { Editor } from '@toast-ui/react-editor';

const DynamicTuiEditor = dynamic(
  () => import('@/components/commons/webEditor/TuiEditor'),
  {
    ssr: false,
  },
);

export interface ProjectCreateViewProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  titleRef: React.RefObject<HTMLInputElement>;
  editorRef: React.RefObject<Editor>;
  setUploadImageUrls: React.Dispatch<
    React.SetStateAction<{ url: string; fileSize: number }[]>
  >;
  hashtagRef: React.MutableRefObject<string[]>;
  memberTypeRef: React.MutableRefObject<{
    developer: boolean;
    designer: boolean;
    pm: boolean;
    anyone: boolean;
  }>;
}

const ProjectCreateView = ({
  handleSubmit,
  titleRef,
  editorRef,
  setUploadImageUrls,
  hashtagRef,
  memberTypeRef,
}: ProjectCreateViewProps) => {
  return (
    <AppLayout nav={true}>
      <Container onSubmit={handleSubmit}>
        <Title text='프로젝트 생성' />
        <DynamicTuiEditor
          titleRef={titleRef}
          editorRef={editorRef}
          setUploadImageUrls={setUploadImageUrls}
        />

        <HashtagInputContainer>
          <HashtagInput hashtagRef={hashtagRef} />
        </HashtagInputContainer>

        <ProjectTeamContainer>
          <MemberType memberTypeRef={memberTypeRef} />
        </ProjectTeamContainer>

        <ButtonContainer>
          <Button>작성 완료</Button>
        </ButtonContainer>
      </Container>
    </AppLayout>
  );
};

export default ProjectCreateView;
