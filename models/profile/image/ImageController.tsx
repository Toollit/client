import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import ImageView, { ViewProps } from './ImageView';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import useUserRegisteredCheckSWR from '@/hooks/useSWR/useUserRegisteredCheckSWR';
import useUserImageSWR from '@/hooks/useSWR/useUserImageSWR';
import { errorMessage } from '@/apis/config/errorMessage';
import useTooltip from '@/hooks/useTooltip';
import { updateProfileAPI } from '@/apis/updateProfile';
import { useAppDispatch, useAppSelector } from '@/store';
import { loading } from '@/features/loading';

export interface ControllerProps {}

const ImageController: FC<ControllerProps> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    tooltipAnchorEl,
    setTooltipAnchorEl,
    tooltipOpen,
    handleTooltipOpen,
    handleTooltipClose,
  } = useTooltip();
  const { user } = useAuth();

  const profileImageRef = useRef<HTMLInputElement>(null);

  const userNickname = useAppSelector((state) => state.profile.userNickname);
  const { isRegisteredUser } = useUserRegisteredCheckSWR(
    true,
    userNickname,
    {},
  );

  const { profileImage, isLoading, profileImageMutate } = useUserImageSWR(
    isRegisteredUser,
    userNickname,
    {},
  );

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
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      const file = event.target.files[0];

      dispatch(loading({ status: true }));

      try {
        await uploadProfileImage(file);

        dispatch(loading({ status: false }));
      } catch (err) {
        dispatch(loading({ status: false }));
        errorMessage(err);
      }
    },
    [uploadProfileImage, dispatch],
  );

  const props: ViewProps = {
    isLoading,
    isMyProfile: userNickname === user?.nickname,
    profileImageUrl: profileImage,
    profileImageRef,
    nickname: userNickname,
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
