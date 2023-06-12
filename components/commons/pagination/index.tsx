import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updatePage } from '@/features/pagination';
import ArrowBackIcon from '@/assets/icons/ArrowBackIcon';
import ArrowForwardIcon from '@/assets/icons/ArrowForwardIcon';
import { Container, PageControlButton, PageNumberButton } from './styles';

interface PaginationProps {
  count: number;
}

/**
 * @props count - pagination 버튼이 최대로 보여질 갯수
 *
 */
const Pagination = ({ count = 5 }: PaginationProps) => {
  const dispatch = useDispatch();

  const page = useSelector((state: RootState) => state.pagination.page);
  const totalPage = useSelector(
    (state: RootState) => state.pagination.totalPage,
  );

  const [slicePoint, setSlicePoint] = useState<[number, number]>([0, 0]);
  const [startPoint, setStartPoint] = useState<Array<number>>([]);
  const [lastStartPoint, setLastStartPoint] = useState(0);
  const [startPointIndex, setStartPointIndex] = useState(0);

  const ScrollToTop = useCallback(() => {
    setTimeout(() => {
      // nav 44, banner 360
      // window.scrollTo({ top: 404, behavior: 'auto' });
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 300);
  }, []);

  const handlePagination = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const pageNumber = Number(event.currentTarget.value);

      if (page === pageNumber) {
        return;
      }

      dispatch(updatePage({ page: pageNumber }));
      ScrollToTop();
    },
    [dispatch, ScrollToTop, page],
  );

  const handlePreviousPage = useCallback(() => {
    if (page >= startPoint[0] && page < startPoint[1]) {
      return;
    }

    dispatch(updatePage({ page: startPoint[startPointIndex] - 1 }));

    setStartPointIndex((prev) => prev - 1);

    ScrollToTop();
  }, [dispatch, page, ScrollToTop, startPoint, startPointIndex]);

  const handleNextPage = useCallback(() => {
    if (page >= lastStartPoint && page <= totalPage) {
      return;
    }

    dispatch(updatePage({ page: startPoint[startPointIndex + 1] }));

    setStartPointIndex((prev) => prev + 1);

    ScrollToTop();
  }, [
    dispatch,
    page,
    ScrollToTop,
    totalPage,
    startPoint,
    startPointIndex,
    lastStartPoint,
  ]);

  useEffect(() => {
    // redux store totalPage default value 1. so need to update new totalPage after controller inside api call
    const paginationBreakpoint = Math.ceil(totalPage / count);

    // (count * n) + 1 -> Formula for finding pagination block starting point  ex)(5 * n) + 1
    const startPoint = Array.from({ length: paginationBreakpoint }, (_, i) => {
      return count * i + 1;
    });

    const lastStartPoint = startPoint[startPoint.length - 1];

    setStartPoint(startPoint);
    setLastStartPoint(lastStartPoint);

    const SlicePoint = [];

    for (let i = 0; i < startPoint.length; i++) {
      SlicePoint.push({ sliceStart: i * count, sliceEnd: i * count + count });
    }

    for (let i = 0; i < startPoint.length; i++) {
      if (startPoint[i] <= page) {
        setSlicePoint([SlicePoint[i].sliceStart, SlicePoint[i].sliceEnd]);
      }
    }
  }, [totalPage, page, count]);

  return (
    <Container>
      <PageControlButton onClick={handlePreviousPage}>
        {page >= startPoint[0] && page < startPoint[1] ? (
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
                onClick={handlePagination}
                selected={i + 1 === page ? true : false}
              >
                {i + 1}
              </PageNumberButton>
            );
          }).slice(slicePoint[0], slicePoint[1])}
      </div>
      <PageControlButton onClick={handleNextPage}>
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
