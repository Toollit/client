import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';
import Head from 'next/head';
import { projectFetcher, ProjectDetail } from '@/apis/projectFetcher';
import ProjectDetailController from '@/models/project/detail/ProjectDetailController';
import { projectDetailKey } from '@/apis/keys';

interface PageProps {
  fallback: {
    [key: string]: ProjectDetail;
  };
  title: string;
  representativeImage: string;
}

const Project: NextPage<PageProps> = ({
  fallback,
  title,
  representativeImage,
}) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Head>
        <title>프로젝트</title>
        <meta property='og:title' content='Toollit 프로젝트' key='title' />
        <meta property='og:description' content={title} key='description' />
        <meta property='og:image' content={representativeImage} key='image' />
        <meta property='og:url' content='https://toollit.com' key='url' />
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

    const projectDetail = await projectFetcher({ url: apiEndpoint });

    if (!projectDetail) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      };
    }

    const { title, representativeImage } = projectDetail?.data.content;

    return {
      props: {
        fallback: {
          [key]: projectDetail,
        },
        title,
        representativeImage,
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
