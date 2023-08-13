import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ArrowBackIcon from '@/assets/icons/ArrowBackIcon';
import ArrowForwardIcon from '@/assets/icons/ArrowForwardIcon';
import { Container, PageControlButton, PageNumberButton } from './styles';

interface PaginationProps {
  buttons: number;
}

/**
 * @props buttons - Maximum number of pagination buttons to be displayed
 *
 */
const Pagination = ({ buttons = 5 }: PaginationProps) => {
  const router = useRouter();

  const totalPage = useSelector(
    (state: RootState) => state.pagination.totalPage,
  );

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'new' | 'popularity'>('new');
  const [slicePoint, setSlicePoint] = useState<[number, number]>([0, 0]);
  const [startPoint, setStartPoint] = useState<Array<number>>([]);
  const [lastStartPoint, setLastStartPoint] = useState(0);
  const [startPointIndex, setStartPointIndex] = useState(0);

  const handlePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const targePageNumber = Number(event.currentTarget.value);

      // prevent same page router push
      if (page === targePageNumber) {
        return;
      }

      router.push({
        pathname: router.pathname,
        query: {
          page: targePageNumber,
          order: order,
        },
      });
    },
    [router, page, order],
  );

  const handlePreviousPageBlock = useCallback(() => {
    if (
      startPoint.length < 2 ||
      startPoint[1] === undefined ||
      page < startPoint[1]
    ) {
      return;
    }

    router.push({
      pathname: router.pathname,
      query: {
        page: startPoint[startPointIndex] - 1,
        order: order,
      },
    });

    setStartPointIndex((prev) => prev - 1);
  }, [router, startPoint, startPointIndex, order, page]);

  const handleNextPageBlock = useCallback(() => {
    if (page >= lastStartPoint && page <= totalPage) {
      return;
    }

    router.push({
      pathname: router.pathname,
      query: {
        page: startPoint[startPointIndex + 1],
        order: order,
      },
    });

    setStartPointIndex((prev) => prev + 1);
  }, [
    router,
    totalPage,
    startPoint,
    startPointIndex,
    lastStartPoint,
    order,
    page,
  ]);

  useEffect(() => {
    // redux store totalPage default value 1. so need to update new totalPage after api call
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

  // Set the current page and post order for pagination
  useEffect(() => {
    const page = router.query['page'];
    const order = router.query['order'];

    if (page === undefined || order === undefined) {
      setPage(1);
      setOrder('new');
      return;
    }

    if (Array.isArray(page) || Array.isArray(order)) {
      return;
    }

    if (order !== 'new' && order !== 'popularity') {
      return;
    }

    setPage(Number(page));
    setOrder(order);
  }, [router]);

  return (
    <Container>
      <PageControlButton onClick={handlePreviousPageBlock}>
        {startPoint.length < 2 ||
        startPoint[1] === undefined ||
        page < startPoint[1] ? (
          <ArrowBackIcon width={20} height={20} color='#00000014' />
        ) : (
          <ArrowBackIcon width={20} height={20} />
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
          <ArrowForwardIcon width={20} height={20} color='#00000014' />
        ) : (
          <ArrowForwardIcon width={20} height={20} />
        )}
      </PageControlButton>
    </Container>
  );
};

export default Pagination;
