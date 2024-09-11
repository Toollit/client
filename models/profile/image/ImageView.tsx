import React, { FC } from 'react';
import Tooltip, { TooltipProps } from '@/components/tooltip';
import Skeleton from '@/components/skeleton';
import { AccountCircleIcon, EditCircleIcon } from '@/assets/icons';
import { ImageWrapper } from '@/styles/commons';
import {
  ImageSkeletonLayoutContainer,
  NicknameSkeletonLayoutContainer,
  BlankImage,
  ProfileImageContainer,
  StyledProfileImage,
  ImageEditBtn,
  UserNickname,
} from './styles';

export interface ViewProps {
  isLoading: boolean;
  isMyProfile: boolean;
  profileImageUrl?: string | null;
  profileImageRef: React.RefObject<HTMLInputElement>;
  nickname: string;
  handleUpdateProfileImage: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleTooltipOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tooltip: TooltipProps;
}

const ImageView: FC<ViewProps> = ({
  isLoading,
  isMyProfile,
  profileImageUrl,
  profileImageRef,
  nickname,
  handleUpdateProfileImage,
  handleTooltipOpen,
  tooltip,
}) => {
  return (
    <>
      {/* Loading profile image */}
      {isLoading ? (
        <ImageSkeletonLayoutContainer>
          <Skeleton shape='circular' width={12} height={12} />
        </ImageSkeletonLayoutContainer>
      ) : (
        <>
          {/* Default profile image */}
          {!profileImageUrl && (
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
          {profileImageUrl && (
            <ProfileImageContainer>
              <ImageWrapper width={12} height={12}>
                <StyledProfileImage
                  src={profileImageUrl}
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
                accept='image/jpg, image/jpeg, image/png, image/webp'
                ref={profileImageRef}
                onChange={handleUpdateProfileImage}
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
        </>
      )}

      <UserNickname>
        {nickname ? (
          nickname
        ) : (
          <NicknameSkeletonLayoutContainer>
            <Skeleton shape='text' width={10} height={3} />
          </NicknameSkeletonLayoutContainer>
        )}
      </UserNickname>
    </>
  );
};

export default ImageView;
