import React, { FC } from 'react';
import Hashtag from '@/components/hashtag';
import { BookmarkIcon, PersonIcon, ViewIcon } from '@/assets/icons';
import { Project } from '@/apis/profileProjectsFetcher';
import { BoxContainer, BoxTitle } from '@/styles/commons';
import Skeleton from '@/components/skeleton';
import {
  Content,
  BoxContent,
  HashtagContainer,
  RecruitmentTypeContainer,
  RecruitmentType,
  Title,
  LoadMoreButton,
  LoadMoreContainer,
  ContentLink,
  Notice,
  ProjectCreateLink,
  SubInfo,
} from './styles';

interface CustomProject extends Omit<Project, 'memberTypes'> {
  memberTypes: ('Developer' | 'Designer' | 'PM' | 'Anyone')[];
}

export interface ProjectViewData {
  projects: CustomProject[] | null;
  total: number;
  showLoadMore: boolean;
}

export interface ViewProps {
  data: ProjectViewData | null;
  loadMore: () => void;
}

const ProjectView: FC<ViewProps> = ({ data, loadMore }) => {
  return (
    <>
      {data && (
        <BoxContainer>
          <BoxTitle>프로젝트</BoxTitle>
          <BoxContent>
            {data.total > 0 ? (
              <>
                {data.projects?.map((project, index) => {
                  return (
                    <Content key={`/profile/project/${project.id}`}>
                      <ContentLink href={`/project/${project.id}`}>
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
                      </ContentLink>
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
                <ProjectCreateLink href={'/'}>생성하러가기</ProjectCreateLink>
              </>
            )}
          </BoxContent>
        </BoxContainer>
      )}

      {!data && (
        <>
          <Skeleton height={20} bottom={3} />
          <Skeleton height={20} bottom={3} />
          <Skeleton height={20} bottom={3} />
          <Skeleton height={20} bottom={3} />
        </>
      )}
    </>
  );
};

export default ProjectView;
