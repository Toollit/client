import React, { useCallback, useEffect, useState } from 'react';
import MainView, { MainViewProps } from './MainView';
import { useRouter } from 'next/router';
import { getProjectsFetcher } from '@/apis/getProjectsFetcher';
import { getProjectsKey } from '@/apis/keys';
import useSWR from 'swr';
import { errorMessage } from '@/apis/errorMessage';
import { useDispatch } from 'react-redux';
import { updateTotalPage } from '@/features/pagination';
import useAuth from '@/hooks/useAuth';

const MainController = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'new' | 'popularity'>('new');

  const { data } = useSWR(getProjectsKey(page, order), getProjectsFetcher, {
    revalidateOnMount: false,
    errorRetryCount: 0,
    onError(err, key, config) {
      errorMessage(err);
    },
    dedupingInterval: 60 * 10 * 1000,
  });

  const createProject = useCallback(() => {
    if (isAuthenticated) {
      router.push('/project/create');
    } else {
      alert('로그인 후 이용 가능합니다.');
      router.push('/login');
    }
  }, [router, isAuthenticated]);

  // Set total page for pagination
  useEffect(() => {
    if (data) {
      dispatch(updateTotalPage({ totalPage: data.totalPage }));
    }

    return () => {
      dispatch(updateTotalPage({ totalPage: 1 }));
    };
  }, [dispatch, data]);

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
    projects: data?.projects,
    createProject,
  };

  return <MainView {...props} />;
};

export default MainController;
