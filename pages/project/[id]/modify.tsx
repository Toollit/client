import React from 'react';
import { GetServerSideProps } from 'next';
import ModifyController from '@/models/project/modify/ModifyController';

interface ModifyPageProps {
  postId: string;
}

const Modify = ({ postId }: ModifyPageProps) => {
  return <ModifyController postId={postId} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postId = params?.id;

  return {
    props: {
      postId,
    },
  };
};

export default Modify;
