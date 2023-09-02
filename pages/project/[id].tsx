import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';
import Head from 'next/head';
import {
  projectDetailFetcher,
  ProjectDetail,
} from '@/apis/projectDetailFetcher';
import ProjectDetailController from '@/models/project/ProjectDetailController';
import { projectDetailKey } from '@/apis/keys';

interface PageProps {
  fallback: {
    [key: string]: ProjectDetail;
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
  const postId = params?.id;

  if (!Array.isArray(postId) && postId !== undefined) {
    const apiEndpoint = projectDetailKey(postId);
    const key = JSON.stringify({
      url: apiEndpoint,
      args: { page: `/project/${postId}`, tag: `project/${postId}` },
    });

    const projectDetail = await projectDetailFetcher({ url: apiEndpoint });

    return {
      props: {
        fallback: {
          [key]: projectDetail,
        },
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: '/notice/error',
    },
  };
};

export default Project;
