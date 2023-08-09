import React, { useCallback, useEffect, useState } from 'react';
import MainView, { MainViewProps } from './MainView';
import { useRouter } from 'next/router';
import { getProjectsFetcher } from '@/apis/getProjectsFetcher';
import { getProjectsBookmarkCheckKey, getProjectsKey } from '@/apis/keys';
import useSWR from 'swr';
import { errorMessage } from '@/apis/errorMessage';
import { useDispatch } from 'react-redux';
import { updateTotalPage } from '@/features/pagination';
import useAuth from '@/hooks/useAuth';
import { projectsBookmarkCheckFetcher } from '@/apis/projectsBookmarkCheckFetcher';

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

const MainController = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { authMutate } = useAuth();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'new' | 'popularity'>('new');

  const { data: projectsRes } = useSWR(
    getProjectsKey(page, order),
    getProjectsFetcher,
    {
      revalidateOnMount: false,
      errorRetryCount: 0,
      onError(err, key, config) {
        errorMessage(err);
      },
      dedupingInterval: 60 * 10 * 1000,
    },
  );

  const { data: bookmarksRes } = useSWR(
    getProjectsBookmarkCheckKey(),
    projectsBookmarkCheckFetcher,
    {
      errorRetryCount: 0,
      onError(err, key, config) {
        errorMessage(err);
      },
      dedupingInterval: 60 * 10 * 1000,
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
    const projects = projectsRes?.projects;
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
        console.log('test', project);
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

  // Set total page for pagination
  useEffect(() => {
    if (projectsRes) {
      dispatch(updateTotalPage({ totalPage: projectsRes.totalPage }));
    }

    return () => {
      dispatch(updateTotalPage({ totalPage: 1 }));
    };
  }, [dispatch, projectsRes]);

  // Set the current page and post order for pagination
  useEffect(() => {
    const page = router.query['page'];
    const order = router.query['order'];

    if (page === undefined || order === undefined) {
      setPage(1);
      setOrder('new');
      return;
    }

    if (Array.isArray(page) || Array.isArray(order)) {
      return;
    }

    if (order !== 'new' && order !== 'popularity') {
      return;
    }

    setPage(Number(page));
    setOrder(order);
  }, [router]);

  const props: MainViewProps = {
    projects: handleProcessData(),
    createProject,
  };

  return <MainView {...props} />;
};

export default MainController;
