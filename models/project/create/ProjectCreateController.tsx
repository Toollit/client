import React, { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import ProjectCreateView, { ProjectCreateViewProps } from './ProjectCreateView';
import { ProjectData, createProjectAPI } from '@/apis/createProject';
import useEditorContent from '@/hooks/useEditorContent';
import { errorMessage } from '@/apis/errorMessage';
import PrivateRoute from '@/components/PrivateRoute';
import useCachedKeys from '@/hooks/useCachedKeys';
import { useDispatch } from 'react-redux';
import { loading } from '@/features/loading';

const ProjectCreateController = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { mutateCachedKeysWithTag } = useCachedKeys();
  const { titleRef, editorRef, handleData } = useEditorContent();

  const hashtagRef = useRef<string[]>([]);
  const memberTypeRef = useRef<('developer' | 'designer' | 'pm' | 'anyone')[]>(
    [],
  );
  const recruitCountRef = useRef<HTMLInputElement>(null);
  const representativeImageRef = useRef<HTMLInputElement>(null);

  const [representativePreviewImage, setRepresentativePreviewImage] =
    useState('');
  const [representativeImageFile, setRepresentativeImageFile] =
    useState<File | null>(null);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = handleData(titleRef, editorRef);
      if (!data) return;

      if (!(hashtagRef.current && memberTypeRef.current)) return;

      if (hashtagRef.current.length < 1) {
        return alert('해시태그를 하나 이상 입력하세요.');
      }

      if (hashtagRef.current.length > 10) {
        return alert('해시태그는 최대 10개까지 가능합니다.');
      }

      if (memberTypeRef.current.length < 1) {
        return alert('모집 타입을 하나 이상 선택하세요.');
      }

      const recruitCount = Number(recruitCountRef.current?.value);

      if (1 > recruitCount || 100 < recruitCount || 0 === recruitCount) {
        return alert('모집 인원은 숫자 1~100까지 가능합니다.');
      }

      if (!representativeImageFile) {
        return alert('대표 이미지를 설정해 주세요.');
      }

      const projectData: ProjectData = {
        title: data?.title,
        contentHTML: data?.contentHTML,
        contentMarkdown: data?.contentMarkdown,
        imageUrls: data?.imageUrls,
        hashtags: hashtagRef.current,
        memberTypes: memberTypeRef.current,
        recruitNumber: recruitCount,
      };

      const stringifyJsonData = JSON.stringify(projectData);

      const formData = new FormData();
      formData.append('projectRepresentativeImage', representativeImageFile);
      formData.append('data', stringifyJsonData);

      dispatch(loading({ status: true }));

      try {
        const response = await createProjectAPI(formData);

        if (response?.success) {
          dispatch(loading({ status: false }));

          mutateCachedKeysWithTag({ tag: 'projects' });
          const projectId = response.data.projectId;
          // Use replace instead of push because decided to back out so can't access that page again
          router.replace(`/project/${projectId}`);
        }
      } catch (error) {
        dispatch(loading({ status: false }));
        errorMessage(error);
      }
    },
    [
      router,
      dispatch,
      editorRef,
      titleRef,
      handleData,
      hashtagRef,
      mutateCachedKeysWithTag,
      representativeImageFile,
    ],
  );

  const handleKeydownSubmit = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        return event.preventDefault();
      }
    },
    [],
  );

  const handleChangeRepresentativeImg = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      const file = event.target.files[0];

      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (evt) => {
        if (typeof evt.target?.result === 'string') {
          setRepresentativePreviewImage(evt.target?.result);
          setRepresentativeImageFile(file);
        }
      };
    },
    [],
  );

  const handleAddRepresentativeImg = useCallback(() => {
    representativeImageRef.current?.click();
  }, []);

  const handleDeleteRepresentativePreviewImage = useCallback(() => {
    setRepresentativePreviewImage('');
    setRepresentativeImageFile(null);
  }, []);

  const props: ProjectCreateViewProps = {
    handleSubmit,
    editor: {
      titleRef,
      editorRef,
      name: 'projectContentImage',
      contentImageUploadUrl: '/api/post/project/content/uploadImage',
    },
    hashtagRef,
    memberTypeRef,
    recruitCountRef,
    representativeImageRef,
    handleChangeRepresentativeImg,
    handleAddRepresentativeImg,
    representativePreviewImage: representativePreviewImage
      ? representativePreviewImage
      : null,
    handleKeydownSubmit,
    handleDeleteRepresentativePreviewImage,
  };
  return (
    <PrivateRoute accessibleUser='authorized'>
      <ProjectCreateView {...props} />
    </PrivateRoute>
  );
};

export default ProjectCreateController;
