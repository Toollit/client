import React, { useState } from 'react';
import project3 from 'public/static/images/project3.jpg';
import BookmarkIcon from '@/assets/icons/BookmarkIcon';
import ViewIcon from '@/assets/icons/ViewIcon';
import { Project } from '@/apis/project/getProjectList';
import Hashtag from '@/components/commons/hashtag';
import {
  Container,
  ImageContainer,
  ProjectImage,
  ContentContainer,
  RecruitmentTypeContainer,
  RecruitmentType,
  Title,
  HashtagContainer,
  ContentFooterContainer,
  MemberBookmarkViewContainer,
  PostDetailInfoContainer,
  RecruitCompleteContent,
  RecruitNumber,
  BookmarkContainer,
  BookmarkIconText,
  ViewIconContainer,
  ViewIconText,
} from './styles';

type RecruitmentType = 'developer' | 'designer' | 'pm' | 'anyone';

interface BlockPostProps {
  content: Project;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const BlockPost = ({ content, onClick }: BlockPostProps) => {
  const [recruitmentType, setRecruitType] = useState<RecruitmentType[]>([
    'developer',
    'designer',
    'pm',
    'anyone',
  ]);
  return (
    <Container data-id={content.id} onClick={onClick}>
      <ImageContainer>
        <ProjectImage
          src={project3}
          alt='default project image'
          layout='fill'
          priority
        />
      </ImageContainer>

      <RecruitmentTypeContainer>
        {recruitmentType.map((type, index) => {
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
          {content.hashtags.map((hashtag, index) => {
            return <Hashtag tagName={hashtag} key={`${hashtag}-${index}`} />;
          })}
        </HashtagContainer>

        <MemberBookmarkViewContainer>
          <RecruitCompleteContent>
            모집완료 <RecruitNumber>0 / 8</RecruitNumber>
          </RecruitCompleteContent>
          <PostDetailInfoContainer>
            <BookmarkContainer>
              <BookmarkIcon width={20} height={20} />
              <BookmarkIconText>{content.bookmarks}</BookmarkIconText>
            </BookmarkContainer>
            <ViewIconContainer>
              <ViewIcon width={20} height={20} />
              <ViewIconText>{content.views}</ViewIconText>
            </ViewIconContainer>
          </PostDetailInfoContainer>
        </MemberBookmarkViewContainer>
      </ContentFooterContainer>
    </Container>
  );
};

export default BlockPost;
