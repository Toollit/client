import React, { forwardRef, Ref, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { closeReport } from '@/features/report';
import { BottomBtn, CloseBtn } from '@/components/commons/button';
import AppLayout from '@/components/appLayout';
import { reportAPI } from '@/apis/report';
import { errorMessage } from '@/apis/errorMessage';
import {
  Container,
  Form,
  ListTitle,
  ListGroup,
  TextArea,
  DefaultInfoContainer,
  Category,
  Writer,
  Content,
  TextCount,
  TextInputContainer,
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
  const dispatch = useDispatch();
  const router = useRouter();

  const open = useSelector((state: RootState) => state.report.open);
  const postType = useSelector((state: RootState) => state.report.postType);
  const postId = useSelector((state: RootState) => state.report.postId);
  const writer = useSelector((state: RootState) => state.report.writer);
  const title = useSelector((state: RootState) => state.report.title);

  const [showTextarea, setShowTextarea] = useState(false);
  const [textCount, setTextCount] = useState(0);

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

      const data = {
        postId: Number(postId),
        postType,
        title,
        writer,
        reason,
        url: router.asPath,
      };

      try {
        const response = await reportAPI(data);

        if (response?.success) {
          alert(response.message);

          return handleClose();
        }
      } catch (error) {
        errorMessage(error);
      }
    },
    [router, writer, title, postId, postType, handleClose],
  );

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppLayout nav={false}>
        <Container>
          <CloseBtn onClick={handleClose} title='신고하기' />
          <Form onSubmit={handleSubmit}>
            <DefaultInfoContainer>
              <Category>작성자</Category>
              <Writer>{writer}</Writer>
            </DefaultInfoContainer>

            <DefaultInfoContainer>
              <Category>게시글</Category>
              <Content>{title}</Content>
            </DefaultInfoContainer>
            <ListTitle>사유선택*</ListTitle>
            <ListGroup>
              <li>
                <label>
                  <input
                    type='radio'
                    name='reason'
                    value={'욕설, 비방, 명예훼손 관련 게시글입니다.'}
                    onClick={handleSelect}
                  />
                  <span>욕설, 비방, 명예훼손 관련 게시글입니다.</span>
                </label>
              </li>

              <li>
                <label>
                  <input
                    type='radio'
                    name='reason'
                    value={'개인정보 노출 게시글입니다.'}
                    onClick={handleSelect}
                  />
                  <span>개인정보 노출 게시글입니다.</span>
                </label>
              </li>

              <li>
                <label>
                  <input
                    type='radio'
                    name='reason'
                    value={'반복문자 / 도배글 입니다.'}
                    onClick={handleSelect}
                  />
                  <span>반복문자 / 도배글 입니다.</span>
                </label>
              </li>

              <li>
                <label>
                  <input
                    type='radio'
                    name='reason'
                    value={'음란물 입니다.'}
                    onClick={handleSelect}
                  />
                  <span>음란물 입니다.</span>
                </label>
              </li>

              <li>
                <label>
                  <input
                    type='radio'
                    name='reason'
                    value={'직접입력'}
                    onClick={handleSelect}
                  />
                  <span>직접입력</span>
                </label>
              </li>
            </ListGroup>
            {showTextarea && (
              <TextInputContainer>
                <TextArea
                  name='reasonDetail'
                  cols={30}
                  rows={10}
                  placeholder='신고 내용을 입력해 주세요. 최소 10자 이상 입력 해주세요.'
                  onChange={handleTextarea}
                  maxLength={1000}
                />
                <TextCount>{textCount} / 1000</TextCount>
              </TextInputContainer>
            )}
            <BottomBtn text='제출' />
          </Form>
        </Container>
      </AppLayout>
    </Dialog>
  );
};

export default Report;
