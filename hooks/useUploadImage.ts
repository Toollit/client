import React, { useCallback } from 'react';
import { errorMessage } from '@/apis/errorMessage';
import { uploadImageAPI } from '@/apis/uploadImage';

interface Props {
  fieldName: string;
  endPoint: string;
  File: Blob | File;
}

const useUploadImage = () => {
  const uploadSingleImage = useCallback(
    async ({ fieldName, endPoint, File }: Props) => {
      const formData = new FormData();
      formData.append(fieldName, File);

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
