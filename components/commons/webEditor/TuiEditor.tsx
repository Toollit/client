import React, { useCallback, useEffect } from 'react';
import path from 'path';
import Label from '@/components/commons/label';
import { uploadImageAPI } from '@/apis/uploadImage';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { HookMap } from '@toast-ui/editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import fontSize from 'tui-editor-plugin-font-size';
import 'tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css';
import { errorMessage } from '@/apis/errorMessage';
import { ProjectDetail } from '@/apis/getProjectDetailFetcher';
import {
  TuiCustomGlobalStyles,
  TuiContainer,
  TitleInputContainer,
  TitleInput,
} from './TuiEditorStyles';

type HookMapKey = keyof HookMap;

interface TuiEditorProps {
  titleRef: React.RefObject<HTMLInputElement>;
  editorRef: React.RefObject<Editor>;
  content?: ProjectDetail;
}
/**
 * @param titleRef - 제목 값을 받아오기 위한 ref
 * @param editorRef - Tui Editor 컨텐츠 값을 받아오기 위한 ref
 * @param content - 수정할 게시글 컨텐츠. modify 주소에서만 가져온다.
 */
const TuiEditor = ({ titleRef, editorRef, content }: TuiEditorProps) => {
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getRootElement().classList.add('Tui-editor-root');
    }
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

    const endpoint = '/api/post/project/content/uploadImage';

    try {
      const response = await uploadImageAPI(endpoint, formData);

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

        return imageDescriptionInput.value !== ''
          ? imageDescriptionInput.value
          : altText;
      } catch (error) {
        // imageDescriptionInput null error
        return altText;
      }
    },
    [createAltText],
  );

  const handleAddImageBlobHook: HookMap[HookMapKey] = async (
    blob,
    callback,
  ) => {
    const isAppropriateFile = handleFilteringFile(blob);

    if (!isAppropriateFile) {
      return;
    }

    const imageUrl = await uploadImage(blob);

    const altText = handleAltText(blob);

    if (imageUrl && altText) {
      callback(imageUrl, altText);
    }

    return false;
  };

  const handleKeydownSubmit = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      return event.preventDefault();
    }
  }, []);

  return (
    <>
      <TuiCustomGlobalStyles />
      <TuiContainer>
        <TitleInputContainer>
          <Label htmlFor='title' text='제목' />
          <TitleInput
            name='title'
            ref={titleRef}
            defaultValue={content?.content.title || ''}
            onKeyDown={handleKeydownSubmit}
          />
        </TitleInputContainer>
        <br />

        <Label htmlFor='content' text='내용' />
        {/* Editor에 initialValue로 contentMarkdown 정보를 넘겨주어야 한다. 
            contentHTML 전달 시 화면은 제대로 보이지만 수정시 또는 수정없이 그냥 다시 저장할때 markdown의 세세한 부분이 다르게 표기되어 제대로 적용되지 않는 문제가 발생한다. */}
        <Editor
          initialValue={content?.content.contentMarkdown || ''}
          height='50rem'
          initialEditType='wysiwyg'
          useCommandShortcut={true}
          ref={editorRef}
          language='ko-kr'
          plugins={[colorSyntax, fontSize]}
          hooks={{
            addImageBlobHook: handleAddImageBlobHook,
          }}
        />
      </TuiContainer>
    </>
  );
};

export default TuiEditor;
