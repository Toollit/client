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
import Image, { StaticImageData } from 'next/image';
import { CloseIcon, PlusIcon } from '@/assets/icons';
import Tooltip, { TooltipProps } from '@/components/commons/tooltip';
import Skeleton from '@/components/commons/skeleton';
import {
  AddImageBox,
  ButtonContainer,
  ImageContainer,
  ImageDeleteIcon,
  RecruitNumberInput,
} from './styles';

const DynamicTuiEditor = dynamic(
  () => import('../../components/commons/webEditor/TuiEditor'),
  {
    loading: () => (
      <>
        <Skeleton height={2} bottom={1} width={'20%'} />
        <Skeleton height={3} bottom={2} />
        <Skeleton height={2} bottom={1} width={'20%'} />
        <Skeleton height={40} bottom={1} />
      </>
    ),
    ssr: false,
  },
);

export interface ModifyViewProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  editor: {
    titleRef: React.RefObject<HTMLInputElement>;
    editorRef: React.RefObject<Editor>;
    name: string;
    contentImageUploadUrl: string;
    content?: ProjectDetail | null;
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
  representativePreviewImage: StaticImageData | string | null;
  handleKeydownSubmit: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleDeleteRepresentativePreviewImg: () => void;
  handleTooltipOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tooltip: TooltipProps;
  hashtags?: string[];
  memberTypes?: ('developer' | 'designer' | 'pm' | 'anyone')[];
  recruitNumber?: number;
}

const ModifyView = ({
  handleSubmit,
  editor,
  hashtagRef,
  memberTypeRef,
  recruitCountRef,
  representativeImageRef,
  handleChangeRepresentativeImg,
  representativePreviewImage,
  handleKeydownSubmit,
  handleDeleteRepresentativePreviewImg,
  handleTooltipOpen,
  hashtags,
  memberTypes,
  recruitNumber,
  tooltip,
}: ModifyViewProps) => {
  return (
    <AppLayout type='default'>
      <form onSubmit={handleSubmit}>
        <Block paddingLeft={1.5} paddingRight={1.5}>
          <Title text='프로젝트 수정' />
        </Block>

        <Block paddingLeft={1.5} paddingRight={1.5}>
          <DynamicTuiEditor
            titleRef={editor.titleRef}
            editorRef={editor.editorRef}
            content={editor.content}
            name={editor.name}
            contentImageUploadUrl={editor.contentImageUploadUrl}
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

        <Block paddingLeft={1.5} paddingRight={1.5} paddingTop={2}>
          <Label text='대표 이미지' />

          {representativePreviewImage ? (
            <ImageContainer>
              <Image
                src={representativePreviewImage}
                alt={'project representative image'}
                layout='fill'
              />
              <ImageDeleteIcon onClick={handleDeleteRepresentativePreviewImg}>
                <CloseIcon />
              </ImageDeleteIcon>
            </ImageContainer>
          ) : (
            <>
              <AddImageBox onClick={handleTooltipOpen}>
                <PlusIcon width={4} height={4} />
              </AddImageBox>
              <Tooltip {...tooltip} />
            </>
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

export default ModifyView;
