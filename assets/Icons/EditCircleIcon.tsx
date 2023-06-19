import React from 'react';
import EditCircleFill0 from 'public/static/icons/edit/draft_orders_FILL0.svg';
import EditCircleFill1 from 'public/static/icons/edit/draft_orders_FILL1.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const EditCircleIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <EditCircleFill0 width={'100%'} height={'100%'} fill={color} />
      </SVGContainer>
    );
  }

  if (fill) {
    return (
      <SVGContainer width={width} height={height}>
        <EditCircleFill1 width={'100%'} height={'100%'} fill={color} />
      </SVGContainer>
    );
  }

  return null;
};

export default EditCircleIcon;
