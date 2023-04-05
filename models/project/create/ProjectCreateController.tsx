import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import ProjectCreateView, { ProjectCreateViewProps } from './ProjectCreateView';
import { addProjectAPI } from '@/apis/project/addProject';
import useEditorContent from '@/hooks/useEditorContent';
import { errorMessage } from '@/utils/errorMessage';

const ProjectCreateController = () => {
  const router = useRouter();

  const { titleRef, editorRef, setUploadImageUrls, handleData } =
    useEditorContent();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const { title, contentHtml, contentMark, imageUrls } = handleData(
        titleRef,
        editorRef,
      );

      if (!title) {
        return alert('제목을 입력해주세요.');
      }

      if (title.length > 50) {
        return alert('제목은 50자 이하로 작성 가능합니다.');
      }

      if (!contentMark) {
        return alert('내용을 입력해주세요.');
      }

      try {
        const response = await addProjectAPI({
          title,
          contentHtml,
          contentMark,
          imageUrls,
        });

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
    [router, editorRef, titleRef, handleData],
  );

  const props: ProjectCreateViewProps = {
    handleSubmit,
    titleRef,
    editorRef,
    setUploadImageUrls,
  };
  return <ProjectCreateView {...props} />;
};

export default ProjectCreateController;
