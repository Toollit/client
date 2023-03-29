import React, { useCallback, useEffect } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { EditorType } from '@toast-ui/editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { TuiCustomGlobalStyles, TuiContainer } from './TuiEditorStyles';
import fontSize from 'tui-editor-plugin-font-size';
import 'tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css';
import { uploadImageAPI } from '@/apis/project/uploadImage';
import path from 'path';
import Label from 'components/commons/label';
import axios from 'axios';
import { AxiosErrorData } from 'apis/types';

interface TuiEditorProps {
  editorRef: React.MutableRefObject<any>;
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

const TuiEditor = ({ editorRef, setImageUrls }: TuiEditorProps) => {
  useEffect(() => {
    editorRef.current.getRootElement().classList.add('Tui-editor-root');
  }, [editorRef]);

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
      <TuiContainer>
        <Label htmlFor='content' text='내용' />
        <Editor
          height='50rem'
          initialEditType='wysiwyg'
          useCommandShortcut={true}
          ref={editorRef}
          onChange={handleEditType}
          language='ko-kr'
          plugins={[colorSyntax, fontSize]}
          hooks={{
            addImageBlobHook: async (file, callback) => {
              const formData = new FormData();
              formData.append('postImage', file);

              const response = await uploadImageAPI(formData).catch((error) => {
                if (axios.isAxiosError<AxiosErrorData>(error)) {
                  alert(error.response?.data.message);
                }
              });

              const imageUrl = response?.data.url;
              if (imageUrl) {
                setImageUrls((prev) => [...prev, imageUrl]);
              }

              try {
                const imageDescriptionInput = document.getElementById(
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
      </TuiContainer>
    </>
  );
};

export default TuiEditor;
