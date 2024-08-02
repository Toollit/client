import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';
import Head from 'next/head';
import { projectFetcher, ProjectContent } from '@/apis/fetcher/projectFetcher';
import ProjectDetailController from '@/models/project/detail/ProjectDetailController';
import { ENDPOINTS } from '@/apis/endpoints';

interface PageProps {
  fallback: {
    [key: string]: ProjectContent;
  };
  id: number;
  title: string;
  representativeImage: string;
}

const Project: NextPage<PageProps> = ({
  fallback,
  id,
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
        <meta
          property='og:url'
          content={`https://toollit.com/project/${id}`}
          key='url'
        />
      </Head>
      <ProjectDetailController />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postId = params?.id;

  if (!Array.isArray(postId) && postId !== undefined) {
    const apiEndpoint = ENDPOINTS.GET.PROJECT_DETAIL(postId);

    const key = JSON.stringify({
      url: apiEndpoint,
      args: { page: `/project/${postId}`, tag: `project${postId}` },
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
