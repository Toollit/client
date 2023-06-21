import React, { useCallback, useEffect } from 'react';
import MainView, { MainViewProps } from './MainView';
import { useRouter } from 'next/router';
import { getProjectsFetcher } from '@/apis/getProjectsFetcher';
import { getProjectsKey } from '@/apis/keys';
import useSWR from 'swr';
import { errorMessage } from '@/apis/errorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { resetPage, updateTotalPage } from '@/features/pagination';
import { updatePostOrder } from '@/features/order';
import useAuth from '@/hooks/useAuth';

const MainController = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const page = useSelector((state: RootState) => state.pagination.page);
  const order = useSelector((state: RootState) => state.postOrder.order);

  const { isAuthenticated } = useAuth();

  const { data } = useSWR(getProjectsKey(page, order), getProjectsFetcher, {
    revalidateOnMount: false,
    errorRetryCount: 0,
    onError(err, key, config) {
      errorMessage(err);
    },
  });

  const createProject = useCallback(() => {
    if (isAuthenticated) {
      router.push('/project/create');
    } else {
      alert('로그인 후 이용 가능합니다.');
      router.push('/login');
    }
  }, [router, isAuthenticated]);

  useEffect(() => {
    if (data) {
      dispatch(updateTotalPage({ totalPage: data.totalPage }));
    }
  }, [dispatch, data]);

  useEffect(() => {
    return () => {
      dispatch(updateTotalPage({ totalPage: 1 }));
      dispatch(updatePostOrder({ order: null }));
      dispatch(resetPage());
    };
  }, [dispatch]);

  const props: MainViewProps = {
    projects: data?.projects,
    createProject,
  };

  return <MainView {...props} />;
};

export default MainController;
