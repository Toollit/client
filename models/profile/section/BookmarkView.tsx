import React from 'react';
import { Project } from '@/apis/profileBookmarksFetcher';
import Link from 'next/link';
import Hashtag from '@/components/commons/hashtag';
import { BookmarkIcon, PersonIcon, ViewIcon } from '@/assets/icons';
import {
  BoxContent,
  Content,
  HashtagContainer,
  RecruitmentType,
  RecruitmentTypeContainer,
  StyledContentLink,
  Title,
  SubInfo,
  LoadMoreContainer,
  LoadMoreButton,
  Notice,
} from './BookmarkViewStyles';
import { BoxContainer, BoxTitle } from './styles';

interface CustomBookmark extends Omit<Project, 'memberTypes'> {
  memberTypes: ('Developer' | 'Designer' | 'PM' | 'Anyone')[];
}

export interface BookmarkViewData {
  bookmarks: CustomBookmark[] | null;
  total: number;
  showLoadMore: boolean;
}

interface BookmarkViewProps {
  data: BookmarkViewData | null;
  loadMore: () => void;
}

const BookmarkView = ({ data, loadMore }: BookmarkViewProps) => {
  return (
    <BoxContainer>
      <BoxTitle>북마크</BoxTitle>
      <BoxContent>
        {data && data.total > 0 ? (
          <>
            {data.bookmarks?.map((project, index) => {
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
                          <BookmarkIcon width={2.5} height={2.5} fill={true} />
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
            <Notice>북마크한 프로젝트가 없습니다.</Notice>
          </>
        )}
      </BoxContent>
    </BoxContainer>
  );
};

export default BookmarkView;
