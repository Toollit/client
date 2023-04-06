import React from 'react';
import ProjectView, { ProjectViewProps } from './ProjectView';
import { GetProjectDetailAPIResData } from 'apis/project/getProjectDetail';
import { changeDateFormat, dateFromNow } from '@/utils/changeDateFormat';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface ProjectControllerProps {
  data: GetProjectDetailAPIResData;
}

const ProjectController = ({ data }: ProjectControllerProps) => {
  const me = useSelector((state: RootState) => state.user.nickname);

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
    writer: {
      nickname: data.user.nickname,
      lastLoginAt: dateFromNow({
        date: data.user.lastLoginAt,
      }),
      profileImage: data.user.profileImage,
    },
    me: {
      nickname: me ? me : null,
    },
    //TODO comment 추가하기
    //TODO trending post 추가하기
  };

  return <ProjectView {...props} />;
};

export default ProjectController;
