import React from 'react';
import dynamic from 'next/dynamic';
import Title from 'components/commons/title';
import AppLayout from '@/components/appLayout';
import { AccountCircleIcon } from '@/assets/icons';
import ShareIcon from '@/assets/icons/ShareIcon';
import BookmarkIcon from '@/assets/icons/BookmarkIcon';
import MoreButton from '@/components/commons/moreButton';
import Hashtag from '@/components/commons/hashtag';
import {
  Container,
  ColumnContainer,
  ColumnLeftContainer,
  ColumnRightContainer,
  ProjectContentContainer,
  ProjectContentTopContainer,
  RecruitmentTypeContainer,
  RecruitmentType,
  DateAndViewContainer,
  Date,
  Views,
  CreatedAt,
  UpdatedAt,
  ProjectContentBottomContainer,
  HashtagsContainer,
  ButtonContainer,
  BookmarkButton,
  ShareButton,
  WriterInfoContainer,
  ProfileImageContainer,
  WriterLastLoginAtContainer,
  Writer,
  LastLoginAt,
  TrendingPostsContainer,
} from './styles';

const DynamicTuiViewer = dynamic(
  () => import('@/components/commons/webEditor/TuiViewer'),
  {
    ssr: false,
  },
);

interface Content {
  title: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  nickname: string;
  contentHTML: string;
  contentMarkdown: string;
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
}

interface Writer {
  nickname: string;
  lastLoginAt: string;
  profileImage: string;
}

export interface ProjectDetailViewProps {
  isClientRendering: boolean;
  content: Content;
  writer: Writer;
  me: {
    nickname: string | null;
  };
}

const ProjectDetailView = ({
  isClientRendering,
  content,
  writer,
  me,
}: ProjectDetailViewProps) => {
  return (
    <AppLayout nav={true}>
      <Container>
        <ColumnContainer>
          <ColumnLeftContainer>
            <ProjectContentContainer>
              <ProjectContentTopContainer>
                <RecruitmentTypeContainer>
                  {content.memberTypes.map((type, index) => {
                    return (
                      <RecruitmentType key={type + index} type={type}>
                        {type === 'pm'
                          ? type.toUpperCase()
                          : type.charAt(0).toUpperCase() + type.slice(1)}
                      </RecruitmentType>
                    );
                  })}
                </RecruitmentTypeContainer>

                <Title text={content.title} />

                <DateAndViewContainer>
                  <Date>
                    <CreatedAt>작성일: {content.createdAt}</CreatedAt>
                    {content.createdAt !== content.updatedAt && (
                      <UpdatedAt>수정됨: {content.updatedAt}</UpdatedAt>
                    )}
                  </Date>

                  <Views>조회수: {content.views}</Views>
                </DateAndViewContainer>
              </ProjectContentTopContainer>

              {isClientRendering ? (
                <DynamicTuiViewer content={content.contentHTML} />
              ) : (
                <p>{content.contentMarkdown}</p>
              )}

              <ProjectContentBottomContainer>
                <HashtagsContainer>
                  {content.hashtags.map((hashtag, index) => {
                    return (
                      <Hashtag tagName={hashtag} key={`${hashtag}-${index}`} />
                    );
                  })}
                </HashtagsContainer>
                <ButtonContainer>
                  <BookmarkButton>
                    <BookmarkIcon />
                    <span>북마크</span>
                  </BookmarkButton>
                  <ShareButton>
                    <ShareIcon />
                    <span>공유</span>
                  </ShareButton>
                  <MoreButton isMine={writer.nickname === me.nickname} />
                </ButtonContainer>
              </ProjectContentBottomContainer>
            </ProjectContentContainer>
          </ColumnLeftContainer>
          <ColumnRightContainer>
            <WriterInfoContainer>
              <ProfileImageContainer>
                {writer.profileImage ? (
                  <></> // 프로필 이미지 넣기
                ) : (
                  <AccountCircleIcon fill={false} width={60} height={60} />
                )}
              </ProfileImageContainer>
              <WriterLastLoginAtContainer>
                <Writer>
                  <div>작성자</div>
                  <div>{writer.nickname}</div>
                </Writer>
                <LastLoginAt>
                  <div>마지막 접속</div>
                  <div>{writer.lastLoginAt}</div>
                </LastLoginAt>
              </WriterLastLoginAtContainer>
            </WriterInfoContainer>
            <TrendingPostsContainer>최신 인기 게시글</TrendingPostsContainer>
          </ColumnRightContainer>
        </ColumnContainer>
      </Container>
    </AppLayout>
  );
};

export default ProjectDetailView;
