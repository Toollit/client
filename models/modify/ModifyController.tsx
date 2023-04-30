import React, { useCallback, useEffect, useRef, useState } from 'react';
import ModifyView, { ModifyViewProps } from './ModifyView';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import { GET_PROJECT_DETAIL_API_ENDPOINT } from '@/apis/keys';
import { getProjectDetailFetcher } from '@/apis/getProjectDetailFetcher';
import useEditorContent from '@/hooks/useEditorContent';
import { updatePostAPI } from '@/apis/updatePost';

interface ModifyControllerProps {
  postId: string;
}

const ModifyController = ({ postId }: ModifyControllerProps) => {
  const router = useRouter();

  // TODO free, question swr 작성하기
  const { data: projectDetail, mutate: projectDetailRevalidation } = useSWR(
    [
      GET_PROJECT_DETAIL_API_ENDPOINT + `/${postId}`,
      {
        headers: {
          modify: true,
        },
      },
    ],

    ([url, config]) => getProjectDetailFetcher(url, config),
    {
      revalidateOnFocus: false,
      errorRetryCount: 0,
      onError(err, key, config) {
        errorMessage(err);
      },
    },
  );

  const { titleRef, editorRef, handleData } = useEditorContent();

  const hashtagRef = useRef<string[]>([]);
  const memberTypeRef = useRef<('developer' | 'designer' | 'pm' | 'anyone')[]>(
    [],
  );
  const [postType, setPostType] = useState<'project' | 'free' | 'question'>();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = handleData(titleRef, editorRef);
      if (!data) return;

      if (!(hashtagRef.current && memberTypeRef.current)) return;

      if (hashtagRef.current.length < 1) {
        return alert('해시태그를 하나 이상 입력하세요.');
      }

      if (hashtagRef.current.length > 15) {
        return alert('해시태그는 최대 10개까지 가능합니다.');
      }

      if (memberTypeRef.current.length < 1) {
        return alert('모집인원 타입을 하나 이상 선택하세요.');
      }

      console.log({ postType });

      if (
        postType === undefined &&
        (postType !== 'project' || 'free' || 'question')
      ) {
        return;
      }

      const postData = {
        postType,
        postId,
        data: {
          title: data?.title,
          contentHTML: data?.contentHTML,
          contentMarkdown: data?.contentMarkdown,
          imageUrls: data?.imageUrls,
          hashtags: hashtagRef.current,
          memberTypes: memberTypeRef.current,
        },
      };

      try {
        const response = await updatePostAPI(postData);

        if (response?.success) {
          const postId = response.data.postId;
          router.push(`/${postType}/${postId}`);
          projectDetailRevalidation();
        }
      } catch (error) {
        errorMessage(error);
      }
    },
    [
      router,
      editorRef,
      titleRef,
      handleData,
      hashtagRef,
      postType,
      postId,
      projectDetailRevalidation,
    ],
  );

  useEffect(() => {
    router.asPath.split('/').find((type) => {
      if (type === 'project') {
        return setPostType('project');
      }

      if (type === 'free') {
        return setPostType('free');
      }

      if (type === 'question') {
        return setPostType('question');
      }
    });
  }, [router]);

  const props: ModifyViewProps = {
    handleSubmit,
    titleRef,
    editorRef,
    hashtagRef,
    memberTypeRef,
    // TODO free, question 게시판 분기처리하기
    content: projectDetail,
  };

  return <ModifyView {...props} />;
};

export default ModifyController;
