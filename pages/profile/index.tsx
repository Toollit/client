import React from 'react';
import { NextPage } from 'next';
import ProfileController from '@/models/profile/ProfileController';

interface ProfileProps {}

const Profile: NextPage<ProfileProps> = () => {
  return <ProfileController />;
};

export default Profile;
