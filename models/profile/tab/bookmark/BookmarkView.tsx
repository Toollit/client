import React, { FC } from 'react';
import { Project } from '@/apis/profileBookmarksFetcher';
import Hashtag from '@/components/hashtag';
import { BookmarkIcon, PersonIcon, ViewIcon } from '@/assets/icons';
import { BoxContainer, BoxTitle } from '@/styles/commons';
import Skeleton from '@/components/skeleton';
import {
  BoxContent,
  Content,
  HashtagContainer,
  RecruitmentType,
  RecruitmentTypeContainer,
  ContentLink,
  Title,
  SubInfo,
  LoadMoreContainer,
  LoadMoreButton,
  Notice,
} from './styles';

interface CustomBookmark extends Omit<Project, 'memberTypes'> {
  memberTypes: ('Developer' | 'Designer' | 'PM' | 'Anyone')[];
  bookmark: boolean;
}

export interface ViewProps {
  data?: {
    bookmarks: CustomBookmark[] | null;
    total: number;
    showLoadMore: boolean;
  };
  loadMore: () => void;
}

const BookmarkView: FC<ViewProps> = ({ data, loadMore }) => {
  return (
    <>
      {data && (
        <BoxContainer>
          <BoxTitle>북마크</BoxTitle>
          <BoxContent>
            {data.total > 0 ? (
              <>
                {data.bookmarks?.map((project) => {
                  return (
                    <Content key={project.id}>
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
                            return <Hashtag key={hashtag} tagName={hashtag} />;
                          })}
                        </HashtagContainer>

                        <SubInfo>
                          <div>
                            <ViewIcon width={2.5} height={2.5} />
                            <span>{project.views}</span>
                          </div>
                          <div>
                            <BookmarkIcon
                              width={2.5}
                              height={2.5}
                              fill={project.bookmark}
                            />
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
                <Notice>북마크한 프로젝트가 없습니다.</Notice>
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

export default BookmarkView;
