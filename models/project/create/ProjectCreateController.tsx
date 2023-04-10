import React, { useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import ProjectCreateView, { ProjectCreateViewProps } from './ProjectCreateView';
import { addProjectAPI } from '@/apis/project/addProject';
import useEditorContent from '@/hooks/useEditorContent';
import { errorMessage } from '@/utils/errorMessage';

const ProjectCreateController = () => {
  const router = useRouter();

  const { titleRef, editorRef, setUploadImageUrls, handleData } =
    useEditorContent();

  const hashtagRef = useRef<string[]>([]);
  const memberTypeRef = useRef<{
    developer: boolean;
    designer: boolean;
    pm: boolean;
    anyone: boolean;
  }>({ developer: false, designer: false, pm: false, anyone: false });

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = handleData(titleRef, editorRef);
      if (!data) return;

      if (!(hashtagRef.current && memberTypeRef.current)) return;

      if (hashtagRef.current.length < 1) {
        return alert('해시태그를 하나 이상 입력하세요.');
      }

      const isChecked = (
        Object.keys(memberTypeRef.current) as Array<
          keyof typeof memberTypeRef.current
        >
      ).some((type) => {
        if (memberTypeRef.current) {
          return memberTypeRef.current[type] === true;
        }
      });

      if (!isChecked) {
        return alert('모집인원 타입을 하나 이상 선택하세요.');
      }

      const projectData = {
        title: data?.title,
        contentHTML: data?.contentHTML,
        contentMarkdown: data?.contentMarkdown,
        imageUrls: data?.imageUrls,
        hashtags: hashtagRef.current,
        memberTypes: memberTypeRef.current,
      };

      try {
        const response = await addProjectAPI(projectData);

        if (response?.success) {
          router.push({
            pathname: `/project/[id]`,
            query: { id: response.data.projectId },
          });
        }
      } catch (error) {
        errorMessage(error);
      }
    },
    [router, editorRef, titleRef, handleData, hashtagRef],
  );

  const props: ProjectCreateViewProps = {
    handleSubmit,
    titleRef,
    editorRef,
    setUploadImageUrls,
    hashtagRef,
    memberTypeRef,
  };
  return <ProjectCreateView {...props} />;
};

export default ProjectCreateController;
