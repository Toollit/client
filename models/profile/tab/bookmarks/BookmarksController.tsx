import React, { FC, useCallback, useEffect, useState } from 'react';
import BookmarkView, { ViewProps } from './BookmarksView';
import { useRouter } from 'next/router';
import { updateSwipeableViewHeight } from '@/features/swipeableView';
import { useAppDispatch, useAppSelector } from '@/store';
import useWindowSize from '@/hooks/useWindowSize';
import useMyBookmarkIdsSWR from '@/hooks/useSWR/useMyBookmarkIdsSWR';
import useUserBookmarksSWR from '@/hooks/useSWR/useUserBookmarksSWR';
import { ProjectOverview, CapitalizedMemberTypes } from '@/typings';

interface BookmarkStatusCheckProjects extends ProjectOverview {
  bookmark: boolean;
}

interface CapitalizedMemberTypesProjects
  extends Omit<BookmarkStatusCheckProjects, 'memberTypes'> {
  memberTypes: CapitalizedMemberTypes[];
}

interface ControllerProps {}

const BookmarksController: FC<ControllerProps> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLaptop } = useWindowSize();

  const hasRendered = useAppSelector(
    (state) => state.profile.hasRenderedViewBookmarks,
  );
  const userNickname = useAppSelector((state) => state.profile.userNickname);
  const [postCount, setPostCount] = useState(5); // Load by 5
  const [posts, setPosts] = useState<ProjectOverview[]>([]);

  const { bookmarks, bookmarksTotalCount } = useUserBookmarksSWR(
    hasRendered,
    userNickname,
    postCount,
    { page: '/profile', tag: 'bookmarks' },
  );

  const { bookmarkIds } = useMyBookmarkIdsSWR(hasRendered, {
    page: '/profile',
    tag: 'bookmarkIds',
  });

  const handleBookmarkStatusCheck = useCallback(
    (projectOverviews: ProjectOverview[], bookmarkIds: number[]) => {
      return projectOverviews.map((project) => {
        return bookmarkIds.includes(project.id)
          ? { ...project, bookmark: true }
          : { ...project, bookmark: false };
      });
    },
    [],
  );

  const handleCapitalizedMemberTypes = useCallback(
    (projectOverviews: BookmarkStatusCheckProjects[]) => {
      // member type convert. developer -> Developer, designer -> Designer, pm -> PM, anyone -> Anyone
      const capitalizedMemberTypes = projectOverviews.map((project) => {
        return {
          ...project,
          memberTypes: project.memberTypes?.map((type) => {
            return type === 'pm'
              ? type.toUpperCase()
              : type.charAt(0).toUpperCase() + type.slice(1);
          }) as CapitalizedMemberTypes[],
        };
      });

      return capitalizedMemberTypes;
    },
    [],
  );

  const handleProcessedData = useCallback(
    ({
      bookmarkProjects,
      bookmarkIds,
    }: {
      bookmarkProjects?: ProjectOverview[];
      bookmarkIds?: number[];
    }) => {
      if (!bookmarkProjects || !bookmarkIds) {
        return;
      }

      const bookmarkStatusCheckResult = handleBookmarkStatusCheck(
        bookmarkProjects,
        bookmarkIds,
      );
      const capitalizedMemberTypesResult = handleCapitalizedMemberTypes(
        bookmarkStatusCheckResult,
      );

      const result = capitalizedMemberTypesResult;

      return result;
    },
    [handleBookmarkStatusCheck, handleCapitalizedMemberTypes],
  );

  const handleBookmarkLoadMore = useCallback(() => {
    setPostCount((prev) => prev + 5);
    dispatch(updateSwipeableViewHeight(true));
  }, [dispatch]);

  useEffect(() => {
    if (bookmarks) {
      setPosts((prev) => [...prev, ...bookmarks]);
    }
  }, [bookmarks]);

  // The reason data is write in the dependencies is to adjust the screen size when the data is updated.
  // Works only in non-desktop versions
  useEffect(() => {
    if (isLaptop !== null && !isLaptop) {
      dispatch(updateSwipeableViewHeight(true));
    }
  }, [dispatch, isLaptop]);

  const props: ViewProps = {
    hasRendered,
    bookmarks: handleProcessedData({
      bookmarkProjects: posts,
      bookmarkIds: bookmarkIds,
    }),
    bookmarksTotalCount,
    loadMore: handleBookmarkLoadMore,
    showLoadMore: posts.length !== bookmarksTotalCount,
  };

  return <BookmarkView {...props} />;
};

export default BookmarksController;
