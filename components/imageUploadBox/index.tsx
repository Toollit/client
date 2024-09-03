import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/legacy/image';
import { AddIcon, CloseIcon } from '@/assets/icons';
import { AddImageBox, Container, DeleteIcon } from './styles';

interface ImageUploadBoxProps {
  imageUrl?: string | null;
  onChange: (file: File | null) => void;
}

const ImageUploadBox: FC<ImageUploadBoxProps> = ({ imageUrl, onChange }) => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const imageRef = useRef<HTMLInputElement>(null);

  const handleChangeImage = useCallback(
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
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          setImage(event.target?.result);
          setFile(file);
          onChange(file);
        }
      };
    },
    [onChange],
  );

  const handleDeleteImage = useCallback(() => {
    setImage(null);
    setFile(null);
    onChange(null);
  }, [onChange]);

  const handleAddImage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      imageRef.current?.click();
    },
    [],
  );

  useEffect(() => {
    if (imageUrl) {
      setImage(imageUrl);
    }
  }, [imageUrl]);

  return (
    <Container>
      {image ? (
        <>
          <Image src={image} alt={'upload image'} layout='fill' />
          <DeleteIcon onClick={handleDeleteImage}>
            <CloseIcon />
          </DeleteIcon>
        </>
      ) : (
        <>
          <AddImageBox onClick={handleAddImage}>
            <AddIcon width={4} height={4} />
          </AddImageBox>
          <input
            hidden
            type='file'
            accept='image/jpg, image/jpeg, image/png, image/webp'
            ref={imageRef}
            onChange={handleChangeImage}
          />
        </>
      )}
    </Container>
  );
};

export default ImageUploadBox;
