import React, { useCallback } from 'react';
import { Container, TopArrow, DownArrow } from './styles';

export interface FastScrollProps {
  scroll: 'top' | 'down' | 'both';
}

/**
 * Quickly move up or down a page
 * @prop scroll - Setting the scroll direction
 */
const FastScroll = ({ scroll }: FastScrollProps) => {
  const handleScroll = useCallback((event: React.MouseEvent<SVGSVGElement>) => {
    const svgElement = event.currentTarget;
    const svgName = svgElement.getAttribute('name') as 'top' | 'bottom' | null;

    if (svgName === 'top') {
      return window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (svgName === 'bottom') {
      return window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  switch (scroll) {
    case 'both':
      return (
        <Container>
          <TopArrow name='top' fontSize='inherit' onClick={handleScroll} />
          <DownArrow name='bottom' fontSize='inherit' onClick={handleScroll} />
        </Container>
      );

    case 'top':
      return (
        <Container>
          <TopArrow name='top' fontSize='inherit' onClick={handleScroll} />
        </Container>
      );

    case 'down':
      return (
        <Container>
          <DownArrow name='bottom' fontSize='inherit' onClick={handleScroll} />
        </Container>
      );
    default:
      return null;
  }
};

export default FastScroll;
