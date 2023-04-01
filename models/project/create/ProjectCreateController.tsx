import React, { useCallback, useRef, useState } from 'react';
import ProjectCreateView, { ProjectCreateViewProps } from './ProjectCreateView';
import useInput from 'hooks/useInput';
import { addProjectAPI } from '@/apis/project/addProject';
import { useRouter } from 'next/router';

const ProjectCreateController = () => {
  const router = useRouter();
  const [title, onChangeTitle] = useInput('');
  const [uploadImageUrls, setUploadImageUrls] = useState<string[]>([]);

  const editorRef = useRef<any>(null);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const editorInstance = editorRef.current.getInstance();

      const contentHtml: string = editorInstance.getHTML();
      const contentMark = editorInstance.getMarkdown();

      if (!title) {
        return alert('제목을 입력해주세요.');
      }

      if (contentMark.length < 1) {
        return alert('내용을 입력해주세요.');
      }

      // img 태그 추출
      const imgRegex = /<img[^>]+src="([^">]+)"/gi;
      const resultWithElement = contentHtml.match(imgRegex);

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

      try {
        const response = await addProjectAPI({
          title,
          contentHtml,
          contentMark,
          imageUrls: {
            saveImgUrls,
            removeImgUrls,
          },
        });

        if (response?.success) {
          router.push({
            pathname: `/project/[id]`,
            query: { id: response.data.postId },
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [router, title, uploadImageUrls],
  );

  const props: ProjectCreateViewProps = {
    title,
    onChangeTitle,
    handleSubmit,
    editorRef,
    setUploadImageUrls,
  };
  return <ProjectCreateView {...props} />;
};

export default ProjectCreateController;
