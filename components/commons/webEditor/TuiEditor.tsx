import React, { useCallback, useEffect } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { EditorType } from '@toast-ui/editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { TuiCustomGlobalStyles, TuiContainer } from './TuiEditorStyles';
import { uploadImageAPI } from '@/apis/project/uploadImage';
import path from 'path';
import Label from 'components/commons/label';

interface TuiEditorProps {
  editorRef: React.MutableRefObject<any>;
}

const TuiEditor = ({ editorRef }: TuiEditorProps) => {
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
          plugins={[colorSyntax]}
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
      </TuiContainer>
    </>
  );
};

export default TuiEditor;
