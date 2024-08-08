import React from 'react';
import { NextPage } from 'next';
import ModifyController from '@/models/modify/ModifyController';

interface PageProps {}

const Modify: NextPage<PageProps> = () => {
  return <ModifyController />;
};

export default Modify;
