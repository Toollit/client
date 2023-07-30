import React from 'react';
import dynamic from 'next/dynamic';
import Title from 'components/commons/title';
import AppLayout from '@/components/appLayout';
import { AccountCircleIcon } from '@/assets/icons';
import { ShareIcon, BookmarkIcon } from '@/assets/icons';
import MoreButton from '@/components/commons/moreButton';
import Hashtag from '@/components/commons/hashtag';
import { ProjectDetail } from '@/apis/projectDetailFetcher';
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
  ProjectMemberContainerTablet,
  ProjectMemberContainerMobile,
  StyledImage,
} from './styles';

const DynamicTuiViewer = dynamic(
  () => import('@/components/commons/webEditor/TuiViewer'),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  },
);

interface ProjectDetailContent
  extends Omit<ProjectDetail['content'], 'memberTypes'> {
  memberTypes: ('Developer' | 'Designer' | 'PM' | 'Anyone')[];
}

export interface ProjectDetailViewProps {
  isClientRendering: boolean;
  writer: ProjectDetail['writer'];
  content: ProjectDetailContent;
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
                        {type}
                      </RecruitmentType>
                    );
                  })}
                </RecruitmentTypeContainer>

                <Title text={content.title} />

                <DateAndViewContainer>
                  <Date>
                    <CreatedAt>작성일: {content.createdAt}</CreatedAt>
                    {content.updatedAt && (
                      <UpdatedAt>수정됨: {content.updatedAt}</UpdatedAt>
                    )}
                  </Date>

                  <Views>조회수: {content.views}</Views>
                </DateAndViewContainer>
              </ProjectContentTopContainer>

              {/* The current page that can be ssr, but the TUI editor only supports csr, so the data is not rendered properly during ssr, so I wrote it like this to randomly put the data on the screen for seo. */}
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
                  <StyledImage
                    src={writer.profileImage}
                    alt={`${writer.nickname} profile image`}
                    width={80}
                    height={80}
                    draggable={false}
                    priority
                  />
                ) : (
                  <AccountCircleIcon fill={false} width={80} height={80} />
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
            <ProjectMemberContainerTablet>
              참여중인 멤버
            </ProjectMemberContainerTablet>
          </ColumnRightContainer>
        </ColumnContainer>
        {/* mobile version */}
        <ProjectMemberContainerMobile>
          참여중인 멤버
        </ProjectMemberContainerMobile>
      </Container>
    </AppLayout>
  );
};

export default ProjectDetailView;
