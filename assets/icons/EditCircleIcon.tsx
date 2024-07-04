import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import EditCircleFill0 from 'public/static/icons/edit/draft_orders_FILL0.svg';
import EditCircleFill1 from 'public/static/icons/edit/draft_orders_FILL1.svg';

const EditCircleIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? EditCircleFill1 : EditCircleFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default EditCircleIcon;
