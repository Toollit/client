import React, { useCallback, useEffect, useState } from 'react';
import SearchView, { SearchViewProps } from './SearchView';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { SearchAPIRes, searchFetcher } from '@/apis/searchFetcher';
import { serialize } from '@/middleware/swr/serialize';
import { bookmarksStatusKey, searchKey } from '@/apis/keys';
import projectDefaultImage from 'public/static/images/project.jpg';
import {
  BookmarksStatusAPIRes,
  bookmarksStatusFetcher,
} from '@/apis/bookmarksStatusFetcher';
import { errorMessage } from '@/apis/errorMessage';

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

export interface SearchControllerProps {}

const SearchController = ({}: SearchControllerProps) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string | undefined>('');
  const { q } = router.query;

  const { data: projects } = useSWR(
    searchText
      ? {
          url: searchKey(searchText),
          args: { page: `/search`, tag: `search` },
        }
      : null,
    searchFetcher,
    {
      // dedupingInterval: 60 * 10 * 1000,
      errorRetryCount: 0,
      onError(err, key, config) {
        errorMessage(err);
      },
      use: [serialize],
    },
  );

  const { data: bookmarks } = useSWR(
    {
      url: bookmarksStatusKey(),
      args: { page: '/search', tag: 'projectsBookmarksStatus' },
    },
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

  const handleProcessData = useCallback(
    ({
      projectsData,
      bookmarksData,
    }: {
      projectsData?: SearchAPIRes['data'];
      bookmarksData?: BookmarksStatusAPIRes['data'];
    }) => {
      if (!projectsData && !bookmarksData) {
        return;
      }
      const projects = projectsData?.projects;
      const bookmarks = bookmarksData?.bookmarks;

      // bookmark status checking
      const bookmarkStatusCheck = projects?.map((project) => {
        return bookmarks?.includes(project.id)
          ? { ...project, bookmark: true }
          : { ...project, bookmark: false };
      });

      // member type convert. developer -> Developer, designer -> Designer, pm -> PM, anyone -> Anyone
      const MemberTypeConvert = bookmarkStatusCheck?.map((project) => {
        return {
          ...project,
          memberTypes: project.memberTypes?.map((type) => {
            return type === 'pm'
              ? type.toUpperCase()
              : type.charAt(0).toUpperCase() + type.slice(1);
          }) as CustomMemberTypes,
        };
      });

      const imageFiltering = MemberTypeConvert?.map((project) => {
        return {
          ...project,
          representativeImage:
            project.representativeImage === 'defaultImage'
              ? projectDefaultImage
              : project.representativeImage,
        };
      });

      return imageFiltering;
    },
    [],
  );

  useEffect(() => {
    if (typeof q !== 'string') {
      return;
    }

    setSearchText(q);
  }, [router, q]);

  const props: SearchViewProps = {
    searchText,
    data: handleProcessData({
      projectsData: projects?.data,
      bookmarksData: bookmarks?.data,
    }),
  };

  return <SearchView {...props} />;
};

export default SearchController;
