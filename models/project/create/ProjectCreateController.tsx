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

      const data = handleData(titleRef, editorRef);
      if (data) {
        try {
          const response = await addProjectAPI(data);

          if (response?.success) {
            router.push({
              pathname: `/project/[id]`,
              query: { id: response.data.projectId },
            });
          }
        } catch (error) {
          errorMessage(error);
        }
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
