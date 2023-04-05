import React, { useCallback, useRef, useState } from 'react';
import useInput from './useInput';

interface FilteredImageUrlsReduceReturnType {
  saveImgUrls: string[];
  removeImgUrls: string[];
}

type FilteredImageFileSizeReduceReturnType = number;

/**
 * @returns titleRef - 제목 값을 가져오는 ref. title input에 전달
 * @returns editorRef - 컨텐츠 값을 가져오는 ref. Editor 컴포넌트에 전달
 * @returns setUploadImageUrls - 게시글을 작성하면서 업로드되는 모든 사진 목록
 * @returns handleData - titleRef, editorRef를 받아와 데이터를 가공하는 함수
 */
const useEditorContent = () => {
  const [uploadImageUrls, setUploadImageUrls] = useState<
    { url: string; fileSize: number }[]
  >([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);

  // 참조된 ref를 전달받아 값을 가공하여 반환
  const handleData = useCallback(
    (
      titleRef: React.RefObject<HTMLInputElement>,
      editorRef: React.MutableRefObject<any>,
    ) => {
      const editorInstance = editorRef.current?.getInstance();

      const contentHTML: string = editorInstance?.getHTML();
      const contentMarkdown: string = editorInstance?.getMarkdown();

      // img 태그 추출
      const imgRegex = /<img[^>]+src="([^">]+)"/gi;
      const imgElement = contentHTML?.match(imgRegex);

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

      const filteredImageUrls =
        uploadImageUrls.reduce<FilteredImageUrlsReduceReturnType>(
          (acc, cur) => {
            if (contentIncludeImgUrls.includes(cur.url)) {
              acc.saveImgUrls.push(cur.url);
            } else {
              acc.removeImgUrls.push(cur.url);
            }
            return acc;
          },
          { saveImgUrls: [], removeImgUrls: [] },
        );

      // const filterdFileSize =
      //   uploadImageUrls.reduce<FilteredImageFileSizeReduceReturnType>(
      //     (acc, cur) => {
      //       if (contentIncludeImgUrls.includes(cur.url)) {
      //         acc = acc + cur.fileSize;
      //       } else {
      //         acc = acc - cur.fileSize;
      //       }
      //       return acc;
      //     },
      //     0,
      //   );

      if (!titleRef.current?.value) {
        alert('제목을 입력해주세요.');
        return null;
      }

      if (titleRef.current?.value.length > 50) {
        alert('제목은 50자 이하로 작성 가능합니다.');
        return null;
      }

      if (!contentMarkdown) {
        alert('내용을 입력해주세요.');
        return null;
      }

      if (filteredImageUrls.saveImgUrls.length > 3) {
        alert('이미지는 10MB 미만 3개까지 등록 할 수 있습니다.');
        return null;
      }

      return {
        title: titleRef.current?.value,
        contentHTML,
        contentMarkdown,
        imageUrls: {
          saveImgUrls: filteredImageUrls.saveImgUrls,
          removeImgUrls: filteredImageUrls.removeImgUrls,
        },
      };
    },
    [uploadImageUrls],
  );

  return { titleRef, editorRef, setUploadImageUrls, handleData };
};

export default useEditorContent;
