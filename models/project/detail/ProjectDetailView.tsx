import React, { FC } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Title from '@/components/title';
import AppLayout from '@/components/appLayout';
import Hashtag from '@/components/hashtag';
import Skeleton from '@/components/skeleton';
import Report from '@/components/drawer/report';
import { Button } from '@/components/button';
import { InnerContainer, ImageWrapper } from '@/styles/commons';
import BasicTooltip from '@/components/tooltip/basic';
import OptionButton from '@/components/drawer/option';
import { ProjectMember, ProjectWriter } from '@/apis/projectFetcher';
import { CapitalizedMemberTypes, ProjectDetail } from '@/typings';
import {
  ShareIcon,
  BookmarkIcon,
  MoreHorizIcon,
  AccountCircleIcon,
} from '@/assets/icons';
import {
  Container,
  ColumnLeftContainer,
  ColumnRightContainer,
  ContentContainer,
  ContentHeader,
  RecruitMemberType,
  MemberType,
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
  ModifyButton,
  WriterInfoContainer,
  WriterProfileImage,
  Writer,
  LastSigninAt,
  StyledImage,
  ProjectMembersContainer,
  Members,
  Avatar,
  MembersContainer,
  StickyContainer,
  WriterInfo,
  JoinButtonContainer,
  MemberSkeletonContainer,
} from './styles';

const DynamicTuiViewer = dynamic(
  () => import('../../../components/webEditor/TuiViewer'),
  {
    loading: () => (
      <>
        <Skeleton width={'80%'} top={1} bottom={1} />
        <Skeleton width={'100%'} bottom={1} />
        <Skeleton width={'90%'} bottom={1} />
        <Skeleton width={'50%'} bottom={1} />
        <Skeleton width={'30%'} bottom={1} />
        <Skeleton width={'80%'} bottom={1} />
      </>
    ),
    ssr: false,
  },
);

interface CustomProjectDetailViewData
  extends Omit<ProjectDetail, 'memberTypes'> {
  memberTypes: CapitalizedMemberTypes[];
}

export interface ViewProps {
  isMyPost: boolean;
  isRecruitCompleted: boolean;
  isMember: boolean;
  isClientRendering: boolean;
  writer?: ProjectWriter;
  content?: CustomProjectDetailViewData;
  member?: ProjectMember;
  bookmarkStatus?: boolean;
  handleBookmark: () => void;
  handleShare: () => void;
  handleModify: () => void;
  handleDelete: () => void;
  handleReport: () => void;
  handleJoinProject: () => void;
  handleLeaveProject: () => void;
}

const ProjectDetailView: FC<ViewProps> = ({
  isMyPost,
  isRecruitCompleted,
  isMember,
  isClientRendering,
  writer,
  content,
  member,
  bookmarkStatus,
  handleBookmark,
  handleShare,
  handleModify,
  handleDelete,
  handleReport,
  handleJoinProject,
  handleLeaveProject,
}) => {
  return (
    <AppLayout type='default'>
      <InnerContainer>
        <Container>
          <ColumnLeftContainer>
            {content ? (
              <ContentContainer>
                <ContentHeader>
                  <RecruitMemberType>
                    {content.memberTypes.map((type) => {
                      return (
                        <MemberType key={type} type={type}>
                          {type}
                        </MemberType>
                      );
                    })}
                  </RecruitMemberType>

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
                </ContentHeader>

                {/* The current page that can be ssr, but the TUI editor only supports csr, so the data is not rendered properly during ssr, so I wrote it like this to randomly put the data on the screen for seo. */}
                {isClientRendering ? (
                  <DynamicTuiViewer content={content.contentHTML} />
                ) : (
                  <p>{content.contentMarkdown}</p>
                )}

                <ProjectContentBottomContainer>
                  <HashtagsContainer>
                    {content.hashtags.map((hashtag) => {
                      return <Hashtag key={hashtag} tagName={hashtag} />;
                    })}
                  </HashtagsContainer>
                  <ButtonContainer>
                    <BookmarkButton onClick={handleBookmark}>
                      <BookmarkIcon fill={bookmarkStatus} />
                      <span>북마크</span>
                    </BookmarkButton>
                    <ShareButton onClick={handleShare}>
                      <ShareIcon />
                      <span>공유</span>
                    </ShareButton>
                    {isMyPost ? (
                      <OptionButton
                        icon={<MoreHorizIcon width={4} height={3} />}
                        option={{ modify: true, delete: true }}
                        handleModify={handleModify}
                        handleDelete={handleDelete}
                      />
                    ) : (
                      <OptionButton
                        icon={<MoreHorizIcon width={4} height={3} />}
                        option={{ report: true }}
                        handleReport={handleReport}
                      />
                    )}
                  </ButtonContainer>
                </ProjectContentBottomContainer>
              </ContentContainer>
            ) : (
              <Skeleton height={60} />
            )}
          </ColumnLeftContainer>
          <br />
          <ColumnRightContainer>
            <StickyContainer>
              {writer ? (
                <Link href={`/profile/${writer.nickname}`}>
                  <WriterInfoContainer>
                    {writer.profileImage ? (
                      <WriterProfileImage>
                        <ImageWrapper width={6} height={6}>
                          <StyledImage
                            src={writer.profileImage}
                            alt={`${writer.nickname} profile`}
                            draggable={false}
                            priority
                            layout='fill'
                          />
                        </ImageWrapper>
                      </WriterProfileImage>
                    ) : (
                      <AccountCircleIcon
                        fill={true}
                        width={8}
                        height={8}
                        color='#767678'
                      />
                    )}

                    <WriterInfo>
                      <Writer>
                        <div>작성자</div>
                        <div>{writer.nickname}</div>
                      </Writer>
                      <LastSigninAt>
                        <div>마지막 접속</div>
                        <div>{writer.lastSigninAt}</div>
                      </LastSigninAt>
                    </WriterInfo>
                  </WriterInfoContainer>
                </Link>
              ) : (
                <Skeleton height={20} />
              )}

              <JoinButtonContainer>
                {!isMember && isRecruitCompleted ? (
                  <Button type='disabled' text='모집완료' shape='square' />
                ) : (
                  <>
                    {isMember && (
                      <Button
                        type='submit'
                        text='탈퇴하기'
                        shape='square'
                        onClick={handleLeaveProject}
                      />
                    )}

                    {!isMember && (
                      <Button
                        type='submit'
                        text='참가하기'
                        shape='square'
                        onClick={handleJoinProject}
                      />
                    )}
                  </>
                )}
              </JoinButtonContainer>

              <ProjectMembersContainer>
                <h2>프로젝트 멤버</h2>
                {member ? (
                  <MembersContainer>
                    <Members>
                      {member?.profiles.map((user) => {
                        return (
                          <Avatar key={user.nickname}>
                            <Link href={`/profile/${user.nickname}`}>
                              <BasicTooltip text={user.nickname}>
                                {user.profileImage ? (
                                  <ImageWrapper width={3.5} height={3.5}>
                                    <StyledImage
                                      src={user.profileImage}
                                      alt={`${user.nickname} profile image`}
                                      draggable={false}
                                      priority
                                      layout='fill'
                                    />
                                  </ImageWrapper>
                                ) : (
                                  <AccountCircleIcon
                                    fill={true}
                                    width={4.5}
                                    height={4.5}
                                    color='#767678'
                                  />
                                )}
                              </BasicTooltip>
                            </Link>
                          </Avatar>
                        );
                      })}
                    </Members>
                  </MembersContainer>
                ) : (
                  <MemberSkeletonContainer>
                    <Skeleton
                      width={3.5}
                      height={3.5}
                      shape='circular'
                      right={1}
                      bottom={1}
                    />
                    <Skeleton
                      width={3.5}
                      height={3.5}
                      shape='circular'
                      right={1}
                      bottom={1}
                    />
                    <Skeleton
                      width={3.5}
                      height={3.5}
                      shape='circular'
                      right={1}
                      bottom={1}
                    />
                    <Skeleton
                      width={3.5}
                      height={3.5}
                      shape='circular'
                      right={1}
                      bottom={1}
                    />
                    <Skeleton
                      width={3.5}
                      height={3.5}
                      shape='circular'
                      right={1}
                      bottom={1}
                    />
                  </MemberSkeletonContainer>
                )}
              </ProjectMembersContainer>
            </StickyContainer>
          </ColumnRightContainer>
        </Container>
      </InnerContainer>
      <Report />
    </AppLayout>
  );
};

export default ProjectDetailView;
