import React from 'react';
import dynamic from 'next/dynamic';
import AppLayout from '@/components/appLayout';
import Title from '@/components/commons/title';
import HashtagInput from '@/components/commons/hashtagInput';
import MemberTypeSelector from '@/components/commons/memberTypeSelector';
import { Editor } from '@toast-ui/react-editor';
import {
  Form,
  RecruitNumberContainer,
  RecruitNumberInput,
  ButtonContainer,
  Button,
  RecruitNumberLabel,
} from './styles';

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
  hashtagRef: React.MutableRefObject<string[]>;
  memberTypeRef: React.MutableRefObject<
    ('developer' | 'designer' | 'pm' | 'anyone')[]
  >;
  recruitCountRef: React.RefObject<HTMLInputElement>;
  handleKeydownSubmit: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const ProjectCreateView = ({
  handleSubmit,
  titleRef,
  editorRef,
  hashtagRef,
  memberTypeRef,
  recruitCountRef,
  handleKeydownSubmit,
}: ProjectCreateViewProps) => {
  return (
    <AppLayout nav={true}>
      <Form onSubmit={handleSubmit}>
        <Title text='프로젝트 생성' />
        <DynamicTuiEditor titleRef={titleRef} editorRef={editorRef} />
        <br />

        <HashtagInput hashtagRef={hashtagRef} />
        <br />

        <MemberTypeSelector memberTypeRef={memberTypeRef} label='*모집 타입' />
        <br />

        <RecruitNumberContainer>
          <RecruitNumberLabel htmlFor='recruit'>*모집 인원</RecruitNumberLabel>
          <RecruitNumberInput
            type='number'
            name='recruit'
            pattern='[0-9]*'
            min={1}
            max={100}
            ref={recruitCountRef}
            onKeyDown={handleKeydownSubmit}
          />
        </RecruitNumberContainer>

        <ButtonContainer>
          <Button>작성 완료</Button>
        </ButtonContainer>
      </Form>
    </AppLayout>
  );
};

export default ProjectCreateView;
