import React, { useCallback, useRef, useState } from 'react';
import useInput from './useInput';

interface ReduceReturnType {
  saveImgUrls: string[];
  removeImgUrls: string[];
}
/**
 * @returns titleRef - 제목 값을 가져오는 ref. title input에 전달
 * @returns editorRef - 컨텐츠 값을 가져오는 ref. Editor 컴포넌트에 전달
 * @returns setUploadImageUrls - 게시글을 작성하면서 업로드되는 모든 사진 목록
 * @returns handleData - titleRef, editorRef를 받아와 데이터를 가공하는 함수
 */
const useEditorContent = () => {
  const [uploadImageUrls, setUploadImageUrls] = useState<string[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);

  // 참조된 ref를 전달받아 값을 가공하여 반환
  const handleData = useCallback(
    (
      titleRef: React.RefObject<HTMLInputElement>,
      editorRef: React.MutableRefObject<any>,
    ) => {
      const editorInstance = editorRef.current?.getInstance();

      const contentHtml: string = editorInstance?.getHTML();
      const contentMark: string = editorInstance?.getMarkdown();

      // img 태그 추출
      const imgRegex = /<img[^>]+src="([^">]+)"/gi;
      const imgElement = contentHtml?.match(imgRegex);

      const contentIncludeImgUrls: string[] = [];

      if (imgElement) {
        // src= 할당된 string 값 추출
        // * 파일명에 quote가 있더라도 aws s3에 업로드되어 전달받은 url주소에 quote가 encode 되어 %2522 또는 %22 로 표시 되기 때문에 신경쓸 필요 없다.
        const srcRegex = /\s*"(.+?)"/gi;

        for (let i = 0; i < imgElement?.length; i++) {
          const result = imgElement[i].match(srcRegex);

          if (result) {
            const removeWrappingQuote = result[0].replaceAll('"', '');

            contentIncludeImgUrls.push(removeWrappingQuote);
          }
        }
      }

      const imageUrls = uploadImageUrls.reduce<ReduceReturnType>(
        (acc, cur) => {
          if (contentIncludeImgUrls.includes(cur)) {
            acc.saveImgUrls.push(cur);
          } else {
            acc.removeImgUrls.push(cur);
          }
          return acc;
        },
        { saveImgUrls: [], removeImgUrls: [] },
      );

      const data = {
        title: titleRef.current?.value,
        contentHtml,
        contentMark,
        imageUrls,
      };

      return data;
    },
    [uploadImageUrls],
  );

  return { titleRef, editorRef, setUploadImageUrls, handleData };
};

export default useEditorContent;
