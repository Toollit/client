import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import {
  projectDetailFetcher,
  ProjectDetail,
} from '@/apis/projectDetailFetcher';
import ProjectDetailController from '@/models/project/ProjectDetailController';
import { getProjectDetailKey } from '@/apis/keys';

interface PageProps {
  fallback: {
    [getProjectDetailKey: string]: ProjectDetail;
  };
}

const Project: NextPage<PageProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Head>
        <title>프로젝트</title>
      </Head>
      <ProjectDetailController />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postId = params?.id as string;

  const projectDetail = await projectDetailFetcher(getProjectDetailKey(postId));

  return {
    props: {
      fallback: {
        [getProjectDetailKey(postId)]: projectDetail,
      },
    },
  };
};

export default Project;
