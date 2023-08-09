import React from 'react';
import BookmarkFILL0 from 'public/static/icons/bookmark/bookmark_FILL0.svg';
import BookmarkFILL1 from 'public/static/icons/bookmark/bookmark_FILL1.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const BookmarkIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <BookmarkFILL0 width={'100%'} height={'100%'} fill={color} />
      </SVGContainer>
    );
  }

  if (fill) {
    return (
      <SVGContainer width={width} height={height}>
        <BookmarkFILL1 width={'100%'} height={'100%'} fill={color} />
      </SVGContainer>
    );
  }

  return null;
};

export default BookmarkIcon;
