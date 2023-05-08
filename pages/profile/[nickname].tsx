import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import ProfileController from '@/models/profile/ProfileController';

interface ProfileProps {}

const Profile: NextPage<ProfileProps> = () => {
  return <ProfileController />;
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
  return {
    props: {},
  };
};

export default Profile;
