import React from 'react';
import dynamic from 'next/dynamic';
import AppLayout from '@/components/appLayout';
import Title from '@/components/commons/title';
import HashtagInput from '@/components/commons/hashtagInput';
import MemberTypeSelector from '@/components/commons/memberTypeSelector';
import { Editor } from '@toast-ui/react-editor';
import { ProjectDetail } from '@/apis/getProjectDetailFetcher';
import {
  Container,
  ProjectTeamContainer,
  HashtagInputContainer,
  ButtonContainer,
  Button,
} from './styles';

const DynamicTuiEditor = dynamic(
  () => import('@/components/commons/webEditor/TuiEditor'),
  {
    ssr: false,
  },
);

export interface ModifyViewProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  titleRef: React.RefObject<HTMLInputElement>;
  editorRef: React.RefObject<Editor>;
  hashtagRef: React.MutableRefObject<string[]>;
  memberTypeRef: React.MutableRefObject<
    ('developer' | 'designer' | 'pm' | 'anyone')[]
  >;
  content?: ProjectDetail;
  hashtags?: string[];
}

const ModifyView = ({
  handleSubmit,
  titleRef,
  editorRef,
  hashtagRef,
  memberTypeRef,
  content,
  hashtags,
}: ModifyViewProps) => {
  return (
    <AppLayout nav={true}>
      <Container onSubmit={handleSubmit}>
        <Title text='프로젝트 생성' />
        <DynamicTuiEditor
          titleRef={titleRef}
          editorRef={editorRef}
          content={content}
        />

        <HashtagInputContainer>
          <HashtagInput hashtagRef={hashtagRef} hashtags={hashtags} />
        </HashtagInputContainer>

        <ProjectTeamContainer>
          <MemberTypeSelector memberTypeRef={memberTypeRef} content={content} />
        </ProjectTeamContainer>

        <ButtonContainer>
          <Button>작성 완료</Button>
        </ButtonContainer>
      </Container>
    </AppLayout>
  );
};

export default ModifyView;
