import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import EditFill0 from 'public/static/icons/edit/edit_FILL0.svg';
import EditFill1 from 'public/static/icons/edit/edit_FILL1.svg';

const EditIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? EditFill1 : EditFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default EditIcon;
