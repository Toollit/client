import React from 'react';
import NoticeView, { NoticeViewProps } from './NoticeView';

export interface NoticeControllerProps {}

const NoticeController = ({}: NoticeControllerProps) => {
  const props: NoticeViewProps = {};

  return <NoticeView {...props} />;
};

export default NoticeController;
