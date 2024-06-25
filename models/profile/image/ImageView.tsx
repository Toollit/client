import React, { FC } from 'react';
import Tooltip, { TooltipProps } from '@/components/tooltip';
import {
  ProfileImageSkeletonContainer,
  BlankImage,
  ProfileImageContainer,
  StyledProfileImage,
  ImageEditBtn,
  UserNickname,
} from './styles';
import Skeleton from '@/components/skeleton';
import { AccountCircleIcon, EditCircleIcon } from '@/assets/icons';
import { ImageWrapper } from '@/styles/commons';

export interface ViewProps {
  isProfileImageLoading: boolean;
  profileImageData?: string | null;
  profileImgRef: React.RefObject<HTMLInputElement>;
  handleChangeProfileImg: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTooltipOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tooltip: TooltipProps;
  nickname: string;
  isMyProfile: boolean;
}

const ImageView: FC<ViewProps> = ({
  isProfileImageLoading,
  profileImageData,
  profileImgRef,
  handleChangeProfileImg,
  handleTooltipOpen,
  tooltip,
  nickname,
  isMyProfile,
}) => {
  return (
    <>
      {/* Loading profile image */}
      {(profileImageData === undefined || isProfileImageLoading) && (
        <ProfileImageSkeletonContainer>
          <Skeleton shape='circular' width={12} height={12} />
        </ProfileImageSkeletonContainer>
      )}

      {/* Default profile image */}
      {profileImageData === null && (
        <BlankImage>
          <AccountCircleIcon
            fill={true}
            width={15}
            height={15}
            color='#767678'
          />
        </BlankImage>
      )}

      {/* User settings profile image */}
      {profileImageData && (
        <ProfileImageContainer>
          <ImageWrapper width={12} height={12}>
            <StyledProfileImage
              src={profileImageData}
              alt={'profile image'}
              draggable={false}
              priority={true}
              layout='fill'
            />
          </ImageWrapper>
        </ProfileImageContainer>
      )}

      {/* Change profile image button */}
      {isMyProfile && (
        <>
          <input
            hidden
            type='file'
            accept='image/jpg, image/jpeg, image/png'
            ref={profileImgRef}
            onChange={handleChangeProfileImg}
          />

          <ImageEditBtn onClick={handleTooltipOpen}>
            <EditCircleIcon
              fill={true}
              width={3.5}
              height={3.5}
              color='#4dd290'
            />
          </ImageEditBtn>
          <Tooltip {...tooltip} />
        </>
      )}

      <UserNickname>{nickname}</UserNickname>
    </>
  );
};

export default ImageView;
