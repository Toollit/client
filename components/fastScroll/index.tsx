import React, { useCallback } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@/assets/icons';
import { Container, ArrowButton } from './styles';

export interface FastScrollProps {
  scroll: 'top' | 'down' | 'both';
}

/**
 * Quickly move up or down a page
 * @prop scroll - Setting the scroll direction
 */
const FastScroll = ({ scroll }: FastScrollProps) => {
  const handleScroll = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const svgElement = event.currentTarget;
      const svgName = svgElement.getAttribute('name') as
        | 'top'
        | 'bottom'
        | null;

      if (svgName === 'top') {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      if (svgName === 'bottom') {
        return window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      }
    },
    [],
  );

  switch (scroll) {
    case 'both':
      return (
        <Container>
          <ArrowButton name='top' onClick={handleScroll}>
            <ArrowUpIcon />
          </ArrowButton>
          <ArrowButton name='bottom' onClick={handleScroll}>
            <ArrowDownIcon />
          </ArrowButton>
        </Container>
      );

    case 'top':
      return (
        <Container>
          <ArrowButton name='top' onClick={handleScroll}>
            <ArrowUpIcon />
          </ArrowButton>
        </Container>
      );

    case 'down':
      return (
        <Container>
          <ArrowButton name='bottom' onClick={handleScroll}>
            <ArrowDownIcon />
          </ArrowButton>
        </Container>
      );
    default:
      return null;
  }
};

export default FastScroll;
