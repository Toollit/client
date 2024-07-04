import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import AddFill0 from 'public/static/icons/add/add_FILL0.svg';

const AddIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? <></> : AddFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default AddIcon;
