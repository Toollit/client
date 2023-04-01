import React, { useCallback, useEffect, useState } from 'react';
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
  setUploadImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
}
/**
 *
 * @param editorRef - const editorRef = useRef<any>(null);를 부모컴포넌트로부터 전달받아야 한다.
 * @param setUploadImageUrls - 게시글 작성중 업로드된 모든 사진 목록을 배열로 저장한다. 작성중 삭제한 이미지를 삭제해하므로 일단 모든 사진 목록을 저장한다.
 */
const TuiEditor = ({ editorRef, setUploadImageUrls }: TuiEditorProps) => {
  useEffect(() => {
    editorRef.current.getRootElement().classList.add('Tui-editor-root');
  }, [editorRef]);

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
          language='ko-kr'
          plugins={[colorSyntax, fontSize]}
          hooks={{
            addImageBlobHook: async (file, callback) => {
              if (
                !(
                  file.type === 'image/jpeg' ||
                  file.type === 'image/jpg' ||
                  file.type === 'image/png'
                )
              ) {
                return alert('jpg, jpeg, png 파일만 가능합니다.');
              }

              const limitFileSizeMb = 10 * 1024 * 1024;

              if (file.size > limitFileSizeMb) {
                return alert('10mb 이하의 사진만 가능합니다.');
              }

              const formData = new FormData();
              formData.append('postImage', file);

              const response = await uploadImageAPI(formData).catch((error) => {
                if (axios.isAxiosError<AxiosErrorData>(error)) {
                  alert(error.response?.data.message);
                }
              });

              const imageUrl = response?.data.url;
              if (imageUrl) {
                setUploadImageUrls((prev) => [...prev, imageUrl]);
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
