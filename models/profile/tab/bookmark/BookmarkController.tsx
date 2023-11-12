import React, { useCallback, useEffect, useState } from 'react';
import BookmarkView, { BookmarkViewProps } from './BookmarkView';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { profileBookmarksKey } from '@/apis/keys';
import {
  ProfileBookmarksAPIRes,
  profileBookmarksFetcher,
} from '@/apis/profileBookmarksFetcher';
import { errorMessage } from '@/apis/errorMessage';
import { serialize } from '@/middleware/swr/serialize';
import useCachedKeys from '@/hooks/useCachedKeys';
import { ProfileCurrentTab } from '@/models/profile/ProfileController';
import { updateSwipeableViewHeight } from '@/features/swipeableView';
import { useAppDispatch } from '@/store';

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

interface BookmarkData {
  isLoaded: boolean;
  data: ProfileBookmarksAPIRes['data'] | null;
}

export interface BookmarkControllerProps {
  currentTab: ProfileCurrentTab;
  isExistUser?: boolean;
  nickname: string;
}

const BookmarkController = ({
  currentTab,
  isExistUser,
  nickname,
}: BookmarkControllerProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { getCachedData } = useCachedKeys();

  const [data, setData] = useState<BookmarkData>({
    isLoaded: false,
    data: null,
  });
  const [bookmarkPostCount, setBookmarkPostCount] = useState(5); // Load by 5

  const { data: profileBookmarksData } = useSWR(
    isExistUser && currentTab === 'viewBookmarks' && nickname
      ? {
          url: profileBookmarksKey(nickname, bookmarkPostCount),
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

  const handleBookmarkDataResponse = useCallback(
    (data: ProfileBookmarksAPIRes['data'] | null) => {
      if (!data) {
        return null;
      }

      const convertedData = data?.bookmarks?.map((project) => {
        return {
          ...project,
          memberTypes: project.memberTypes.map((type) => {
            return type === 'pm'
              ? type.toUpperCase()
              : type.charAt(0).toUpperCase() + type.slice(1);
          }) as CustomMemberTypes,
        };
      });

      return {
        bookmarks: convertedData,
        total: data.total,
        showLoadMore: data.bookmarks?.length !== data.total,
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
  useEffect(() => {
    dispatch(updateSwipeableViewHeight(true));
  }, [data, dispatch]);

  // 프로필 페이지 특정 탭에 있다가 다른 페이지 다녀온 경우 캐싱 된 데이터가 존재하는 경우 state 업데이트
  useEffect(() => {
    if (!nickname) {
      return;
    }

    const profileBookmarksCachedData = getCachedData({
      tag: `profileBookmarks?count=${bookmarkPostCount}`,
    }) as ProfileBookmarksAPIRes['data'];

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
    nickname,
    bookmarkPostCount,
    getCachedData,
  ]);

  const props: BookmarkViewProps = {
    data: handleBookmarkDataResponse(data.data),
    loadMore: handleBookmarkLoadMore,
  };

  return <BookmarkView {...props} />;
};

export default BookmarkController;
