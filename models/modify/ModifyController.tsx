import React, { useCallback, useEffect, useRef, useState } from 'react';
import ModifyView, { ModifyViewProps } from './ModifyView';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import { getProjectDetailKey } from '@/apis/keys';
import { projectDetailFetcher } from '@/apis/projectDetailFetcher';
import useEditorContent from '@/hooks/useEditorContent';
import { updatePostAPI } from '@/apis/updatePost';
import PrivateRoute from '@/components/PrivateRoute';

interface ModifyControllerProps {
  postId: string;
}

const ModifyController = ({ postId }: ModifyControllerProps) => {
  const router = useRouter();

  // TODO free, question swr 작성하기
  // 상세페이지와 수정시 사용하는 api가 동일하여 수정시에는 조회수 증가를 제한하기위해 config 옵션으로 수정하기 위해서 호출했는지 여부를 서버로 전달한다.
  const { data: projectDetail, mutate: projectDetailRevalidation } = useSWR(
    [
      postId ? getProjectDetailKey(postId) : null,
      {
        headers: {
          modify: true,
        },
      },
    ],

    ([url, config]) => (url ? projectDetailFetcher(url, config) : null),
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
  const recruitCountRef = useRef<HTMLInputElement>(null);

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

      if (hashtagRef.current.length > 10) {
        return alert('해시태그는 최대 10개까지 가능합니다.');
      }

      if (memberTypeRef.current.length < 1) {
        return alert('모집인원 타입을 하나 이상 선택하세요.');
      }

      const recruitCount = Number(recruitCountRef.current?.value);

      if (1 > recruitCount || 100 < recruitCount || 0 === recruitCount) {
        return alert('모집 인원은 숫자 1~100까지 가능합니다.');
      }

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
          recruitNumber: recruitCount,
        },
      };

      try {
        const response = await updatePostAPI(postData);

        const postId = response?.data.postId;

        router.push(`/${postType}/${postId}`);

        projectDetailRevalidation();
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

  // hashtag 입력 폼에서 enter를 사용하여 값을 입력할 때 폼이 제출되는 문제로 인해 이벤트 오류를 막기 위해서 작성되었다.
  const handleKeydownSubmit = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        return event.preventDefault();
      }
    },
    [],
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
    recruitCountRef,
    handleKeydownSubmit,
    // TODO free, question 게시판 분기처리하기
    content: projectDetail,
    hashtags: projectDetail?.content.hashtags,
    memberTypes: projectDetail?.content.memberTypes,
    recruitNumber: projectDetail?.content.recruitNumber,
  };

  return (
    <PrivateRoute accessibleUser='authorized'>
      <ModifyView {...props} />
    </PrivateRoute>
  );
};

export default ModifyController;
