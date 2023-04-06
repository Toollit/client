import React from 'react';
import DeleteFILL0 from 'public/static/icons/delete/delete_FILL0.svg';
import { IconProps } from './types';

const DeleteIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return <DeleteFILL0 width={width} height={height} />;
  }

  return null;
};

export default DeleteIcon;
