import React, { FC, useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import ProjectCreateView, { ViewProps } from './ProjectCreateView';
import { CreateProjectData, createProjectAPI } from '@/apis/createProject';
import useEditorContent from '@/hooks/useEditorContent';
import { errorMessage } from '@/apis/errorMessage';
import PrivateRoute from '@/components/PrivateRoute';
import useCachedKeys from '@/hooks/useCachedKeys';
import { useDispatch, useSelector } from 'react-redux';
import { loading } from '@/features/loading';
import useTooltip from '@/hooks/useTooltip';
import projectDefaultImage from 'public/static/images/project.jpg';
import { StaticImageData } from 'next/legacy/image';
import { RootState } from '@/store';
import useWindowSize from '@/hooks/useWindowSize';

export interface ControllerProps {}

const ProjectCreateController: FC<ControllerProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { mutateTag, mutatePage } = useCachedKeys();
  const { titleRef, editorRef, handleData } = useEditorContent();
  const {
    tooltipAnchorEl,
    setTooltipAnchorEl,
    tooltipOpen,
    handleTooltipOpen,
    handleTooltipClose,
  } = useTooltip();
  const { isLaptop } = useWindowSize();

  const isLoading = useSelector((state: RootState) => state.isLoading.status);

  const hashtagRef = useRef<string[]>([]);
  const memberTypeRef = useRef<('developer' | 'designer' | 'pm' | 'anyone')[]>(
    [],
  );
  const recruitCountRef = useRef<HTMLInputElement>(null);
  const representativeImageRef = useRef<HTMLInputElement>(null);

  const [representativePreviewImage, setRepresentativePreviewImage] = useState<
    StaticImageData | string | null
  >(null);
  const [representativeImageFile, setRepresentativeImageFile] = useState<
    File | 'defaultImage' | null
  >(null);

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
        return alert('모집 타입을 하나 이상 선택하세요.');
      }

      const recruitCount = Number(recruitCountRef.current?.value);

      if (1 > recruitCount || 100 < recruitCount || 0 === recruitCount) {
        return alert('모집 인원은 숫자 1~100까지 가능합니다.');
      }

      if (!representativeImageFile) {
        return alert('대표 이미지를 설정해 주세요.');
      }

      if (isLoading) {
        return;
      }

      const projectData: CreateProjectData = {
        title: data?.title,
        contentHTML: data?.contentHTML,
        contentMarkdown: data?.contentMarkdown,
        imageUrls: data?.imageUrls,
        hashtags: hashtagRef.current,
        memberTypes: memberTypeRef.current,
        recruitCount: recruitCount,
      };

      const stringifyJsonData = JSON.stringify(projectData);

      const formData = new FormData();

      formData.append('data', stringifyJsonData);
      formData.append(
        'projectRepresentativeImage',
        representativeImageFile === 'defaultImage'
          ? 'defaultImage'
          : representativeImageFile,
      );

      try {
        dispatch(loading({ status: true }));

        const response = await createProjectAPI(formData);

        // Lambda image resizing time delay
        setTimeout(() => {
          mutatePage({ page: '/' });
          mutatePage({ page: '/profile' });

          const postId = response?.data.postId;
          // Use replace instead of push because decided to back out so can't access that page again
          router.replace(`/project/${postId}`);

          router.events.on('routeChangeComplete', () => {
            dispatch(loading({ status: false }));
          });
        }, 2000);
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
      mutatePage,
      representativeImageFile,
      isLoading,
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

  const handleChangeRepresentativeImage = useCallback(
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

  const handleAddRepresentativeImage = useCallback(() => {
    setTooltipAnchorEl(null);
    representativeImageRef.current?.click();
  }, [setTooltipAnchorEl]);

  const handleAddDefaultRepresentativeImage = useCallback(() => {
    setTooltipAnchorEl(null);
    setRepresentativeImageFile('defaultImage');
    setRepresentativePreviewImage(projectDefaultImage);
  }, [setTooltipAnchorEl]);

  const handleDeleteRepresentativePreviewImage = useCallback(() => {
    setRepresentativePreviewImage('');
    setRepresentativeImageFile(null);
  }, []);

  const props: ViewProps = {
    isFooterVisible: isLaptop ? true : false,
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
    handleChangeRepresentativeImage,
    representativePreviewImage: representativePreviewImage
      ? representativePreviewImage
      : null,
    handleKeydownSubmit,
    handleDeleteRepresentativePreviewImage,
    handleTooltipOpen,
    tooltip: {
      items: [
        {
          text: '앨범에서 선택',
          handler: handleAddRepresentativeImage,
        },
        {
          text: '기본 이미지',
          handler: handleAddDefaultRepresentativeImage,
        },
      ],
      anchorEl: tooltipAnchorEl,
      open: tooltipOpen,
      onClose: handleTooltipClose,
    },
  };

  return (
    <PrivateRoute accessibleUser='authorized'>
      <ProjectCreateView {...props} />
    </PrivateRoute>
  );
};

export default ProjectCreateController;
