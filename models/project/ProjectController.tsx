import React from 'react';
import ProjectView, { ProjectViewProps } from './ProjectView';
import { GetProjectDetailAPIResData } from 'apis/project/getProjectDetail';
import { changeDateFormat, dateFromNow } from '@/utils/changeDateFormat';

interface ProjectControllerProps {
  data: GetProjectDetailAPIResData;
}

const ProjectController = ({ data }: ProjectControllerProps) => {
  const props: ProjectViewProps = {
    content: {
      title: data.title,
      createdAt: changeDateFormat({
        date: data.createdAt,
        format: 'YYMMDD_hhmm',
      }),
      updatedAt: changeDateFormat({
        date: data.updatedAt,
        format: 'YYMMDD_hhmm',
      }),
      views: data.views,
      nickname: data.user.nickname,
      contentHTML: data.contentHTML,
      contentMarkdown: data.contentMarkdown,
    },
    user: {
      nickname: data.user.nickname,
      lastLoginAt: dateFromNow({
        date: data.user.lastLoginAt,
      }),
      profileImage: data.user.profileImage,
    },
    //TODO comment 추가하기
    //TODO trending post 추가하기
  };

  return <ProjectView {...props} />;
};

export default ProjectController;
