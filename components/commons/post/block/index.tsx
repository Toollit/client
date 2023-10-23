import React from 'react';
import { BookmarkIcon, ViewIcon } from '@/assets/icons';
import { Project } from '@/apis/projectsFetcher';
import Hashtag from '@/components/commons/hashtag';
import projectDefaultImage from 'public/static/images/project.jpg';
import {
  Container,
  ImageContainer,
  ProjectImage,
  RecruitmentTypeContainer,
  RecruitmentType,
  Title,
  HashtagContainer,
  ContentFooterContainer,
  MemberBookmarkViewContainer,
  BookmarkViewContainer,
  RecruitCompleteContent,
  RecruitNumber,
  BookmarkContainer,
  BookmarkIconText,
  ViewIconContainer,
  ViewIconText,
} from './styles';

export interface CustomProject extends Omit<Project, 'memberTypes'> {
  bookmark: boolean;
  memberTypes: ('Developer' | 'Designer' | 'PM' | 'Anyone')[];
}

interface BlockPostProps {
  content: CustomProject;
}

const BlockPost = ({ content }: BlockPostProps) => {
  return (
    <Container>
      <ImageContainer>
        <ProjectImage
          src={
            content.representativeImage === 'defaultImage'
              ? projectDefaultImage
              : content.representativeImage
          }
          alt='default project image'
          layout='fill'
          priority
        />
      </ImageContainer>

      <RecruitmentTypeContainer>
        {content.memberTypes?.map((type, index) => {
          return (
            <RecruitmentType key={`/${type}-${index}`} type={type}>
              {type}
            </RecruitmentType>
          );
        })}
      </RecruitmentTypeContainer>

      <Title>{content.title}</Title>

      <ContentFooterContainer>
        <HashtagContainer>
          {content.hashtags?.map((hashtag, index) => {
            return <Hashtag key={`/${hashtag}-${index}`} tagName={hashtag} />;
          })}
        </HashtagContainer>

        <MemberBookmarkViewContainer>
          <RecruitCompleteContent>
            모집완료{' '}
            <RecruitNumber>
              {content.memberCount} / {content.recruitCount}
            </RecruitNumber>
          </RecruitCompleteContent>
          <BookmarkViewContainer>
            <BookmarkContainer>
              <BookmarkIcon width={2} height={2} fill={content.bookmark} />
              <BookmarkIconText>{content.bookmarkCount}</BookmarkIconText>
            </BookmarkContainer>
            <ViewIconContainer>
              <ViewIcon width={2} height={2} />
              <ViewIconText>{content.views}</ViewIconText>
            </ViewIconContainer>
          </BookmarkViewContainer>
        </MemberBookmarkViewContainer>
      </ContentFooterContainer>
    </Container>
  );
};

export default BlockPost;
