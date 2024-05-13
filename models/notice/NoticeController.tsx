import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import NoticeView, { ViewProps } from './NoticeView';
import noticeData from './noticeData.json';

export interface Notice {
  id: number;
  date: string;
  title: string;
  content: string[];
}

type Keys = keyof typeof noticeData;

export interface ControllerProps {}

const NoticeController: FC<ControllerProps> = ({}) => {
  const [notices, setNotices] = useState<Notice[]>([]);

  const SearchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchNotice = useCallback(
    (e: React.KeyboardEvent<HTMLFormElement>) => {
      e.preventDefault();

      SearchInputRef.current?.blur();
    },
    [],
  );

  useEffect(() => {
    for (const key in noticeData) {
      const notice = noticeData[key as Keys];
      setNotices((prev) => [...prev, notice]);
    }
  }, []);

  const props: ViewProps = {
    handleSearchNotice,
    SearchInputRef,
    data: notices,
  };

  return <NoticeView {...props} />;
};

export default NoticeController;
