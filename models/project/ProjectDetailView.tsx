import React from 'react';
import dynamic from 'next/dynamic';
import Title from 'components/commons/title';
import AppLayout from '@/components/appLayout';
import { AccountCircleIcon } from '@/assets/icons';
import { ShareIcon, BookmarkIcon } from '@/assets/icons';
import Tooltip from '@/components/commons/tooltip';
import Hashtag from '@/components/commons/hashtag';
import { ProjectDetail } from '@/apis/projectDetailFetcher';
import Skeleton from '@/components/commons/skeleton';
import Report from '@/components/commons/report';
import {
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
  Writer,
  LastLoginAt,
  ProjectMemberContainerTablet,
  ProjectMemberContainerMobile,
  StyledImage,
} from './styles';

const DynamicTuiViewer = dynamic(
  () => import('../../components/commons/webEditor/TuiViewer'),
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
  postId: string;
  writer?: ProjectDetail['writer'];
  content?: ProjectDetailContent;
  bookmark?: boolean;
  tooltip: {
    writer?: string;
    title?: string;
  };
  handleBookmark: () => void;
  handleShare: () => void;
}

const ProjectDetailView = ({
  isClientRendering,
  postId,
  content,
  writer,
  bookmark,
  tooltip,
  handleBookmark,
  handleShare,
}: ProjectDetailViewProps) => {
  return (
    <AppLayout type='default'>
      <ColumnContainer>
        <ColumnLeftContainer>
          {content ? (
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
                      <Hashtag
                        tagName={hashtag}
                        key={`/project/${postId}/${hashtag}`}
                      />
                    );
                  })}
                </HashtagsContainer>
                <ButtonContainer>
                  <BookmarkButton onClick={handleBookmark}>
                    <BookmarkIcon fill={bookmark} />
                    <span>북마크</span>
                  </BookmarkButton>
                  <ShareButton onClick={handleShare}>
                    <ShareIcon />
                    <span>공유</span>
                  </ShareButton>
                  <Tooltip writer={tooltip.writer} title={tooltip.title} />
                </ButtonContainer>
              </ProjectContentBottomContainer>
            </ProjectContentContainer>
          ) : (
            <Skeleton height={500} />
          )}
        </ColumnLeftContainer>
        <ColumnRightContainer>
          {writer ? (
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
              <div>
                <Writer>
                  <div>작성자</div>
                  <div>{writer.nickname}</div>
                </Writer>
                <LastLoginAt>
                  <div>마지막 접속</div>
                  <div>{writer.lastLoginAt}</div>
                </LastLoginAt>
              </div>
            </WriterInfoContainer>
          ) : (
            <Skeleton height={200} />
          )}

          <ProjectMemberContainerTablet>
            참여중인 멤버
          </ProjectMemberContainerTablet>
        </ColumnRightContainer>
      </ColumnContainer>
      {/* mobile version */}
      <ProjectMemberContainerMobile>참여중인 멤버</ProjectMemberContainerMobile>

      <Report />
    </AppLayout>
  );
};

export default ProjectDetailView;
