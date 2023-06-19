import React from 'react';
import DeleteFILL0 from 'public/static/icons/delete/delete_FILL0.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const DeleteIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <DeleteFILL0 width={'100%'} height={'100%'} />
      </SVGContainer>
    );
  }

  return null;
};

export default DeleteIcon;
