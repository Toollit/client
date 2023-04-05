import React, { useCallback, useEffect } from 'react';
import path from 'path';
import Label from '@/components/commons/label';
import { uploadImageAPI } from '@/apis/project/uploadImage';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import fontSize from 'tui-editor-plugin-font-size';
import 'tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css';
import { errorMessage } from '@/utils/errorMessage';
import {
  TuiCustomGlobalStyles,
  TuiContainer,
  TitleInputContainer,
  TitleInput,
} from './TuiEditorStyles';

interface TuiEditorProps {
  titleRef: React.RefObject<HTMLInputElement>;
  editorRef: React.MutableRefObject<any>;
  setUploadImageUrls: React.Dispatch<
    React.SetStateAction<{ url: string; fileSize: number }[]>
  >;
}
/**
 * @param titleRef - 제목 값을 받아오기 위한 ref
 * @param editorRef - Tui Editor 컨텐츠 값을 받아오기 위한 ref
 * @param setUploadImageUrls - 게시글 작성중 업로드된 모든 사진 목록을 배열로 저장한다. 작성중 수정으로인해 삭제된 이미지를 s3에서 삭제하기 위해서 저장
 */
const TuiEditor = ({
  titleRef,
  editorRef,
  setUploadImageUrls,
}: TuiEditorProps) => {
  useEffect(() => {
    editorRef.current.getRootElement().classList.add('Tui-editor-root');
  }, [editorRef]);

  const handleFilteringFile = useCallback((blob: Blob | File) => {
    if (
      !(
        blob.type === 'image/jpeg' ||
        blob.type === 'image/jpg' ||
        blob.type === 'image/png'
      )
    ) {
      alert('jpg, jpeg, png 파일만 가능합니다.');
      return false;
    }

    const limitFileSizeMb = 10 * 1024 * 1024;

    if (blob.size >= limitFileSizeMb) {
      alert(
        '이미지는 10MB 미만 3개까지, JPG/JPEG/PNG 형식만 등록 할 수 있습니다.',
      );
      return false;
    }

    return true;
  }, []);

  const uploadImage = useCallback(async (blob: Blob | File) => {
    const formData = new FormData();
    formData.append('postImage', blob);

    try {
      const response = await uploadImageAPI(formData);

      const imageUrl = response?.data.url;

      return imageUrl;
    } catch (error) {
      errorMessage(error);
    }
  }, []);

  const createAltText = useCallback((blob: Blob | File) => {
    const ext = path.extname(blob.name); // 확장자 추출 .jpeg
    const fileName = path.basename(blob.name, ext); // 확장자 없는 filename

    return fileName;
  }, []);

  const handleAltText = useCallback(
    (blob: Blob | File) => {
      const altText = createAltText(blob);

      try {
        const imageDescriptionInput = document.getElementById(
          'toastuiAltTextInput',
        ) as HTMLInputElement;

        return imageDescriptionInput.value ?? altText;
      } catch (error) {
        // imageDescriptionInput null error
        return altText;
      }
    },
    [createAltText],
  );

  return (
    <>
      <TuiCustomGlobalStyles />
      <TuiContainer>
        <TitleInputContainer>
          <Label htmlFor='title' text='제목' />
          <TitleInput name='title' ref={titleRef} />
        </TitleInputContainer>
        <br />

        <Label htmlFor='content' text='내용' />
        <Editor
          height='50rem'
          initialEditType='wysiwyg'
          useCommandShortcut={true}
          ref={editorRef}
          language='ko-kr'
          plugins={[colorSyntax, fontSize]}
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              const isAppropriateFile = handleFilteringFile(blob);

              if (!isAppropriateFile) {
                return;
              }

              const imageUrl = await uploadImage(blob);

              if (imageUrl) {
                setUploadImageUrls((prev) => [
                  ...prev,
                  { url: imageUrl, fileSize: blob.size },
                ]);
              } else {
                return;
              }

              const altText = handleAltText(blob);

              callback(imageUrl, altText);

              return false;
            },
          }}
        />
      </TuiContainer>
    </>
  );
};

export default TuiEditor;
