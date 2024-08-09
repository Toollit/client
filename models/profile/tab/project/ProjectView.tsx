import React, { FC } from 'react';
import Hashtag from '@/components/hashtag';
import { BookmarkIcon, PersonIcon, ViewIcon } from '@/assets/icons';
import { CapitalizedMemberTypes, ProjectOverview } from '@/typings';
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

interface CustomProjectViewData extends Omit<ProjectOverview, 'memberTypes'> {
  memberTypes: CapitalizedMemberTypes[];
}

export interface ViewProps {
  hasRendered: boolean;
  projects?: CustomProjectViewData[];
  projectsTotalCount?: number;
  handleLoadMore: () => void;
  showLoadMore: boolean;
}

const ProjectView: FC<ViewProps> = ({
  hasRendered,
  projects,
  projectsTotalCount,
  handleLoadMore,
  showLoadMore,
}) => {
  return (
    <>
      {hasRendered && (
        <>
          {projects && (
            <BoxContainer>
              <BoxTitle>프로젝트</BoxTitle>
              <BoxContent isLastContent={showLoadMore}>
                {projectsTotalCount && projectsTotalCount > 0 ? (
                  <>
                    {projects.map((project, index) => {
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
                                  <Hashtag
                                    key={`${hashtag}`}
                                    tagName={hashtag}
                                  />
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

                    {showLoadMore && (
                      <LoadMoreContainer>
                        <LoadMoreButton onClick={handleLoadMore}>
                          더보기
                        </LoadMoreButton>
                      </LoadMoreContainer>
                    )}
                  </>
                ) : (
                  <>
                    <Notice>생성한 프로젝트가 없습니다.</Notice>
                    <ProjectCreateLink href={'/'}>
                      생성하러가기
                    </ProjectCreateLink>
                  </>
                )}
              </BoxContent>
            </BoxContainer>
          )}

          {!projects && (
            <>
              <Skeleton width={'100%'} height={20} bottom={2} />
              <Skeleton width={'100%'} height={15} bottom={2} />
              <Skeleton width={'100%'} height={30} bottom={2} />
            </>
          )}
        </>
      )}

      {!hasRendered && (
        <>
          <Skeleton width={'100%'} height={20} bottom={2} />
          <Skeleton width={'100%'} height={15} bottom={2} />
          <Skeleton width={'100%'} height={30} bottom={2} />
        </>
      )}
    </>
  );
};

export default ProjectView;
