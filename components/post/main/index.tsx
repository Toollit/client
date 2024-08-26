import React from 'react';
import { BookmarkIcon, ViewIcon } from '@/assets/icons';
import { ProjectMainPost } from '@/typings';
import Hashtag from '@/components/hashtag';
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

interface MainPostProps {
  content: ProjectMainPost;
}

const MainPost = ({ content }: MainPostProps) => {
  return (
    <Container>
      <ImageContainer>
        <ProjectImage
          src={content.representativeImage}
          alt='default project image'
          layout='fill'
          priority
          sizes='324px'
        />
      </ImageContainer>

      <RecruitmentTypeContainer>
        {content.memberTypes.map((type) => {
          return (
            <RecruitmentType key={type} type={type}>
              {type}
            </RecruitmentType>
          );
        })}
      </RecruitmentTypeContainer>

      <Title>{content.title}</Title>

      <ContentFooterContainer>
        <HashtagContainer>
          {content.hashtags.map((hashtag) => {
            return <Hashtag key={hashtag} tagName={hashtag} />;
          })}
        </HashtagContainer>

        <MemberBookmarkViewContainer>
          <RecruitCompleteContent>
            모집완료&nbsp;
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

export default MainPost;
