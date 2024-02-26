import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import EditSquareFILL0 from 'public/static/icons/edit/edit_square_FILL0.svg';

const EditSquareIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <EditSquareFILL0 width={'100%'} height={'100%'} fill={color} />
      </SVGContainer>
    );
  }

  return null;
};

export default EditSquareIcon;
