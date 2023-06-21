import React, { useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import ProjectCreateView, { ProjectCreateViewProps } from './ProjectCreateView';
import { createProjectAPI } from '@/apis/createProject';
import useEditorContent from '@/hooks/useEditorContent';
import { errorMessage } from '@/apis/errorMessage';
import { useSWRConfig } from 'swr';
import { getProjectsKey } from '@/apis/keys';
import PrivateRoute from '@/components/PrivateRoute';

const ProjectCreateController = () => {
  const router = useRouter();

  const { mutate } = useSWRConfig();

  const { titleRef, editorRef, handleData } = useEditorContent();

  const hashtagRef = useRef<string[]>([]);
  const memberTypeRef = useRef<('developer' | 'designer' | 'pm' | 'anyone')[]>(
    [],
  );
  const recruitCountRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = handleData(titleRef, editorRef);
      if (!data) return;

      if (!(hashtagRef.current && memberTypeRef.current)) return;

      if (hashtagRef.current.length < 1) {
        return alert('해시태그를 하나 이상 입력하세요.');
      }

      if (hashtagRef.current.length > 15) {
        return alert('해시태그는 최대 10개까지 가능합니다.');
      }

      if (memberTypeRef.current.length < 1) {
        return alert('모집 타입을 하나 이상 선택하세요.');
      }

      const recruitCount = Number(recruitCountRef.current?.value);

      if (1 > recruitCount || 100 < recruitCount || 0 === recruitCount) {
        return alert('모집 인원은 숫자 1~100까지 가능합니다.');
      }

      const projectData = {
        title: data?.title,
        contentHTML: data?.contentHTML,
        contentMarkdown: data?.contentMarkdown,
        imageUrls: data?.imageUrls,
        hashtags: hashtagRef.current,
        memberTypes: memberTypeRef.current,
        recruitNumber: recruitCount,
      };

      try {
        const response = await createProjectAPI(projectData);

        if (response?.success) {
          mutate(getProjectsKey());
          const projectId = response.data.projectId;
          router.push(`/project/${projectId}`);
        }
      } catch (error) {
        errorMessage(error);
      }
    },
    [router, editorRef, titleRef, handleData, hashtagRef, mutate],
  );

  const handleKeydownSubmit = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        return event.preventDefault();
      }
    },
    [],
  );

  const props: ProjectCreateViewProps = {
    handleSubmit,
    titleRef,
    editorRef,
    hashtagRef,
    memberTypeRef,
    recruitCountRef,
    handleKeydownSubmit,
  };
  return (
    <PrivateRoute accessibleUser='authorized'>
      <ProjectCreateView {...props} />
    </PrivateRoute>
  );
};

export default ProjectCreateController;
