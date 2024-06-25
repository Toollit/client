import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/legacy/image';

const ProfileImageSkeletonContainer = styled.div`
  position: relative;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserNickname = styled.div`
  font-size: 1.4rem;
`;

const BlankImage = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledProfileImage = styled(Image)`
  border-radius: 25rem;
`;

const ImageEditBtn = styled.button`
  border: 1px solid #fff;
  border-radius: 50rem;
  background-color: #fff;
  width: 3.68rem;
  height: 3.68rem;
  position: absolute;
  bottom: 4.5rem;
  left: calc((100% / 2) + 2.5rem);
  cursor: pointer;
`;

export {
  ProfileImageSkeletonContainer,
  UserNickname,
  BlankImage,
  ProfileImageContainer,
  StyledProfileImage,
  ImageEditBtn,
};
