import React from 'react';
import { HashtagBlock } from './styles';

interface HashtagProps {
  tagName: string;
}

const Hashtag = ({ tagName }: HashtagProps) => {
  return <HashtagBlock>{tagName}</HashtagBlock>;
};

export default Hashtag;
