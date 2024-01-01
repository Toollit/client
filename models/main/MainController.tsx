import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import MainView, { MainViewProps } from './MainView';
import { ProjectsAPIRes, projectsFetcher } from '@/apis/projectsFetcher';
import { bookmarksStatusKey, projectsKey } from '@/apis/keys';
import { errorMessage } from '@/apis/errorMessage';
import useAuth from '@/hooks/useAuth';
import {
  BookmarksStatusAPIRes,
  bookmarksStatusFetcher,
} from '@/apis/bookmarksStatusFetcher';
import { serialize } from '@/middleware/swr/serialize';
import projectDefaultImage from 'public/static/images/project.jpg';

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

interface Props {
  pageNumber: number;
  postOrder: 'new' | 'popularity';
}

const MainController = ({ pageNumber = 1, postOrder = 'new' }: Props) => {
  const router = useRouter();
  const { authMutate } = useAuth();

  const [page, setPage] = useState(pageNumber);
  const [order, setOrder] = useState<'new' | 'popularity'>(postOrder);

  const { data: projects } = useSWR(
    {
      url: projectsKey(page, order),
      args: { page: '/', tag: 'projects' },
    },
    projectsFetcher,
    {
      dedupingInterval: 60 * 10 * 1000,
      revalidateOnMount: false,
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
      args: { page: '/', tag: 'bookmarksStatus' },
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

  const handleCreateProject = useCallback(async () => {
    try {
      const auth = await authMutate();

      if (auth?.success) {
        return router.push('/project/create');
      }

      if (!auth?.success) {
        const wantsToLogin = confirm('로그인 후 이용 가능합니다.');

        if (wantsToLogin) {
          return router.push('/login');
        }
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [router, authMutate]);

  const handleProcessData = useCallback(
    ({
      projectsData,
      bookmarksData,
    }: {
      projectsData?: ProjectsAPIRes['data'];
      bookmarksData?: BookmarksStatusAPIRes['data'];
    }) => {
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

  // Set up page and order to request data to the server
  useEffect(() => {
    const pageQuery = router.query['page'];
    const orderQuery = router.query['order'];

    // Preventing Infinite Requests
    if (router.asPath === '/') {
      if (page === 1 && order === 'new') {
        return;
      }
    }

    if (Array.isArray(pageQuery) || Array.isArray(orderQuery)) {
      return;
    }

    if (
      pageQuery === undefined ||
      orderQuery === undefined ||
      pageQuery === '' ||
      orderQuery === ''
    ) {
      setPage(1);
      setOrder('new');
      router.replace('/', undefined, { shallow: true });
      return;
    }

    if (orderQuery !== 'new' && orderQuery !== 'popularity') {
      return;
    }

    setPage(Number(pageQuery));
    setOrder(orderQuery);
  }, [router, page, order]);

  const props: MainViewProps = {
    projects: handleProcessData({
      projectsData: projects?.data,
      bookmarksData: bookmarks?.data,
    }),
    handleCreateProject,
    pagination: {
      totalPage: projects?.data?.totalPage ? projects?.data.totalPage : 1,
    },
  };

  return <MainView {...props} />;
};

export default MainController;
