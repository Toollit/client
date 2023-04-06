import React from 'react';
import BookmarkFILL0 from 'public/static/icons/bookmark/bookmark_FILL0.svg';
import BookmarkFILL1 from 'public/static/icons/bookmark/bookmark_FILL1.svg';
import { IconProps } from './types';

const BookmarkIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return <BookmarkFILL0 width={width} height={height} />;
  }

  if (fill) {
    return <BookmarkFILL1 width={width} height={height} />;
  }

  return null;
};

export default BookmarkIcon;
