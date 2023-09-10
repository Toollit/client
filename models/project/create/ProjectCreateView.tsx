import React from 'react';
import dynamic from 'next/dynamic';
import AppLayout from '@/components/appLayout';
import Title from '@/components/commons/title';
import HashtagInput from '@/components/commons/hashtagInput';
import MemberTypeSelector from '@/components/commons/memberTypeSelector';
import { Editor } from '@toast-ui/react-editor';
import Label from '@/components/commons/label';
import Block from '@/components/commons/block';
import { Button } from '@/components/commons/button';
import Image from 'next/image';
import PlusIcon from '@/assets/icons/PlusIcon';
import { CloseIcon } from '@/assets/icons';
import LoadingCircularProgress from '@/components/commons/loading';
import {
  RecruitNumberInput,
  ButtonContainer,
  AddImageBox,
  ImageContainer,
  ImageDeleteIcon,
} from './styles';

const DynamicTuiEditor = dynamic(
  () => import('../../../components/commons/webEditor/TuiEditor'),
  {
    loading: () => <LoadingCircularProgress />,
    ssr: false,
  },
);

export interface ProjectCreateViewProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  editor: {
    titleRef: React.RefObject<HTMLInputElement>;
    editorRef: React.RefObject<Editor>;
    name: string;
    contentImageUploadUrl: string;
  };
  hashtagRef: React.MutableRefObject<string[]>;
  memberTypeRef: React.MutableRefObject<
    ('developer' | 'designer' | 'pm' | 'anyone')[]
  >;
  recruitCountRef: React.RefObject<HTMLInputElement>;
  representativeImageRef: React.RefObject<HTMLInputElement>;
  handleChangeRepresentativeImg: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleAddRepresentativeImg: () => void;
  representativePreviewImage: string | null;
  handleKeydownSubmit: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleDeleteRepresentativePreviewImage: () => void;
}

const ProjectCreateView = ({
  handleSubmit,
  editor,
  hashtagRef,
  memberTypeRef,
  recruitCountRef,
  representativeImageRef,
  handleChangeRepresentativeImg,
  handleAddRepresentativeImg,
  representativePreviewImage,
  handleKeydownSubmit,
  handleDeleteRepresentativePreviewImage,
}: ProjectCreateViewProps) => {
  return (
    <AppLayout type='default'>
      <form onSubmit={handleSubmit}>
        <Block paddingLeft={1.5} paddingRight={1.5}>
          <Title text='프로젝트 생성' />
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5}>
          <DynamicTuiEditor
            titleRef={editor.titleRef}
            editorRef={editor.editorRef}
            name={editor.name}
            contentImageUploadUrl={editor.contentImageUploadUrl}
          />
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5} paddingTop={2}>
          <Label text='#해시태그' />
          <HashtagInput
            hashtagRef={hashtagRef}
            placeholder='*Enter를 눌러 해시태그를 작성해 주세요.'
          />
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5} paddingTop={2}>
          <Label text='모집 타입' />
          <MemberTypeSelector memberTypeRef={memberTypeRef} />
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5} paddingTop={2}>
          <Label text='모집 인원' />
          <RecruitNumberInput
            type='number'
            name='recruit'
            pattern='[0-9]*'
            min={1}
            max={100}
            ref={recruitCountRef}
            onKeyDown={handleKeydownSubmit}
            autoComplete='off'
          />
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5} paddingTop={2}>
          <Label text='대표 이미지' />

          {representativePreviewImage ? (
            <ImageContainer>
              <Image
                src={representativePreviewImage}
                alt={'project representative image'}
                layout='fill'
              />
              <ImageDeleteIcon onClick={handleDeleteRepresentativePreviewImage}>
                <CloseIcon />
              </ImageDeleteIcon>
            </ImageContainer>
          ) : (
            <AddImageBox onClick={handleAddRepresentativeImg}>
              <PlusIcon width={4} height={4} />
            </AddImageBox>
          )}

          <input
            hidden
            type='file'
            accept='image/jpg, image/jpeg, image/png'
            ref={representativeImageRef}
            onChange={handleChangeRepresentativeImg}
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

export default ProjectCreateView;
