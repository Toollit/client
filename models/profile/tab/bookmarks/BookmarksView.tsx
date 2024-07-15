import React, { FC } from 'react';
import Hashtag from '@/components/hashtag';
import { BookmarkIcon, PersonIcon, ViewIcon } from '@/assets/icons';
import { BoxContainer, BoxTitle } from '@/styles/commons';
import Skeleton from '@/components/skeleton';
import { Project, CapitalizedMemberTypes } from '@/typings';
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

interface CustomBookmarksViewData extends Omit<Project, 'memberTypes'> {
  memberTypes: CapitalizedMemberTypes[];
  bookmark: boolean;
}

export interface ViewProps {
  hasRendered: boolean;
  bookmarks?: CustomBookmarksViewData[];
  bookmarksTotalCount?: number;
  loadMore: () => void;
  showLoadMore: boolean;
}

const BookmarkView: FC<ViewProps> = ({
  hasRendered,
  bookmarks,
  bookmarksTotalCount,
  loadMore,
  showLoadMore,
}) => {
  return (
    <>
      {hasRendered && (
        <>
          {bookmarks && (
            <BoxContainer>
              <BoxTitle>북마크</BoxTitle>
              <BoxContent>
                {bookmarksTotalCount && bookmarksTotalCount > 0 ? (
                  <>
                    {bookmarks.map((bookmark) => {
                      return (
                        <Content key={bookmark.id}>
                          <ContentLink href={`/project/${bookmark.id}`}>
                            <RecruitmentTypeContainer>
                              {bookmark.memberTypes.map((type) => {
                                return (
                                  <RecruitmentType key={type} type={type}>
                                    {type}
                                  </RecruitmentType>
                                );
                              })}
                            </RecruitmentTypeContainer>

                            <Title>{bookmark.title}</Title>

                            <HashtagContainer>
                              {bookmark.hashtags.map((hashtag) => {
                                return (
                                  <Hashtag key={hashtag} tagName={hashtag} />
                                );
                              })}
                            </HashtagContainer>

                            <SubInfo>
                              <div>
                                <ViewIcon width={2.5} height={2.5} />
                                <span>{bookmark.views}</span>
                              </div>
                              <div>
                                <BookmarkIcon
                                  width={2.5}
                                  height={2.5}
                                  fill={bookmark.bookmark}
                                />
                                <span>{bookmark.bookmarkCount}</span>
                              </div>
                              <div>
                                <PersonIcon width={2.5} height={2.5} />
                                <span>{`${bookmark.memberCount} / ${bookmark.recruitCount}`}</span>
                              </div>
                            </SubInfo>
                          </ContentLink>
                        </Content>
                      );
                    })}

                    {showLoadMore && (
                      <LoadMoreContainer>
                        <LoadMoreButton onClick={loadMore}>
                          더보기
                        </LoadMoreButton>
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

          {!bookmarks && (
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

export default BookmarkView;
