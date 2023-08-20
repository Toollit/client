import React from 'react';
import dynamic from 'next/dynamic';
import AppLayout from '@/components/appLayout';
import Title from '@/components/commons/title';
import HashtagInput from '@/components/commons/hashtagInput';
import MemberTypeSelector from '@/components/commons/memberTypeSelector';
import { Editor } from '@toast-ui/react-editor';
import { ProjectDetail } from '@/apis/projectDetailFetcher';
import {
  Form,
  ButtonContainer,
  Button,
  RecruitNumberContainer,
  RecruitNumberLabel,
  RecruitNumberInput,
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
  recruitCountRef: React.RefObject<HTMLInputElement>;
  handleKeydownSubmit: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  content?: ProjectDetail | null;
  hashtags?: string[];
  memberTypes?: ('developer' | 'designer' | 'pm' | 'anyone')[];
  recruitNumber?: number;
}

const ModifyView = ({
  handleSubmit,
  titleRef,
  editorRef,
  hashtagRef,
  memberTypeRef,
  recruitCountRef,
  handleKeydownSubmit,
  content,
  hashtags,
  memberTypes,
  recruitNumber,
}: ModifyViewProps) => {
  return (
    <AppLayout type='default'>
      <Form onSubmit={handleSubmit}>
        <Title text='프로젝트 수정' />
        <DynamicTuiEditor
          titleRef={titleRef}
          editorRef={editorRef}
          content={content}
        />
        <br />

        <HashtagInput
          hashtagRef={hashtagRef}
          hashtags={hashtags}
          placeholder='*Enter를 눌러 해시태그를 작성해 주세요.'
        />
        <br />

        <MemberTypeSelector
          memberTypeRef={memberTypeRef}
          memberTypes={memberTypes}
          label='*모집 타입'
        />
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
            autoComplete='off'
            defaultValue={recruitNumber}
          />
        </RecruitNumberContainer>

        <ButtonContainer>
          <Button>작성 완료</Button>
        </ButtonContainer>
      </Form>
    </AppLayout>
  );
};

export default ModifyView;
