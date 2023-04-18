import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';
import {
  getProjectDetailFetcher,
  ProjectDetail,
} from '@/apis/getProjectDetailFetcher';
import ProjectDetailController from '@/models/project/ProjectDetailController';
import { GET_PROJECT_DETAIL_API_ENDPOINT } from '@/apis/keys';

interface PageProps {
  fallback: {
    [GET_PROJECT_DETAIL_API_ENDPOINT: string]: ProjectDetail;
  };
}

const Post: NextPage<PageProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ProjectDetailController />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postId = params?.id;

  const projectDetail = await getProjectDetailFetcher(
    GET_PROJECT_DETAIL_API_ENDPOINT + `/${postId}`,
  );

  return {
    props: {
      fallback: {
        [GET_PROJECT_DETAIL_API_ENDPOINT + `/${postId}`]: projectDetail,
      },
    },
  };
};

export default Post;
