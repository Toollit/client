import React from 'react';
import dynamic from 'next/dynamic';
import AppLayout from '@/components/appLayout';
import Title from '@/components/commons/title';
import HashtagInput from '@/components/commons/hashtagInput';
import MemberTypeSelector from '@/components/commons/memberTypeSelector';
import { Editor } from '@toast-ui/react-editor';
import { ProjectDetail } from '@/apis/projectDetailFetcher';
import Block from '@/components/commons/block';
import { Button } from '@/components/commons/button';
import Label from '@/components/commons/label';
import { ButtonContainer, RecruitNumberInput } from './styles';
import LoadingCircularProgress from '@/components/commons/loading';

const DynamicTuiEditor = dynamic(
  () => import('../../components/commons/webEditor/TuiEditor'),
  {
    loading: () => <LoadingCircularProgress />,
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
      <form onSubmit={handleSubmit}>
        <Block paddingLeft={1.5} paddingRight={1.5}>
          <Title text='프로젝트 수정' />
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5}>
          <DynamicTuiEditor
            titleRef={titleRef}
            editorRef={editorRef}
            content={content}
          />
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5} paddingTop={2}>
          <Label text='#해시태그' />
          <HashtagInput
            hashtagRef={hashtagRef}
            hashtags={hashtags}
            placeholder='*Enter를 눌러 해시태그를 작성해 주세요.'
          />
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5} paddingTop={2}>
          <Label text='모집 타입' />
          <MemberTypeSelector
            memberTypeRef={memberTypeRef}
            memberTypes={memberTypes}
          />
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5} paddingTop={2}>
          <Label htmlFor='recruit' text='모집 인원' />
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
        </Block>

        <Block
          paddingLeft={1.5}
          paddingRight={1.5}
          paddingTop={4}
          paddingBottom={8}
        >
          <ButtonContainer>
            <Button type='submit' text='작성 완료' width={15} />
          </ButtonContainer>
        </Block>
      </form>
    </AppLayout>
  );
};

export default ModifyView;
