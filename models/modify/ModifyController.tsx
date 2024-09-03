import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import ModifyView, { ViewProps } from './ModifyView';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/config/errorMessage';
import useEditorContent from '@/hooks/useEditorContent';
import { UpdateProjectData, updateProjectAPI } from '@/apis/updateProject';
import PrivateRoute from '@/components/PrivateRoute';
import { useAppDispatch, useAppSelector } from '@/store';
import { loading } from '@/features/loading';
import useWindowSize from '@/hooks/useWindowSize';
import useCachedKeys from '@/hooks/useCachedKeys';
import useProjectDetailSWR from '@/hooks/useSWR/useProjectDetailSWR';
import useProjectMembersSWR from '@/hooks/useSWR/useProjectMembersSWR';

interface ControllerProps {}

const ModifyController: FC<ControllerProps> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { titleRef, editorRef, handleData } = useEditorContent();
  const { isLaptop } = useWindowSize();
  const { mutatePage } = useCachedKeys();

  const isLoading = useAppSelector((state) => state.isLoading.status);
  const [postId, setPostId] = useState('');

  const [representativeImageURL, setRepresentativeImageUrl] = useState<
    string | null
  >(null);
  const [representativeImageFile, setRepresentativeImageFile] =
    useState<File | null>(null);

  const hashtagRef = useRef<string[]>([]);
  const memberTypeRef = useRef<('developer' | 'designer' | 'pm' | 'anyone')[]>(
    [],
  );
  const recruitCountRef = useRef<HTMLInputElement>(null);

  const { projectDetail, projectDetailMutate } = useProjectDetailSWR(
    true,
    postId,
    {
      page: `/project/${postId}`,
      tag: `project${postId}`,
    },
    true,
  );
  const { projectMembers } = useProjectMembersSWR(true, postId, {
    page: `/project/${postId}`,
    tag: `project${postId}Members`,
  });

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = handleData(titleRef, editorRef);
      if (!data) return;

      if (!(hashtagRef.current && memberTypeRef.current)) {
        return;
      }

      if (hashtagRef.current.length < 1) {
        return alert('해시태그를 하나 이상 입력하세요.');
      }

      if (hashtagRef.current.length > 10) {
        return alert('해시태그는 최대 10개까지 가능합니다.');
      }

      if (memberTypeRef.current.length < 1) {
        return alert('모집인원 타입을 하나 이상 선택하세요.');
      }

      const recruitCount = Number(recruitCountRef.current?.value);
      const members = projectMembers?.length;

      if (typeof members === 'undefined') {
        return;
      }

      // -1 is writer
      const memberCount = members - 1;

      if (recruitCount < memberCount) {
        return alert(
          `현재 멤버 ${memberCount}명보다 적은 숫자는 입력할 수 없습니다.`,
        );
      }

      if (1 > recruitCount || 100 < recruitCount || 0 === recruitCount) {
        return alert('모집 인원은 숫자 1~100까지 가능합니다.');
      }

      if (!representativeImageURL) {
        if (!representativeImageFile) {
          return alert('대표 이미지를 설정해 주세요.');
        }
      }

      if (isLoading) {
        return;
      }

      const projectData: UpdateProjectData = {
        postId,
        title: data.title,
        contentHTML: data.contentHTML,
        contentMarkdown: data.contentMarkdown,
        imageUrls: data.imageUrls,
        hashtags: hashtagRef.current,
        memberTypes: memberTypeRef.current,
        recruitCount: recruitCount,
      };

      const stringifyJsonData = JSON.stringify(projectData);

      const formData = new FormData();

      formData.append('data', stringifyJsonData);

      if (representativeImageURL) {
        formData.append('image', 'noChange');
      }

      if (representativeImageFile) {
        formData.append('image', representativeImageFile);
      }

      try {
        dispatch(loading({ status: true }));

        const response = await updateProjectAPI(formData);

        projectDetailMutate();
        mutatePage({ page: '/' });
        mutatePage({ page: '/profile' });

        const postId = response?.data.postId;
        // Use replace instead of push because decided to back out so can't access that page again
        router.replace(`/project/${postId}`);

        router.events.on('routeChangeComplete', () => {
          dispatch(loading({ status: false }));
        });
      } catch (error) {
        dispatch(loading({ status: false }));
        errorMessage(error);
      }
    },
    [
      router,
      editorRef,
      titleRef,
      handleData,
      hashtagRef,
      projectDetailMutate,
      mutatePage,
      isLoading,
      dispatch,
      representativeImageFile,
      postId,
      projectMembers,
      representativeImageURL,
    ],
  );

  // Prevent the problem of submitting when entering in input
  const handleKeydownSubmit = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        return event.preventDefault();
      }
    },
    [],
  );

  const handleRepresentativeImage = useCallback((file: File | null) => {
    setRepresentativeImageFile(file);
    setRepresentativeImageUrl(null);
  }, []);

  useEffect(() => {
    const imageUrl = projectDetail?.representativeImage;

    if (imageUrl !== undefined) {
      setRepresentativeImageUrl(imageUrl);
    }
  }, [projectDetail?.representativeImage]);

  useEffect(() => {
    const postId = router.query.id;

    if (typeof postId === 'string') {
      setPostId(postId);
    }
  }, [router]);

  const props: ViewProps = {
    isFooterVisible: isLaptop ? true : false,
    handleSubmit,
    editor: {
      titleRef,
      editorRef,
      name: 'projectContentImage',
      contentImageUploadUrl: '/api/post/project/content/uploadImage',
      content: projectDetail,
    },
    hashtagRef,
    memberTypeRef,
    recruitCountRef,
    handleRepresentativeImage,
    handleKeydownSubmit,
    hashtags: projectDetail?.hashtags,
    memberTypes: projectDetail?.memberTypes,
    recruitCount: projectDetail?.recruitCount,
    representativeImageURL,
  };

  return (
    <PrivateRoute accessibleUser='authorized'>
      <ModifyView {...props} />
    </PrivateRoute>
  );
};

export default ModifyController;
