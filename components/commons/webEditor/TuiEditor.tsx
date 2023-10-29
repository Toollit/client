import React, { useCallback, useEffect } from 'react';
import path from 'path';
import Label from '@/components/commons/label';
import { ProjectDetail } from '@/apis/projectFetcher';
import { Editor } from '@toast-ui/react-editor';
import { HookMap } from '@toast-ui/editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import fontSize from 'tui-editor-plugin-font-size';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css';
import { TuiCustomGlobalStyles, TitleInput } from './TuiEditorStyles';
import useUploadImage from '@/hooks/useUploadImage';

type HookMapKey = keyof HookMap;

interface TuiEditorProps {
  titleRef: React.RefObject<HTMLInputElement>;
  editorRef: React.RefObject<Editor>;
  name: string;
  contentImageUploadUrl: string;
  content?: ProjectDetail | null;
}
/**
 * @props titleRef - 제목 값을 받아오기 위한 ref
 * @props editorRef - Tui Editor 콘텐츠 값을 받아오기 위한 ref
 * @props name - Tui Editor 콘텐츠 image upload에 사용될 name
 * @props contentImageUploadUrl - Tui Editor 콘텐츠 image upload에 사용될 url
 * @props content - 수정할 게시글 콘텐츠. modify 주소에서만 가져온다.
 */
const TuiEditor = ({
  titleRef,
  editorRef,
  name,
  contentImageUploadUrl,
  content,
}: TuiEditorProps) => {
  const { uploadSingleImage } = useUploadImage();

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
    const imageUrl = await uploadSingleImage({
      name,
      endPoint: contentImageUploadUrl,
      File: blob,
    });

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

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getRootElement().classList.add('Tui-editor-root');
      // initial value settings
      editorRef.current
        .getInstance()
        .setMarkdown(content?.content.contentMarkdown || '');

      const timeoutBlur = setTimeout(() => {
        editorRef.current?.getInstance().blur();
      }, 0);

      return () => {
        clearTimeout(timeoutBlur);
      };
    }
  }, [editorRef, content]);

  return (
    <>
      <TuiCustomGlobalStyles />

      <Label htmlFor='title' text='제목' />
      <TitleInput
        name='title'
        ref={titleRef}
        defaultValue={content?.content.title || ''}
        onKeyDown={handleKeydownSubmit}
      />

      {/* Editor에 initialValue로 contentMarkdown 정보를 넘겨주어야 한다. 
            contentHTML 전달 시 화면은 제대로 보이지만 수정시 또는 수정없이 그냥 다시 저장할때 markdown의 세세한 부분이 다르게 표기되어 제대로 적용되지 않는 문제가 발생한다. */}
      <Label htmlFor='content' text='내용' />
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
    </>
  );
};

export default TuiEditor;
