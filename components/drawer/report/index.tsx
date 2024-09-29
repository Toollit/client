import React, { forwardRef, Ref, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useAppDispatch, useAppSelector } from '@/store';
import { closeReport } from '@/features/report';
import { BottomButton } from '@/components/button';
import AppLayout from '@/components/appLayout';
import { createReportAPI } from '@/apis/createReport';
import { errorMessage } from '@/apis/config/errorMessage';
import { fullScreenLoading } from '@/features/loading';
import { InnerContainer } from '@/styles/commons';
import {
  ReportReason,
  ReasonList,
  TextArea,
  DefaultInfoContainer,
  Category,
  Writer,
  Content,
  TextCount,
  ReasonTextArea,
  Form,
} from './styles';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Report = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isLoading = useAppSelector(
    (state) => state.loading.isFullScreenLoading,
  );
  const open = useAppSelector((state) => state.report.open);
  const postType = useAppSelector((state) => state.report.postType);
  const postId = useAppSelector((state) => state.report.postId);
  const writer = useAppSelector((state) => state.report.writer);
  const title = useAppSelector((state) => state.report.title);

  const [showTextarea, setShowTextarea] = useState(false);
  const [textCount, setTextCount] = useState(0);
  const selectReasonList = useRef([
    {
      value: '욕설, 비방, 명예훼손 관련 게시글입니다.',
    },
    {
      value: '개인정보 노출 게시글입니다.',
    },
    {
      value: '반복문자 / 도배글 입니다.',
    },
    { value: '음란물 입니다.' },
    { value: '직접입력' },
  ]);

  const handleClose = useCallback(() => {
    setShowTextarea(false);
    setTextCount(0);
    dispatch(closeReport());
  }, [dispatch]);

  const handleSelect = useCallback((event: React.MouseEvent) => {
    const reason = (event.target as HTMLInputElement).value;

    if (reason === '직접입력') {
      setShowTextarea(true);
    } else {
      setShowTextarea(false);
      setTextCount(0);
    }
  }, []);

  const handleTextarea = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      const textLength = value.length;

      setTextCount(textLength);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!('reason' in event.target)) {
        return;
      }

      let reason = (event.target.reason as HTMLInputElement).value;

      if (!reason) {
        return alert('사유를 한 개 이상 선택하세요.');
      }

      if (reason === '직접입력') {
        if (!('reasonDetail' in event.target)) {
          return;
        }

        const reasonDetail = (event.target.reasonDetail as HTMLTextAreaElement)
          .value;

        if (reasonDetail.length < 10) {
          return alert('최소 10자 이상 입력 해주세요.');
        }

        reason = reasonDetail;
      }

      if (!postType || !title || !writer) {
        return;
      }

      if (isLoading) {
        return;
      }

      const data = {
        postId: Number(postId),
        postType,
        reason,
        url: router.asPath,
      };

      try {
        dispatch(fullScreenLoading(true));

        await createReportAPI(data);

        dispatch(fullScreenLoading(false));

        alert(
          '신고해 주셔서 감사합니다. 최대한 빠른 시간 내에 검토 후 조치하도록 하겠습니다.',
        );

        return handleClose();
      } catch (error) {
        dispatch(fullScreenLoading(false));
        errorMessage(error);
      }
    },
    [router, writer, title, postId, postType, handleClose, isLoading, dispatch],
  );

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppLayout
        type='close'
        title='신고하기'
        handleClose={handleClose}
        fullSize={false}
        footer={false}
      >
        <InnerContainer>
          <Form onSubmit={handleSubmit}>
            <DefaultInfoContainer>
              <Category>작성자</Category>
              <Writer>{writer}</Writer>
            </DefaultInfoContainer>

            <DefaultInfoContainer>
              <Category>게시글</Category>
              <Content>{title}</Content>
            </DefaultInfoContainer>

            <ReportReason>*사유선택</ReportReason>

            <ReasonList>
              {selectReasonList.current.map((reason) => {
                return (
                  <li key={`/report/${reason.value}`}>
                    <label>
                      <input
                        type='radio'
                        name='reason'
                        value={reason.value}
                        onClick={handleSelect}
                      />
                      <span>{reason.value}</span>
                    </label>
                  </li>
                );
              })}
            </ReasonList>

            {showTextarea && (
              <ReasonTextArea>
                <TextArea
                  name='reasonDetail'
                  cols={30}
                  rows={10}
                  placeholder='신고 내용을 입력해 주세요. 최소 10자 이상 입력 해주세요.'
                  onChange={handleTextarea}
                  maxLength={1000}
                />
                <TextCount>{textCount} / 1000</TextCount>
              </ReasonTextArea>
            )}

            <BottomButton text='제출' />
          </Form>
        </InnerContainer>
      </AppLayout>
    </Dialog>
  );
};

export default Report;
