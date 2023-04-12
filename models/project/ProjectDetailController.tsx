import React from 'react';
import ProjectDetailView, { ProjectDetailViewProps } from './ProjectDetailView';
import { GetProjectDetailAPIResData } from 'apis/project/getProjectDetail';
import { changeDateFormat, dateFromNow } from '@/utils/changeDateFormat';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface ProjectControllerProps {
  data: GetProjectDetailAPIResData;
}

const ProjectDetailController = ({ data }: ProjectControllerProps) => {
  const me = useSelector((state: RootState) => state.user.nickname);

  const props: ProjectDetailViewProps = {
    content: {
      title: data.content.title,
      createdAt: changeDateFormat({
        date: data.content.createdAt,
        format: 'YYMMDD_hhmm',
      }),
      updatedAt: changeDateFormat({
        date: data.content.updatedAt,
        format: 'YYMMDD_hhmm',
      }),
      views: data.content.views,
      nickname: data.writer.nickname,
      contentHTML: data.content.contentHTML,
      contentMarkdown: data.content.contentMarkdown,
      hashtags: data.content.hashtags,
      memberTypes: data.content.memberTypes,
    },
    writer: {
      nickname: data.writer.nickname,
      lastLoginAt: dateFromNow({
        date: data.writer.lastLoginAt,
      }),
      profileImage: data.writer.profileImage,
    },
    me: {
      nickname: me ? me : null,
    },

    //TODO comment 추가하기
    //TODO trending post 추가하기
  };

  return <ProjectDetailView {...props} />;
};

export default ProjectDetailController;
