import React from 'react';
import SearchFill0 from 'public/static/icons/searchIcon/search_FILL0.svg';
import { IconProps } from './types';

const SearchIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return <SearchFill0 width={width} height={height} />;
  }

  return null;
};

export default SearchIcon;
