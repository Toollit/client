import React from 'react';
import EditSquareFILL0 from 'public/static/icons/edit/edit_square_FILL0.svg';
import { IconProps } from './types';

const EditIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return <EditSquareFILL0 width={width} height={height} />;
  }

  return null;
};

export default EditIcon;
