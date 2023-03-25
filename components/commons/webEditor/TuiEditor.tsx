import React, { useCallback, useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { EditorType, HookMap } from '@toast-ui/editor';
import {
  TuiCustomGlobalStyles,
  TuiFormContainer,
  TitleInputContainer,
  TitleInput,
  ButtonContainer,
  Button,
} from './TuiEditorStyles';
import Title from '../title';
import { uploadImageAPI } from '@/apis/project/uploadImage';
import path from 'path';

interface TuiEditorProps {
  title: string;
}

const TuiEditor = ({ title }: TuiEditorProps) => {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    editorRef.current.getRootElement().classList.add('Tui-editor-root');
  }, []);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      console.log('handleClick ===>', editorRef.current.getInstance());

      const wysiwygNodeList =
        editorRef.current.getInstance().wwEditor.view.state.doc.content.content;

      for (let i = 0; i < wysiwygNodeList.length; i++) {}
    },

    [],
  );

  const handleEditType = useCallback((editorType: EditorType) => {
    if (editorType === 'markdown') {
    }
    if (editorType === 'wysiwyg') {
    }
  }, []);

  const createAltText = (file: Blob | File) => {
    const ext = path.extname(file.name); // 확장자 추출 .jpeg
    const fileName = path.basename(file.name, ext); // 확장자 없는 filename

    return fileName;
  };

  return (
    <>
      <TuiCustomGlobalStyles />
      <TuiFormContainer>
        <Title text={title} />
        <TitleInputContainer>
          <TitleInput />
        </TitleInputContainer>
        <br />
        <Editor
          height='50rem'
          initialEditType='wysiwyg'
          useCommandShortcut={true}
          ref={editorRef}
          onChange={handleEditType}
          language='ko-kr'
          hooks={{
            addImageBlobHook: async (file, callback) => {
              console.log('file ===>', file);
              const formData = new FormData();
              formData.append('postImage', file);

              let response;
              try {
                response = await uploadImageAPI(formData);
              } catch (error) {
                alert('문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
              }

              const imageUrl = response?.data.url;

              let imageDescriptionInput;
              try {
                imageDescriptionInput = document.getElementById(
                  'toastuiAltTextInput',
                ) as HTMLInputElement;

                const altText = createAltText(file);

                if (imageUrl) {
                  callback(imageUrl, imageDescriptionInput.value ?? altText);
                }
              } catch (error) {
                // imageDescriptionInput null error
                const altText = createAltText(file);

                if (imageUrl) {
                  callback(imageUrl, altText);
                }
              }

              return false;
            },
          }}
        />
        <ButtonContainer>
          <Button onClick={handleClick}>작성 완료</Button>
        </ButtonContainer>
      </TuiFormContainer>
    </>
  );
};

export default TuiEditor;
