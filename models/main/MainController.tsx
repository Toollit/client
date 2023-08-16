import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import MainView, { MainViewProps } from './MainView';
import { getProjectsFetcher } from '@/apis/getProjectsFetcher';
import { getProjectsBookmarkCheckKey, getProjectsKey } from '@/apis/keys';
import { errorMessage } from '@/apis/errorMessage';
import useAuth from '@/hooks/useAuth';
import { projectsBookmarkCheckFetcher } from '@/apis/projectsBookmarkCheckFetcher';

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

interface Props {
  pageNumber: number;
  orderValue: 'new' | 'popularity';
}

const MainController = ({ pageNumber = 1, orderValue = 'new' }: Props) => {
  const router = useRouter();
  const { authMutate } = useAuth();

  const [page, setPage] = useState(pageNumber);
  const [order, setOrder] = useState<'new' | 'popularity'>(orderValue);

  const { data: projectsRes } = useSWR(
    getProjectsKey(page, order),
    getProjectsFetcher,
    {
      dedupingInterval: 60 * 10 * 1000,
      revalidateOnMount: false,
      errorRetryCount: 0,
      onError(err, key, config) {
        errorMessage(err);
      },
    },
  );

  const { data: bookmarksRes } = useSWR(
    getProjectsBookmarkCheckKey(),
    projectsBookmarkCheckFetcher,
    {
      dedupingInterval: 60 * 10 * 1000,
      errorRetryCount: 0,
      onError(err, key, config) {
        errorMessage(err);
      },
    },
  );

  const createProject = useCallback(async () => {
    try {
      const auth = await authMutate();

      if (auth?.success) {
        router.push('/project/create');
      } else {
        alert('로그인 후 이용 가능합니다.');
        router.push('/login');
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [router, authMutate]);

  const handleProcessData = useCallback(() => {
    const projects = projectsRes?.data.projects;
    const bookmarks = bookmarksRes?.data.bookmarks;

    // bookmark checking
    const resultBookmarkCheckProjects = projects?.map((project) => {
      return bookmarks?.includes(project.id)
        ? { ...project, bookmark: true }
        : { ...project, bookmark: false };
    });

    // memeber type convert. developer -> Developer, designer -> Designer, pm -> PM, anyone -> Anyone
    const resultMemberTypeConverter = resultBookmarkCheckProjects?.map(
      (project) => {
        return {
          ...project,
          memberTypes: project.memberTypes?.map((type) => {
            return type === 'pm'
              ? type.toUpperCase()
              : type.charAt(0).toUpperCase() + type.slice(1);
          }) as CustomMemberTypes,
        };
      },
    );

    return resultMemberTypeConverter;
  }, [projectsRes, bookmarksRes]);

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
    projects: handleProcessData(),
    createProject,
    pagination: {
      totalPage: projectsRes?.data.totalPage ? projectsRes.data.totalPage : 1,
    },
  };

  return <MainView {...props} />;
};

export default MainController;
