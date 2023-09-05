import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import AddIcon from 'public/static/icons/plus/add.svg';

const PlusIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <AddIcon width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default PlusIcon;
