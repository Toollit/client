import React, { useRef, useState } from 'react';
import useInput from './useInput';

const useEditorRef = () => {
  const [uploadImageUrls, setUploadImageUrls] = useState<string[]>([]);
  const [title, onChangeTitle] = useInput('');

  const editorRef = useRef<any>(null);

  const editorInstance = editorRef.current?.getInstance();

  const contentHtml: string = editorInstance?.getHTML();
  const contentMark: string = editorInstance?.getMarkdown();

  // img 태그 추출
  const imgRegex = /<img[^>]+src="([^">]+)"/gi;
  const resultWithElement = contentHtml?.match(imgRegex);

  const contentIncludeImgUrls: string[] = [];

  if (resultWithElement) {
    // src= 할당된 string 값 추출
    // * 파일명에 quote가 있더라도 aws s3에 업로드되어 전달받은 url주소에 quote가 encode 되어 %2522 또는 %22 로 표시 되기 때문에 신경쓸 필요 없다.
    const srcRegex = /\s*"(.+?)"/gi;

    for (let i = 0; i < resultWithElement?.length; i++) {
      const result = resultWithElement[i].match(srcRegex);

      if (result) {
        const removeWrappingQuote = result[0].replaceAll('"', '');

        contentIncludeImgUrls.push(removeWrappingQuote);
      }
    }
  }

  const saveImgUrls = uploadImageUrls.reduce((acc: string[], cur) => {
    if (contentIncludeImgUrls.includes(cur)) {
      acc.push(cur);
    }
    return acc;
  }, []);

  const removeImgUrls = uploadImageUrls.reduce((acc: string[], cur) => {
    if (!contentIncludeImgUrls.includes(cur)) {
      acc.push(cur);
    }
    return acc;
  }, []);

  const data = {
    title,
    contentHtml,
    contentMark,
    imageUrls: {
      saveImgUrls,
      removeImgUrls,
    },
  };

  return { title, onChangeTitle, editorRef, setUploadImageUrls, data };
};

export default useEditorRef;
