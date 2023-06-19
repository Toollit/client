import React from 'react';
import EditSquareFILL0 from 'public/static/icons/edit/edit_square_FILL0.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const EditSquareIcon = ({
  fill = false,
  width = 24,
  height = 24,
}: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <EditSquareFILL0 width={'100%'} height={'100%'} />
      </SVGContainer>
    );
  }

  return null;
};

export default EditSquareIcon;
