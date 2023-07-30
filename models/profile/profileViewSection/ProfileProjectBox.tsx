import React from 'react';
import Hashtag from '@/components/commons/hashtag';
import { PersonIcon, ViewIcon } from '@/assets/icons';
import Link from 'next/link';
import { Project } from '@/apis/profileProjectsFetcher';
import {
  BoxContainer,
  BoxTitle,
  ContentBlock,
  BoxContent,
  HashtagContainer,
  ColumnLeftContainer,
  ColumnRightContainer,
  RecruitmentTypeContainer,
  RecruitmentType,
  ProjectTitle,
  Views,
  MemberCount,
  ViewText,
  MemberCountText,
  LoadMore,
  LoadMoreContainer,
  StyledLink,
  Notice,
  GoToParticipateProject,
} from './ProfileProjectBox.styles';

interface CustomProject extends Omit<Project, 'memberTypes'> {
  memberTypes: ('Developer' | 'Designer' | 'PM' | 'Anyone')[];
}

export interface ProfileProjectsData {
  projects: CustomProject[] | null;
  total: number;
  showLoadMore: boolean;
}

interface ProfileProjectViewProps {
  data?: ProfileProjectsData;
  loadMore: () => void;
}

const ProfileProjectBox = ({ data, loadMore }: ProfileProjectViewProps) => {
  return (
    <BoxContainer>
      <BoxTitle>참여 프로젝트</BoxTitle>
      <BoxContent>
        {data ? (
          <>
            {data.projects?.map((project, index) => {
              return (
                <Link
                  key={`/profile/project/${project.id}`}
                  href={`/project/${project.id}`}
                  passHref
                >
                  <StyledLink>
                    <ContentBlock>
                      <ColumnLeftContainer>
                        <RecruitmentTypeContainer>
                          {project.memberTypes.map((type) => {
                            return (
                              <RecruitmentType key={type} type={type}>
                                {type}
                              </RecruitmentType>
                            );
                          })}
                        </RecruitmentTypeContainer>

                        <ProjectTitle>{project.title}</ProjectTitle>

                        <HashtagContainer>
                          {project.hashtags.map((hashtag) => {
                            return (
                              <Hashtag key={`${hashtag}`} tagName={hashtag} />
                            );
                          })}
                        </HashtagContainer>
                      </ColumnLeftContainer>

                      <ColumnRightContainer>
                        <MemberCount>
                          <PersonIcon width={20} height={20} />
                          <MemberCountText>{`${project.memberNumber} / ${project.recruitNumber}`}</MemberCountText>
                        </MemberCount>
                        <Views>
                          <ViewIcon width={20} height={20} />
                          <ViewText>{project.views}</ViewText>
                        </Views>
                      </ColumnRightContainer>
                    </ContentBlock>
                  </StyledLink>
                </Link>
              );
            })}
            {data.showLoadMore && (
              <LoadMoreContainer>
                <LoadMore onClick={loadMore}>더보기</LoadMore>
              </LoadMoreContainer>
            )}
          </>
        ) : (
          <>
            <Notice>참여 중인 프로젝트가 없습니다.</Notice>
            <Link href={'/'} passHref>
              <GoToParticipateProject>참여하러가기</GoToParticipateProject>
            </Link>
          </>
        )}
      </BoxContent>
    </BoxContainer>
  );
};

export default ProfileProjectBox;
