import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowBackIcon, ArrowForwardIcon } from '@/assets/icons';
import { Container, PageControlButton, PageNumberButton } from './styles';

interface PaginationProps {
  buttons: number;
  totalPage: number;
}

/**
 * @props buttons - Maximum number of pagination buttons to be displayed
 * @props totalPage - Total number of pagination pages
 */
const Pagination = ({ buttons = 5, totalPage = 1 }: PaginationProps) => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<'new' | 'popularity'>('new');
  const [slicePoint, setSlicePoint] = useState<[number, number]>([0, 0]);
  const [startPoint, setStartPoint] = useState<Array<number>>([]);
  const [lastStartPoint, setLastStartPoint] = useState(0);
  const [startPointIndex, setStartPointIndex] = useState(0);

  const ScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handlePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const targePageNumber = Number(event.currentTarget.value);

      // prevent same page router push
      if (page === targePageNumber) {
        return;
      }

      router.push(
        {
          pathname: router.pathname,
          query: {
            page: targePageNumber,
            order: order,
          },
        },
        undefined,
        { shallow: true },
      );

      ScrollToTop();
    },
    [router, page, order, ScrollToTop],
  );

  const handlePreviousPageBlock = useCallback(() => {
    if (
      startPoint.length < 2 ||
      startPoint[1] === undefined ||
      page < startPoint[1]
    ) {
      return;
    }

    router.push(
      {
        pathname: router.pathname,
        query: {
          page: startPoint[startPointIndex] - 1,
          order: order,
        },
      },
      undefined,
      { shallow: true },
    );

    ScrollToTop();

    setStartPointIndex((prev) => prev - 1);
  }, [router, startPoint, startPointIndex, order, page, ScrollToTop]);

  const handleNextPageBlock = useCallback(() => {
    if (page >= lastStartPoint && page <= totalPage) {
      return;
    }

    router.push(
      {
        pathname: router.pathname,
        query: {
          page: startPoint[startPointIndex + 1],
          order: order,
        },
      },
      undefined,
      { shallow: true },
    );

    ScrollToTop();

    setStartPointIndex((prev) => prev + 1);
  }, [
    router,
    totalPage,
    startPoint,
    startPointIndex,
    lastStartPoint,
    order,
    page,
    ScrollToTop,
  ]);

  useEffect(() => {
    const paginationBreakpoint = Math.ceil(totalPage / buttons);

    // (buttons * n) + 1 -> Formula for finding pagination block starting point  ex)(5 * n) + 1
    const startPoint = Array.from({ length: paginationBreakpoint }, (_, i) => {
      return buttons * i + 1;
    });

    const lastStartPoint = startPoint[startPoint.length - 1];

    // Set page block starting point
    setStartPoint(startPoint);
    setLastStartPoint(lastStartPoint);

    const SlicePoint = [];

    for (let i = 0; i < startPoint.length; i++) {
      SlicePoint.push({
        sliceStart: i * buttons,
        sliceEnd: i * buttons + buttons,
      });
    }

    for (let i = 0; i < startPoint.length; i++) {
      if (startPoint[i] <= Number(page)) {
        setSlicePoint([SlicePoint[i].sliceStart, SlicePoint[i].sliceEnd]);
      }
    }
  }, [router, totalPage, buttons, page]);

  // Set page and order according to query value
  useEffect(() => {
    const pageQuery = router.query['page'];
    const orderQuery = router.query['order'];

    if (Array.isArray(pageQuery) || Array.isArray(orderQuery)) {
      return;
    }

    if (pageQuery === undefined || orderQuery === undefined) {
      setPage(1);
      setOrder('new');
      return;
    }

    if (orderQuery !== 'new' && orderQuery !== 'popularity') {
      return;
    }

    setPage(Number(pageQuery));
    setOrder(orderQuery);
  }, [router]);

  return (
    <Container>
      <PageControlButton onClick={handlePreviousPageBlock}>
        {startPoint.length < 2 ||
        startPoint[1] === undefined ||
        page < startPoint[1] ? (
          <ArrowBackIcon width={2} height={2} color='#00000014' />
        ) : (
          <ArrowBackIcon width={2} height={2} />
        )}
      </PageControlButton>
      <div>
        {totalPage &&
          Array.from({ length: totalPage }, (_, i) => {
            return (
              <PageNumberButton
                key={i + 1}
                value={i + 1}
                onClick={handlePage}
                selected={i + 1 === page ? true : false}
              >
                {i + 1}
              </PageNumberButton>
            );
          }).slice(slicePoint[0], slicePoint[1])}
      </div>
      <PageControlButton onClick={handleNextPageBlock}>
        {page >= lastStartPoint && page <= totalPage ? (
          <ArrowForwardIcon width={2} height={2} color='#00000014' />
        ) : (
          <ArrowForwardIcon width={2} height={2} />
        )}
      </PageControlButton>
    </Container>
  );
};

export default Pagination;
