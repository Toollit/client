import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import ImageView, { ViewProps } from './ImageView';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import useUserRegisteredCheckSWR from '@/hooks/useSWR/useUserRegisteredCheckSWR';
import useUserImageSWR from '@/hooks/useSWR/useUserImageSWR';
import { errorMessage } from '@/apis/errorMessage';
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
  const { user } = useAuth();

  const profileImageRef = useRef<HTMLInputElement>(null);

  const [nickname, setNickname] = useState('');

  const { isRegisteredUser } = useUserRegisteredCheckSWR(nickname);

  const { profileImage, isLoading, profileImageMutate } =
    useUserImageSWR(nickname);

  const handleTooltipModify = useCallback(() => {
    setTooltipAnchorEl(null);

    profileImageRef.current?.click();
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

  const handleUpdateProfileImage = useCallback(
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
    isRegisteredUser,
    isLoading,
    isMyProfile: nickname === user?.nickname,
    profileImageUrl: profileImage,
    profileImageRef,
    nickname,
    handleUpdateProfileImage,
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
