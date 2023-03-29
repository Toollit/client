import React from 'react';
import ProjectView, { ProjectViewProps } from './ProjectView';
import { GetProjectDetailAPIResData } from 'apis/project/getProjectDetail';

interface ProjectControllerProps {
  data: GetProjectDetailAPIResData;
}

const ProjectController = ({ data }: ProjectControllerProps) => {
  const props: ProjectViewProps = {
    data,
  };

  return <ProjectView {...props} />;
};

export default ProjectController;
