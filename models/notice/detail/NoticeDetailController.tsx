import React, { FC, useEffect, useState } from 'react';
import NoticeDetailView, { ViewProps } from './NoticeDetailView';
import { useRouter } from 'next/router';
import noticeData from '../noticeData.json';

export interface Notice {
  id: number;
  date: string;
  title: string;
  content: string[];
}

type Keys = keyof typeof noticeData;

export interface ControllerProps {}

const NoticeDetailController: FC<ControllerProps> = ({}) => {
  const router = useRouter();
  const [notice, setNotice] = useState<Notice>();

  useEffect(() => {
    const postId = router.query.id as string;

    for (const key in noticeData) {
      const notice = noticeData[key as Keys];

      const noticeId = String(notice.id);

      if (noticeId === postId) {
        return setNotice(notice);
      }
    }
  }, [router]);

  const props: ViewProps = {
    data: notice,
  };

  return <NoticeDetailView {...props} />;
};

export default NoticeDetailController;
