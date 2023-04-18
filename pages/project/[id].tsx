import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';
import {
  getProjectDetailFetcher,
  getProjectDetailAPIKey,
  ProjectDetail,
} from '@/apis/useGetProjectDetail';
import ProjectDetailController from '@/models/project/ProjectDetailController';

interface PageProps {
  fallback: {
    [getProjectDetailAPIKey: string]: ProjectDetail;
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

  const projectDetail = await getProjectDetailFetcher(postId as string);

  return {
    props: {
      fallback: {
        [getProjectDetailAPIKey(postId as string)]: projectDetail,
      },
    },
  };
};

export default Post;
