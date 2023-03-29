import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import {
  getProjectDetailAPI,
  GetProjectDetailAPIResData,
} from 'apis/project/getProjectDetail';
import ProjectController from '@/models/project/ProjectController';

interface PageProps {
  data: GetProjectDetailAPIResData;
}

const Post: NextPage<PageProps> = ({ data }) => {
  return <ProjectController data={data} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;

  const res = await getProjectDetailAPI({ postId: id as string });

  return {
    props: {
      data: res?.data,
    },
  };
};

export default Post;
