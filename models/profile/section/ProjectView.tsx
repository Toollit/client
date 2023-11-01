import React from 'react';
import Hashtag from '@/components/commons/hashtag';
import { BookmarkIcon, PersonIcon, ViewIcon } from '@/assets/icons';
import Link from 'next/link';
import { Project } from '@/apis/profileProjectsFetcher';
import {
  Content,
  BoxContent,
  HashtagContainer,
  RecruitmentTypeContainer,
  RecruitmentType,
  Title,
  LoadMoreButton,
  LoadMoreContainer,
  StyledContentLink,
  Notice,
  StyledLink,
  SubInfo,
} from './ProjectViewStyles';
import { BoxContainer, BoxTitle } from './styles';

interface CustomProject extends Omit<Project, 'memberTypes'> {
  memberTypes: ('Developer' | 'Designer' | 'PM' | 'Anyone')[];
}

export interface ProjectViewData {
  projects: CustomProject[] | null;
  total: number;
  showLoadMore: boolean;
}

interface ProjectViewProps {
  data: ProjectViewData | null;
  loadMore: () => void;
}

const ProjectView = ({ data, loadMore }: ProjectViewProps) => {
  return (
    <>
      <BoxContainer>
        <BoxTitle>내 프로젝트</BoxTitle>
        <BoxContent>
          {data && data.total > 0 ? (
            <>
              {data.projects?.map((project, index) => {
                return (
                  <Content key={`/profile/project/${project.id}`}>
                    <Link href={`/project/${project.id}`} passHref>
                      <StyledContentLink>
                        <RecruitmentTypeContainer>
                          {project.memberTypes.map((type) => {
                            return (
                              <RecruitmentType key={type} type={type}>
                                {type}
                              </RecruitmentType>
                            );
                          })}
                        </RecruitmentTypeContainer>

                        <Title>{project.title}</Title>

                        <HashtagContainer>
                          {project.hashtags.map((hashtag) => {
                            return (
                              <Hashtag key={`${hashtag}`} tagName={hashtag} />
                            );
                          })}
                        </HashtagContainer>

                        <SubInfo>
                          <div>
                            <ViewIcon width={2.5} height={2.5} />
                            <span>{project.views}</span>
                          </div>
                          <div>
                            <BookmarkIcon width={2.5} height={2.5} />
                            <span>{project.bookmarkCount}</span>
                          </div>
                          <div>
                            <PersonIcon width={2.5} height={2.5} />
                            <span>{`${project.memberCount} / ${project.recruitCount}`}</span>
                          </div>
                        </SubInfo>
                      </StyledContentLink>
                    </Link>
                  </Content>
                );
              })}

              {data.showLoadMore && (
                <LoadMoreContainer>
                  <LoadMoreButton onClick={loadMore}>더보기</LoadMoreButton>
                </LoadMoreContainer>
              )}
            </>
          ) : (
            <>
              <Notice>생성한 프로젝트가 없습니다.</Notice>
              <Link href={'/'} passHref>
                <StyledLink>생성하러가기</StyledLink>
              </Link>
            </>
          )}
        </BoxContent>
      </BoxContainer>

      <BoxContainer>
        <BoxTitle>참여 프로젝트</BoxTitle>
        <BoxContent>
          {data && data.total > 0 ? (
            <>
              {data.projects?.map((project, index) => {
                return (
                  <Content key={`/profile/project/${project.id}`}>
                    <Link href={`/project/${project.id}`} passHref>
                      <StyledContentLink>
                        <RecruitmentTypeContainer>
                          {project.memberTypes.map((type) => {
                            return (
                              <RecruitmentType key={type} type={type}>
                                {type}
                              </RecruitmentType>
                            );
                          })}
                        </RecruitmentTypeContainer>

                        <Title>{project.title}</Title>

                        <HashtagContainer>
                          {project.hashtags.map((hashtag) => {
                            return (
                              <Hashtag key={`${hashtag}`} tagName={hashtag} />
                            );
                          })}
                        </HashtagContainer>

                        <SubInfo>
                          <div>
                            <ViewIcon width={2.5} height={2.5} />
                            <span>{project.views}</span>
                          </div>
                          <div>
                            <BookmarkIcon width={2.5} height={2.5} />
                            <span>{project.bookmarkCount}</span>
                          </div>
                          <div>
                            <PersonIcon width={2.5} height={2.5} />
                            <span>{`${project.memberCount} / ${project.recruitCount}`}</span>
                          </div>
                        </SubInfo>
                      </StyledContentLink>
                    </Link>
                  </Content>
                );
              })}

              {data.showLoadMore && (
                <LoadMoreContainer>
                  <LoadMoreButton onClick={loadMore}>더보기</LoadMoreButton>
                </LoadMoreContainer>
              )}
            </>
          ) : (
            <>
              <Notice>참여한 프로젝트가 없습니다.</Notice>
              <Link href={'/'} passHref>
                <StyledLink>참여하러가기</StyledLink>
              </Link>
            </>
          )}
        </BoxContent>
      </BoxContainer>
    </>
  );
};

export default ProjectView;
