import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import ProjectCreateView, { ProjectCreateViewProps } from './ProjectCreateView';
import { addProjectAPI } from '@/apis/project/addProject';
import useEditorContent from '@/hooks/useEditorContent';

const ProjectCreateController = () => {
  const router = useRouter();

  const { title, onChangeTitle, editorRef, setUploadImageUrls, data } =
    useEditorContent();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const { title, contentHtml, contentMark, imageUrls } = data;

      if (!title) {
        return alert('제목을 입력해주세요.');
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
            query: { id: response.data.postId },
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [router, data],
  );

  const props: ProjectCreateViewProps = {
    handleSubmit,
    title,
    onChangeTitle,
    editorRef,
    setUploadImageUrls,
  };
  return <ProjectCreateView {...props} />;
};

export default ProjectCreateController;
