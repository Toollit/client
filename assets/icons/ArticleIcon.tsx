import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import ArticleFill0 from 'public/static/icons/article/article_FILL0.svg';
import ArticleFill1 from 'public/static/icons/article/article_FILL1.svg';

const ArticleIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? ArticleFill1 : ArticleFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default ArticleIcon;
