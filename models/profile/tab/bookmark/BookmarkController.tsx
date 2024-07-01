import React, { FC, useCallback, useEffect, useState } from 'react';
import BookmarkView, { ViewProps } from './BookmarkView';
import { useRouter } from 'next/router';
import {
  ProfileBookmarksAPIRes,
  Project,
} from '@/apis/profileBookmarksFetcher';
import { updateSwipeableViewHeight } from '@/features/swipeableView';
import { useAppDispatch, useAppSelector } from '@/store';
import useWindowSize from '@/hooks/useWindowSize';
import useMyBookmarksSWR from '@/hooks/useSWR/useMyBookmarksSWR';
import useUserBookmarksSWR from '@/hooks/useSWR/useUserBookmarksSWR';

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

interface BookmarkData {
  isLoaded: boolean;
  data: ProfileBookmarksAPIRes['data'] | null;
}

interface ControllerProps {}

const BookmarkController: FC<ControllerProps> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLaptop } = useWindowSize();

  const hasRendered = useAppSelector(
    (state) => state.profile.hasRenderedViewBookmarks,
  );
  const userNickname = useAppSelector((state) => state.profile.userNickname);
  const [postCount, setPostCount] = useState(5); // Load by 5
  const [posts, setPosts] = useState<Project[]>([]);

  const { bookmarks, bookmarksTotalCount } = useUserBookmarksSWR(
    userNickname,
    postCount,
  );

  const { bookmarkIds, isLoading } = useMyBookmarksSWR();

  const handleProcessedData = useCallback(
    ({
      bookmarkProjects,
      bookmarkIds,
    }: {
      bookmarkProjects?: Project[];
      bookmarkIds?: number[];
    }) => {
      if (!bookmarkProjects || !bookmarkIds) {
        return;
      }
      // member type convert. developer -> Developer, designer -> Designer, pm -> PM, anyone -> Anyone
      const convertedMemberTypes = bookmarkProjects.map((project) => {
        return {
          ...project,
          memberTypes: project.memberTypes.map((type) => {
            return type === 'pm'
              ? type.toUpperCase()
              : type.charAt(0).toUpperCase() + type.slice(1);
          }) as CustomMemberTypes,
        };
      });

      // const bookmarks = bookmarkIds;

      const bookmarksStatusCheck = convertedMemberTypes?.map((project) => {
        return bookmarkIds?.includes(project.id)
          ? { ...project, bookmark: true }
          : { ...project, bookmark: false };
      });

      const projects = bookmarksStatusCheck;

      return projects;
    },
    [],
  );

  const handleBookmarkLoadMore = useCallback(() => {
    setPostCount((prev) => prev + 5);
  }, []);

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

export default BookmarkController;
