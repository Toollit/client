import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { resetPage, updatePage } from '@/features/pagination';
import ArrowBackIcon from '@/assets/icons/ArrowBackIcon';
import ArrowForwardIcon from '@/assets/icons/ArrowForwardIcon';
import { Container, PageControlButton, PageNumberButton } from './styles';

const Pagination = () => {
  const dispatch = useDispatch();

  const page = useSelector((state: RootState) => state.pagination.page);
  const totalPage = useSelector(
    (state: RootState) => state.pagination.totalPage,
  );

  const [slicePoint, setSlicePoint] = useState<[number, number]>([0, 0]);

  const ScrollToTop = useCallback(() => {
    // TODO 더 좋은 방법 생각해보기
    setTimeout(() => {
      window.scrollTo({ top: 404, behavior: 'smooth' });
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
    if (page === 1) {
      return;
    }

    dispatch(updatePage({ page: page - 1 }));
    ScrollToTop();
  }, [dispatch, page, ScrollToTop]);

  const handleNextPage = useCallback(() => {
    if (page === totalPage) {
      return;
    }

    dispatch(updatePage({ page: page + 1 }));
    ScrollToTop();
  }, [dispatch, page, ScrollToTop, totalPage]);

  useEffect(() => {
    // redux store totalPage default value 1. so need to update new totalPage after controller inside api call
    const paginationBreakpoint = Math.ceil(totalPage / 5);

    // (5 * n) + 1 -> Formula for finding starting point
    const startPoint = Array.from({ length: paginationBreakpoint }, (_, i) => {
      return 5 * i + 1;
    });

    const SlicePoint = [];

    for (let i = 0; i < startPoint.length; i++) {
      SlicePoint.push({ sliceStart: i * 5, sliceEnd: i * 5 + 5 });
    }

    // console.log('startPoint ===>', startPoint);
    // console.log('slicePoint ===>', slicePoint);

    for (let i = 0; i < startPoint.length; i++) {
      if (startPoint[i] <= page) {
        setSlicePoint([SlicePoint[i].sliceStart, SlicePoint[i].sliceEnd]);
      }
    }
  }, [totalPage, page]);

  useEffect(() => {}, []);

  // Initialize the pagination value when the pathname changes
  // TODO 상세페이지 입장 후 뒤로왔을때 page 초기화 문제 해결하기
  useEffect(() => {
    return () => {
      dispatch(resetPage());
    };
  }, [dispatch]);

  return (
    <Container>
      <PageControlButton onClick={handlePreviousPage}>
        {page === 1 ? (
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
        {page === totalPage ? (
          <ArrowForwardIcon width={20} height={20} color='#00000014' />
        ) : (
          <ArrowForwardIcon width={20} height={20} />
        )}
      </PageControlButton>
    </Container>
  );
};

export default Pagination;
