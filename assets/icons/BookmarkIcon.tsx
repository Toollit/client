import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import BookmarkFill0 from 'public/static/icons/bookmark/bookmark_FILL0.svg';
import BookmarkFill1 from 'public/static/icons/bookmark/bookmark_FILL1.svg';

const BookmarkIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? BookmarkFill1 : BookmarkFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default BookmarkIcon;
