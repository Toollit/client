import React from 'react';
import dynamic from 'next/dynamic';
import Title from 'components/commons/title';
import Container from '@/components/commons/container';
import AppLayout from '@/components/appLayout';
import Divider from '@/components/commons/divider';
import { AccountCircleIcon } from '@/assets/icons';
import ShareIcon from '@/assets/icons/ShareIcon';
import BookmarkIcon from '@/assets/icons/BookmarkIcon';
import More from '@/components/commons/more';
import Hashtag from '@/components/commons/hashtag';
import {
  BlockContainer,
  RecruitmentTypeContainer,
  RecruitmentType,
  LeftBlockContainer,
  RightBlockContainer,
  ProjectDetailInfo,
  Writer,
  DateAndViewContainer,
  UpdatedAt,
  HoverCreatedAt,
  UserInfoContainer,
  LastLoginAt,
  ProfileImageContainer,
  WriterLastLoginAtContainer,
  ContentContainer,
  TrendingPostsContainer,
  ContentFooter,
  BookmarkButton,
  ShareButton,
  MoreButton,
  ContentFooterHashtagsContainer,
  ContentFooterButtonContainer,
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
  contentMarkdown: string | null;
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
}

interface Writer {
  nickname: string;
  lastLoginAt: string;
  profileImage: string;
}

export interface ProjectDetailViewProps {
  content: Content;
  writer: Writer;
  me: {
    nickname: string | null;
  };
}

const ProjectDetailView = ({ content, writer, me }: ProjectDetailViewProps) => {
  return (
    <AppLayout nav={true}>
      <Container size='default'>
        <BlockContainer>
          <LeftBlockContainer>
            <ContentContainer>
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

              <ProjectDetailInfo>
                <DateAndViewContainer>
                  {content.createdAt !== content.updatedAt ? (
                    <>
                      <UpdatedAt>수정됨: {content.updatedAt}</UpdatedAt>
                      <HoverCreatedAt>
                        작성일: {content.createdAt}
                      </HoverCreatedAt>
                    </>
                  ) : (
                    <div>작성일: {content.createdAt}</div>
                  )}

                  <div>조회수: {content.views}</div>
                </DateAndViewContainer>
              </ProjectDetailInfo>
              <Divider type='thin' />
              <DynamicTuiViewer content={content.contentHTML} />
              <ContentFooter>
                <ContentFooterHashtagsContainer>
                  {content.hashtags.map((hashtag, index) => {
                    return (
                      <Hashtag tagName={hashtag} key={`${hashtag}-${index}`} />
                    );
                  })}
                </ContentFooterHashtagsContainer>
                <ContentFooterButtonContainer>
                  <BookmarkButton>
                    <BookmarkIcon />
                    <span>북마크</span>
                  </BookmarkButton>
                  <ShareButton>
                    <ShareIcon />
                    <span>공유</span>
                  </ShareButton>
                  <MoreButton>
                    <More isMine={writer.nickname === me.nickname} />
                  </MoreButton>
                </ContentFooterButtonContainer>
              </ContentFooter>
            </ContentContainer>
          </LeftBlockContainer>
          <RightBlockContainer>
            <UserInfoContainer>
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
            </UserInfoContainer>
            <TrendingPostsContainer>최신 인기 게시글</TrendingPostsContainer>
          </RightBlockContainer>
        </BlockContainer>
      </Container>
    </AppLayout>
  );
};

export default ProjectDetailView;