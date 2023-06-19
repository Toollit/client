import React from 'react';
import SearchFill0 from 'public/static/icons/search/search_FILL0.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const SearchIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <SearchFill0 width={'100%'} height={'100%'} />
      </SVGContainer>
    );
  }

  return null;
};

export default SearchIcon;
