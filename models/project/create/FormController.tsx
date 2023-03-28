import React, { useCallback, useRef } from 'react';
import FormView, { FormViewProps } from './FormView';
import useInput from 'hooks/useInput';
import { addProjectAPI } from '@/apis/project/addProject';

const FormController = () => {
  const [title, onChangeTitle] = useInput('');

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

      if (title) {
        try {
          const response = addProjectAPI({ title, contentHtml, contentMark });
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
    },
    [title],
  );

  const props: FormViewProps = {
    title,
    onChangeTitle,
    handleSubmit,
    editorRef,
  };
  return <FormView {...props} />;
};

export default FormController;
