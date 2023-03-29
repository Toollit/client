import React from 'react';
import dynamic from 'next/dynamic';
import Title from 'components/commons/title';
import { GetProjectDetailAPIResData } from 'apis/project/getProjectDetail';

const DynamicTuiViewer = dynamic(
  () => import('@/components/commons/webEditor/TuiView'),
  {
    ssr: false,
  },
);

export interface ProjectViewProps {
  data: GetProjectDetailAPIResData;
}

const ProjectView = ({ data }: ProjectViewProps) => {
  const {
    title,
    createdAt,
    updatedAt,
    views,
    user,
    contentHTML,
    contentMarkdown,
  } = data;

  return (
    <div>
      <Title text={title} />
      <ul>
        <li>{user.nickname}</li>
        <li>{createdAt}</li>
        {updatedAt ?? <li>{updatedAt}</li>}
        <li>{views}</li>
      </ul>
      <DynamicTuiViewer content={contentHTML} />
    </div>
  );
};

export default ProjectView;
