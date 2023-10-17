import React from 'react';
import dynamic from 'next/dynamic';
import Title from 'components/commons/title';
import AppLayout from '@/components/appLayout';
import Tooltip, { TooltipProps } from '@/components/commons/tooltip';
import Hashtag from '@/components/commons/hashtag';
import {
  ProjectContent,
  ProjectMember,
  ProjectWriter,
} from '@/apis/projectFetcher';
import Skeleton from '@/components/commons/skeleton';
import Report from '@/components/commons/drawer/report';
import { Button } from '@/components/commons/button';
import Block from '@/components/commons/block';
import { ShareIcon, BookmarkIcon, MoreIcon } from '@/assets/icons';
import CategoryTitle from '@/components/commons/categoryTitle';
import { CenterLayoutContainer, ImageWrapper } from '@/styles/commons';
import FastScroll from '@/components/commons/fastScroll';
import Link from 'next/link';
import { StaticImageData } from 'next/image';
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
  LastLoginAt,
  StyledImage,
  ProjectMembersContainer,
  Members,
  Avatar,
  RestMemberCount,
  MembersContainer,
  StickyContainer,
  WriterInfo,
} from './styles';

const DynamicTuiViewer = dynamic(
  () => import('../../components/commons/webEditor/TuiViewer'),
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

interface Writer extends Omit<ProjectWriter, 'profileImage'> {
  profileImage: string | StaticImageData;
}
interface Content extends Omit<ProjectContent, 'memberTypes'> {
  memberTypes: ('Developer' | 'Designer' | 'PM' | 'Anyone')[];
}

interface Member extends Omit<ProjectMember, 'profiles'> {
  profiles: {
    nickname: string;
    profileImage: string | StaticImageData;
  }[];
  moreMemberCount: string | null;
}

export interface ProjectDetailViewProps {
  me: boolean;
  isClientRendering: boolean;
  postId: string;
  writer?: Writer;
  content?: Content;
  member?: Member;
  bookmark?: boolean;
  handleBookmark: () => void;
  handleShare: () => void;
  handleTooltipOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tooltip: TooltipProps;
  handleJoinProject: () => void;
}

const ProjectDetailView = ({
  me,
  isClientRendering,
  postId,
  writer,
  content,
  member,
  bookmark,
  handleBookmark,
  handleShare,
  handleTooltipOpen,
  tooltip,
  handleJoinProject,
}: ProjectDetailViewProps) => {
  return (
    <AppLayout type='default'>
      <CenterLayoutContainer>
        <Container>
          <ColumnLeftContainer>
            {content ? (
              <ContentContainer>
                <ContentHeader>
                  <RecruitMemberType>
                    {content.memberTypes.map((type, index) => {
                      return (
                        <MemberType key={type + index} type={type}>
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
                    <ModifyButton onClick={handleTooltipOpen}>
                      <MoreIcon width={4} height={3} />
                    </ModifyButton>
                    <Tooltip {...tooltip} />
                  </ButtonContainer>
                </ProjectContentBottomContainer>
              </ContentContainer>
            ) : (
              <Skeleton height={500} />
            )}
          </ColumnLeftContainer>
          <br />
          <ColumnRightContainer>
            <StickyContainer>
              <Block marginBottom={1}>
                {writer ? (
                  <WriterInfoContainer>
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
                    <WriterInfo>
                      <Writer>
                        <div>작성자</div>
                        <div>{writer.nickname}</div>
                      </Writer>
                      <LastLoginAt>
                        <div>마지막 접속</div>
                        <div>{writer.lastLoginAt}</div>
                      </LastLoginAt>
                    </WriterInfo>
                  </WriterInfoContainer>
                ) : (
                  <Skeleton height={200} />
                )}
              </Block>

              <Block marginBottom={1}>
                <Button
                  type='submit'
                  text='참가하기'
                  shape='square'
                  onClick={handleJoinProject}
                />
              </Block>

              <Block marginBottom={1}>
                <ProjectMembersContainer>
                  <CategoryTitle text='프로젝트 멤버' />

                  <MembersContainer>
                    <Members>
                      {member?.profiles.map((info, index) => {
                        if (index > 5) {
                          return null;
                        }

                        return (
                          <Avatar key={info.nickname + index} index={index}>
                            <ImageWrapper width={3.5} height={3.5}>
                              <StyledImage
                                src={info.profileImage}
                                alt={`${info.nickname} profile image`}
                                draggable={false}
                                priority
                                layout='fill'
                              />
                            </ImageWrapper>
                          </Avatar>
                        );
                      })}
                    </Members>
                    <RestMemberCount>{member?.moreMemberCount}</RestMemberCount>
                  </MembersContainer>
                </ProjectMembersContainer>
              </Block>
            </StickyContainer>
          </ColumnRightContainer>
        </Container>
      </CenterLayoutContainer>

      <FastScroll scroll='both' />
      <Report />
    </AppLayout>
  );
};

export default ProjectDetailView;
