import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import ModifyController from '@/models/modify/ModifyController';

interface PageProps {
  postId: string;
}

const Modify: NextPage<PageProps> = ({ postId }) => {
  return <ModifyController postId={postId} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postId = params?.id;

  if (!Array.isArray(postId) && postId !== undefined) {
    return {
      props: {
        postId,
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

export default Modify;
