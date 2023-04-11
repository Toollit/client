import React, { useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import ProjectCreateView, { ProjectCreateViewProps } from './ProjectCreateView';
import { createProjectAPI } from '@/apis/project/createProject';
import useEditorContent from '@/hooks/useEditorContent';
import { errorMessage } from '@/utils/errorMessage';

const ProjectCreateController = () => {
  const router = useRouter();

  const { titleRef, editorRef, setUploadImageUrls, handleData } =
    useEditorContent();

  const hashtagRef = useRef<string[]>([]);
  const memberTypeRef = useRef<('developer' | 'designer' | 'pm' | 'anyone')[]>(
    [],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = handleData(titleRef, editorRef);
      if (!data) return;

      if (!(hashtagRef.current && memberTypeRef.current)) return;

      if (hashtagRef.current.length < 1) {
        return alert('해시태그를 하나 이상 입력하세요.');
      }

      if (memberTypeRef.current.length < 1) {
        return alert('모집인원 타입을 하나 이상 선택하세요.');
      }

      const projectData = {
        title: data?.title,
        contentHTML: data?.contentHTML,
        contentMarkdown: data?.contentMarkdown,
        imageUrls: data?.imageUrls,
        hashtags: hashtagRef.current,
        memberTypes: memberTypeRef.current,
      };

      try {
        const response = await createProjectAPI(projectData);

        if (response?.success) {
          router.push({
            pathname: `/project/[id]`,
            query: { id: response.data.projectId },
          });
        }
      } catch (error) {
        errorMessage(error);
      }
    },
    [router, editorRef, titleRef, handleData, hashtagRef],
  );

  const props: ProjectCreateViewProps = {
    handleSubmit,
    titleRef,
    editorRef,
    setUploadImageUrls,
    hashtagRef,
    memberTypeRef,
  };
  return <ProjectCreateView {...props} />;
};

export default ProjectCreateController;
