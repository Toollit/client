import React from 'react';
import EditCircleFill0 from 'public/static/icons/edit/draft_orders_FILL0.svg';
import EditCircleFill1 from 'public/static/icons/edit/draft_orders_FILL1.svg';
import { IconProps } from './types';

const EditCircleIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  if (!fill) {
    return <EditCircleFill0 width={width} height={height} fill={color} />;
  }

  if (fill) {
    return <EditCircleFill1 width={width} height={height} fill={color} />;
  }

  return null;
};

export default EditCircleIcon;
