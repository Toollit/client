import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import SearchFill0 from 'public/static/icons/search/search_FILL0.svg';

const SearchIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <SearchFill0 width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );

  return null;
};

export default SearchIcon;
