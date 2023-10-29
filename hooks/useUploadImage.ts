import React, { useCallback } from 'react';
import { errorMessage } from '@/apis/errorMessage';
import { uploadImageAPI } from '@/apis/uploadImage';

interface Props {
  name: string;
  endPoint: string;
  File: Blob | File;
}

const useUploadImage = () => {
  const uploadSingleImage = useCallback(
    async ({ name, endPoint, File }: Props) => {
      const formData = new FormData();
      formData.append(name, File);

      try {
        const response = await uploadImageAPI(endPoint, formData);

        const imageUrl = response?.data.url;

        return imageUrl;
      } catch (error) {
        errorMessage(error);
      }
    },
    [],
  );

  return {
    uploadSingleImage,
  };
};

export default useUploadImage;
