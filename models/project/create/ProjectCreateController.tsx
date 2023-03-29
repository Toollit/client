import React, { useCallback, useRef, useState } from 'react';
import FormView, { ProjectCreateViewProps } from './ProjectCreateView';
import useInput from 'hooks/useInput';
import { addProjectAPI } from '@/apis/project/addProject';

const ProjectCreateController = () => {
  const [title, onChangeTitle] = useInput('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const editorRef = useRef<any>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const editorInstance = editorRef.current.getInstance();
      // console.log('handleClick ===>', editorRef.current.getInstance());
      const contentHtml = editorInstance.getHTML();
      const contentMark = editorInstance.getMarkdown();
      console.log('title ====>', title);
      console.log('contentHtml ====>', contentHtml);
      console.log('contentMark ====>', contentMark);
      console.log('images ====>', imageUrls);

      if (title) {
        try {
          const response = addProjectAPI({
            title,
            contentHtml,
            contentMark,
            imageUrls,
          });
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
    },
    [title, imageUrls],
  );

  const props: ProjectCreateViewProps = {
    title,
    onChangeTitle,
    handleSubmit,
    editorRef,
    setImageUrls,
  };
  return <FormView {...props} />;
};

export default ProjectCreateController;
