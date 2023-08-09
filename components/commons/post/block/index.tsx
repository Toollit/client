import React from 'react';
import project3 from 'public/static/images/project3.jpg';
import { BookmarkIcon, ViewIcon } from '@/assets/icons';
import { Project } from '@/apis/getProjectsFetcher';
import Hashtag from '@/components/commons/hashtag';
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
          src={project3}
          alt='default project image'
          layout='fill'
          priority
        />
      </ImageContainer>

      <RecruitmentTypeContainer>
        {content.memberTypes?.map((type, index) => {
          return (
            <RecruitmentType key={type + index} type={type}>
              {type}
            </RecruitmentType>
          );
        })}
      </RecruitmentTypeContainer>

      <Title>{content.title}</Title>

      <ContentFooterContainer>
        <HashtagContainer>
          {content.hashtags?.map((hashtag, index) => {
            return <Hashtag tagName={hashtag} key={`/${hashtag}-${index}`} />;
          })}
        </HashtagContainer>

        <MemberBookmarkViewContainer>
          <RecruitCompleteContent>
            모집완료{' '}
            <RecruitNumber>
              {content.memberNumber} / {content.recruitNumber}
            </RecruitNumber>
          </RecruitCompleteContent>
          <BookmarkViewContainer>
            <BookmarkContainer>
              <BookmarkIcon width={20} height={20} fill={content.bookmark} />
              <BookmarkIconText>{content.bookmarks}</BookmarkIconText>
            </BookmarkContainer>
            <ViewIconContainer>
              <ViewIcon width={20} height={20} />
              <ViewIconText>{content.views}</ViewIconText>
            </ViewIconContainer>
          </BookmarkViewContainer>
        </MemberBookmarkViewContainer>
      </ContentFooterContainer>
    </Container>
  );
};

export default BlockPost;
