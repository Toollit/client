import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import DeleteFill0 from 'public/static/icons/delete/delete_FILL0.svg';

const DeleteIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? <></> : DeleteFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default DeleteIcon;
