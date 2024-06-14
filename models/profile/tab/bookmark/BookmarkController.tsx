import React, { FC, useCallback, useEffect, useState } from 'react';
import BookmarkView, { ViewProps } from './BookmarkView';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { bookmarksStatusKey, profileBookmarksKey } from '@/apis/keys';
import {
  ProfileBookmarksAPIRes,
  profileBookmarksFetcher,
} from '@/apis/profileBookmarksFetcher';
import { errorMessage } from '@/apis/errorMessage';
import { serialize } from '@/middleware/swr/serialize';
import useCachedKeys from '@/hooks/useCachedKeys';
import { ProfileTab } from '@/models/profile/ProfileController';
import { updateSwipeableViewHeight } from '@/features/swipeableView';
import { useAppDispatch, useAppSelector } from '@/store';
import useWindowSize from '@/hooks/useWindowSize';
import {
  BookmarksStatusAPIRes,
  bookmarksStatusFetcher,
} from '@/apis/bookmarksStatusFetcher';

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

interface BookmarkData {
  isLoaded: boolean;
  data: ProfileBookmarksAPIRes['data'] | null;
}

interface ControllerProps {}

const BookmarkController: FC<ControllerProps> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { getCachedData } = useCachedKeys();
  const { isLaptop } = useWindowSize();

  const isRegisteredUser = useAppSelector(
    (state) => state.profile.isRegisteredUser,
  );
  const profileUserNickname = useAppSelector(
    (state) => state.profile.userNickname,
  );
  const tab = useAppSelector((state) => state.profile.tab);

  const [data, setData] = useState<BookmarkData>({
    isLoaded: false,
    data: null,
  });
  const [bookmarkPostCount, setBookmarkPostCount] = useState(5); // Load by 5

  const { data: profileBookmarksData } = useSWR(
    isRegisteredUser && tab === 'viewBookmarks' && profileUserNickname
      ? {
          url: profileBookmarksKey(profileUserNickname, bookmarkPostCount),
          args: {
            page: '/profile',
            tag: `profileBookmarks?count=${bookmarkPostCount}`,
          },
        }
      : null,
    profileBookmarksFetcher,
    {
      dedupingInterval: 1000 * 60 * 10,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError(err, key, config) {
        errorMessage(err);
        router.back();
      },
      onSuccess(res, key, config) {
        if (bookmarkPostCount > 5) {
          setData((prev) => {
            return {
              isLoaded: true,
              data:
                prev.data?.bookmarks && res?.data
                  ? {
                      bookmarks: [
                        ...prev.data?.bookmarks,
                        ...res.data?.bookmarks,
                      ],

                      total: res.data?.total,
                    }
                  : null,
            };
          });
        }

        if (bookmarkPostCount <= 5) {
          setData({
            isLoaded: true,
            data: res?.data,
          });
        }
      },
      use: [serialize],
    },
  );

  const { data: bookmarksStatusData } = useSWR(
    isRegisteredUser && tab === 'viewBookmarks' && profileUserNickname
      ? {
          url: bookmarksStatusKey(),
          args: { page: '/', tag: 'bookmarksStatus' },
        }
      : null,
    bookmarksStatusFetcher,
    {
      dedupingInterval: 60 * 10 * 1000,
      errorRetryCount: 0,
      onError(err, key, config) {
        errorMessage(err);
      },
      use: [serialize],
    },
  );

  const handleProcessedData = useCallback(
    ({
      bookmarkProjectsData,
      bookmarksStatusData,
    }: {
      bookmarkProjectsData?: ProfileBookmarksAPIRes['data'];
      bookmarksStatusData?: BookmarksStatusAPIRes['data'];
    }) => {
      if (!bookmarkProjectsData || !bookmarksStatusData) {
        return;
      }
      // member type convert. developer -> Developer, designer -> Designer, pm -> PM, anyone -> Anyone
      const convertedMemberTypes = bookmarkProjectsData?.bookmarks?.map(
        (project) => {
          return {
            ...project,
            memberTypes: project.memberTypes.map((type) => {
              return type === 'pm'
                ? type.toUpperCase()
                : type.charAt(0).toUpperCase() + type.slice(1);
            }) as CustomMemberTypes,
          };
        },
      );

      const bookmarks = bookmarksStatusData?.bookmarks;

      const bookmarksStatusCheck = convertedMemberTypes?.map((project) => {
        return bookmarks?.includes(project.id)
          ? { ...project, bookmark: true }
          : { ...project, bookmark: false };
      });

      const projects = bookmarksStatusCheck;

      return {
        bookmarks: projects,
        total: bookmarkProjectsData.total,
        showLoadMore:
          bookmarkProjectsData.bookmarks?.length !== bookmarkProjectsData.total,
      };
    },
    [],
  );

  const handleBookmarkLoadMore = useCallback(() => {
    setBookmarkPostCount((prev) => prev + 5);

    const profileBookmarksCachedData = getCachedData({
      tag: `profileBookmarks?count=${bookmarkPostCount + 5}`,
    }) as ProfileBookmarksAPIRes['data'];

    if (profileBookmarksCachedData) {
      setData((prev) => {
        return {
          isLoaded: true,
          data:
            prev.data?.bookmarks && profileBookmarksCachedData
              ? {
                  bookmarks: [
                    ...prev.data?.bookmarks,
                    ...profileBookmarksCachedData.bookmarks,
                  ],

                  total: prev.data.total,
                }
              : null,
        };
      });
    }
  }, [bookmarkPostCount, getCachedData]);

  // The reason data is write in the dependencies is to adjust the screen size when the data is updated.
  // Works only in non-desktop versions
  useEffect(() => {
    if (isLaptop !== null && !isLaptop) {
      dispatch(updateSwipeableViewHeight(true));
    }
  }, [data, dispatch, isLaptop]);

  // 프로필 페이지 특정 탭에 있다가 다른 페이지 다녀온 경우 캐싱 된 데이터가 존재하는 경우 state 업데이트
  useEffect(() => {
    if (!profileUserNickname) {
      return;
    }

    const profileBookmarksCachedData: ProfileBookmarksAPIRes['data'] =
      getCachedData({
        tag: `profileBookmarks?count=${bookmarkPostCount}`,
      });

    if (!data.isLoaded && profileBookmarksCachedData) {
      setData({
        isLoaded: true,
        data: profileBookmarksCachedData,
      });
    }
  }, [
    dispatch,
    data,
    profileBookmarksData,
    profileUserNickname,
    bookmarkPostCount,
    getCachedData,
  ]);

  const props: ViewProps = {
    data: handleProcessedData({
      bookmarkProjectsData: profileBookmarksData?.data,
      bookmarksStatusData: bookmarksStatusData?.data,
    }),
    loadMore: handleBookmarkLoadMore,
  };

  return <BookmarkView {...props} />;
};

export default BookmarkController;
