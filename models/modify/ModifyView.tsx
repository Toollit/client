import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import AppLayout from '@/components/appLayout';
import Title from '@/components/title';
import HashtagInput from '@/components/hashtagInput';
import MemberTypeSelector from '@/components/memberTypeSelector';
import { Editor } from '@toast-ui/react-editor';
import { ProjectDetail } from '@/apis/projectFetcher';
import { Button } from '@/components/button';
import Label from '@/components/label';
import Image, { StaticImageData } from 'next/legacy/image';
import { CloseIcon, AddIcon } from '@/assets/icons';
import Tooltip, { TooltipProps } from '@/components/tooltip';
import Skeleton from '@/components/skeleton';
import { BottomButton } from '@/components/button';
import { InnerContainer } from '@/styles/commons';

import {
  AddImageBox,
  SubmitContainer,
  EditorContainer,
  HashtagContainer,
  ImageContainer,
  ImageDeleteIcon,
  MemberTypeContainer,
  RecruitContainer,
  RecruitCountInput,
  RepresentativeImageContainer,
  TitleContainer,
  Form,
  DesktopSubmitContainer,
  MobileSubmitContainer,
} from './styles';

const DynamicTuiEditor = dynamic(
  () => import('../../components/webEditor/TuiEditor'),
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

export interface ViewProps {
  isFooterVisible: boolean;
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
  recruitCount?: number;
}

const ModifyView: FC<ViewProps> = ({
  isFooterVisible,
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
  recruitCount,
  tooltip,
}) => {
  return (
    <AppLayout type='default' footer={isFooterVisible}>
      <InnerContainer>
        <Form onSubmit={handleSubmit}>
          <TitleContainer>
            <Title text='프로젝트 수정' />
          </TitleContainer>

          <EditorContainer>
            <DynamicTuiEditor
              titleRef={editor.titleRef}
              editorRef={editor.editorRef}
              content={editor.content}
              name={editor.name}
              contentImageUploadUrl={editor.contentImageUploadUrl}
            />
          </EditorContainer>

          <HashtagContainer>
            <Label text='#해시태그' />
            <HashtagInput
              hashtagRef={hashtagRef}
              hashtags={hashtags}
              placeholder='*Enter를 눌러 해시태그를 작성해 주세요.'
            />
          </HashtagContainer>

          <MemberTypeContainer>
            <Label text='모집 타입' />
            <MemberTypeSelector
              memberTypeRef={memberTypeRef}
              memberTypes={memberTypes}
            />
          </MemberTypeContainer>

          <RecruitContainer>
            <Label htmlFor='recruit' text='모집 인원' />
            <RecruitCountInput
              type='number'
              name='recruit'
              pattern='[0-9]*'
              min={1}
              max={100}
              ref={recruitCountRef}
              onKeyDown={handleKeydownSubmit}
              autoComplete='off'
              defaultValue={recruitCount}
              inputMode='numeric'
            />
          </RecruitContainer>

          <RepresentativeImageContainer>
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
                  <AddIcon width={4} height={4} />
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
          </RepresentativeImageContainer>

          <SubmitContainer>
            <DesktopSubmitContainer>
              <Button type='submit' text='작성 완료' width={15} />
            </DesktopSubmitContainer>

            <MobileSubmitContainer>
              <BottomButton text='작성 완료' />
            </MobileSubmitContainer>
          </SubmitContainer>
        </Form>
      </InnerContainer>
    </AppLayout>
  );
};

export default ModifyView;
