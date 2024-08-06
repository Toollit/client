import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';
import Head from 'next/head';
import { projectDetailFetcher } from '@/apis/fetcher/projectDetailFetcher';
import ProjectDetailController from '@/models/project/detail/ProjectDetailController';
import { ENDPOINTS } from '@/apis/endpoints';
import { ProjectDetail } from '@/typings';
import {
  ProjectWriter,
  projectWriterFetcher,
} from '@/apis/fetcher/projectWriterFetcher';
import {
  ProjectMember,
  projectMembersFetcher,
} from '@/apis/fetcher/projectMembersFetcher';

interface PageProps {
  fallback: {
    [key: string]: ProjectDetail | ProjectWriter | ProjectMember[];
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
    const projectDetailApiEndpoint = ENDPOINTS.GET.PROJECT_DETAIL(postId);
    const projectWriterApiEndpoint = ENDPOINTS.GET.PROJECT_WRITER(postId);
    const projectMembersApiEndpoint = ENDPOINTS.GET.PROJECT_MEMBERS(postId);

    const projectDetailKey = JSON.stringify({
      url: projectDetailApiEndpoint,
      args: { page: `/project/${postId}`, tag: `project${postId}` },
    });

    const projectWriterKey = JSON.stringify({
      url: projectWriterApiEndpoint,
      args: { page: `/project/${postId}`, tag: `project${postId}Writer` },
    });

    const projectMembersKey = JSON.stringify({
      url: projectMembersApiEndpoint,
      args: { page: `/project/${postId}`, tag: `project${postId}Members` },
    });

    try {
      const [projectDetail, projectWriter, projectMembers] = await Promise.all([
        projectDetailFetcher({
          url: projectDetailApiEndpoint,
        }),
        projectWriterFetcher({
          url: projectWriterApiEndpoint,
        }),
        projectMembersFetcher({
          url: projectMembersApiEndpoint,
        }),
      ]);

      if (!projectDetail) {
        return {
          redirect: {
            permanent: false,
            destination: '/404',
          },
        };
      }

      const { title, representativeImage } = projectDetail?.data;

      return {
        props: {
          fallback: {
            [projectDetailKey]: projectDetail,
            [projectWriterKey]: projectWriter,
            [projectMembersKey]: projectMembers,
          },
          title,
          representativeImage,
        },
      };
    } catch (error) {
      console.error('Error fetching project detail data:', error);
      return {
        redirect: {
          permanent: false,
          destination: '/notice/error',
        },
      };
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: '/notice/error',
    },
  };
};

export default Project;
