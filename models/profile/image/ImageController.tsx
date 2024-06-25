import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import ImageView, { ViewProps } from './ImageView';
import useUserRegisteredCheckSWR from '@/hooks/useSWR/useUserRegisteredCheckSWR';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { profileImageKey } from '@/apis/keys';
import { profileImageFetcher } from '@/apis/profileImageFetcher';
import { errorMessage } from '@/apis/errorMessage';
import { serialize } from '@/middleware/swr/serialize';
import useAuth from '@/hooks/useAuth';
import useTooltip from '@/hooks/useTooltip';
import { updateProfileAPI } from '@/apis/updateProfile';

export interface ControllerProps {}

const ImageController: FC<ControllerProps> = ({}) => {
  const router = useRouter();

  const {
    tooltipAnchorEl,
    setTooltipAnchorEl,
    tooltipOpen,
    handleTooltipOpen,
    handleTooltipClose,
  } = useTooltip();

  const [nickname, setNickname] = useState('');
  const { user } = useAuth();

  const profileImgRef = useRef<HTMLInputElement>(null);

  const { isRegisteredUser } = useUserRegisteredCheckSWR(nickname);

  // Profile image fetcher
  const {
    data: profileImageData,
    mutate: profileImageMutate,
    isLoading: isProfileImageLoading,
  } = useSWR(
    nickname
      ? {
          url: profileImageKey(nickname),
          args: {
            page: '/profile',
            tag: 'profileImage',
          },
        }
      : null,
    profileImageFetcher,
    {
      dedupingInterval: 1000 * 60 * 10,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError(err, key, config) {
        router.replace('/');
        errorMessage(err);
      },
      use: [serialize],
    },
  );

  const handleTooltipModify = useCallback(() => {
    setTooltipAnchorEl(null);

    profileImgRef.current?.click();
  }, [setTooltipAnchorEl]);

  const handleTooltipDelete = useCallback(async () => {
    setTooltipAnchorEl(null);

    try {
      await updateProfileAPI({
        category: 'profileImage',
        data: 'delete',
      });

      profileImageMutate();
    } catch (err) {
      errorMessage(err);
    }
  }, [profileImageMutate, setTooltipAnchorEl]);

  const uploadProfileImage = useCallback(
    async (File: File) => {
      const formData = new FormData();
      formData.append('profileImage', File);

      try {
        await updateProfileAPI({
          category: 'profileImage',
          data: formData,
          option: {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        });

        profileImageMutate();
      } catch (err) {
        errorMessage(err);
      }
    },
    [profileImageMutate],
  );

  const handleChangeProfileImg = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      const file = event.target.files[0];

      uploadProfileImage(file);
    },
    [uploadProfileImage],
  );

  useEffect(() => {
    const nickname = router.query.nickname;

    if (typeof nickname === 'string' && nickname) {
      setNickname(nickname);
    }
  }, [router]);

  const props: ViewProps = {
    isProfileImageLoading,
    profileImageData: profileImageData?.data?.profileImage,
    nickname,
    isMyProfile: nickname === user?.nickname,
    profileImgRef,
    handleChangeProfileImg,
    handleTooltipOpen,
    tooltip: {
      items: [
        {
          text: '수정',
          handler: handleTooltipModify,
        },
        {
          text: '삭제',
          handler: handleTooltipDelete,
        },
      ],
      anchorEl: tooltipAnchorEl,
      open: tooltipOpen,
      onClose: handleTooltipClose,
    },
  };

  return <ImageView {...props} />;
};

export default ImageController;
