import React from 'react';
import type { NextPage } from 'next';
import ProjectCreateController from '@/models/project/create/ProjectCreateController';

interface PageProps {}

const ProjectCreateForm: NextPage<PageProps> = ({}) => {
  return <ProjectCreateController />;
};

export default ProjectCreateForm;
