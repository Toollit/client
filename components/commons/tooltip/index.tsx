import React, { useState, useCallback, useEffect } from 'react';
import { DeleteIcon, EditSquareIcon, MoreIcon } from '@/assets/icons';
import { Button, TooltipBox, Item, Content } from './styles';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { deletePostAPI } from '@/apis/deletePost';
import { errorMessage } from '@/apis/errorMessage';
import { openReport } from '@/features/report';
import useAuth from '@/hooks/useAuth';

interface Props {
  writer?: string;
  title?: string;
}

/**
 * Tooltip for managing posts (reporting, modifying, deleting)
 * @props writer - 게시글 작성자
 * @props title - 제목
 */
const Tooltip = ({ writer, title }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const postId = router.query.id as string;

  // Current Access User Self Information
  const { nickname: accessUser, authMutate } = useAuth();

  const [postType, setPostType] = useState<'project' | 'free' | 'question'>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleModify = useCallback(() => {
    // window.open(`/modify/${postType}/${postId}`);
    router.push(`/modify/${postType}/${postId}`);

    setAnchorEl(null);
  }, [router, postType, postId]);

  const handleDelete = useCallback(async () => {
    setAnchorEl(null);

    if (
      postType !== undefined &&
      (postType === 'project' || 'free' || 'question') &&
      typeof postId === 'string'
    ) {
      const isDeletedOk = confirm('정말로 삭제하시겠습니까?');

      if (isDeletedOk) {
        try {
          await deletePostAPI({ postType, postId });

          router.replace('/');
        } catch (error) {
          errorMessage(error);
        }
      }
    }
  }, [postType, postId, router]);

  const handleReport = useCallback(async () => {
    const auth = await authMutate();

    if (!auth?.success) {
      alert('로그인 후 이용 가능합니다.');
      return router.push('/login');
    }

    setAnchorEl(null);
    dispatch(
      openReport({
        postType: postType ?? '',
        postId: Number(postId),
        writer: writer ?? '',
        title: title ?? '',
      }),
    );
  }, [dispatch, router, authMutate, postType, postId, writer, title]);

  useEffect(() => {
    router.asPath.split('/').find((type) => {
      if (type === 'project') {
        return setPostType('project');
      }

      if (type === 'free') {
        return setPostType('free');
      }

      if (type === 'question') {
        return setPostType('question');
      }
    });
  }, [router]);

  return (
    <div>
      <Button onClick={handleClick}>
        <MoreIcon width={40} height={30} />
      </Button>
      <TooltipBox anchorEl={anchorEl} open={open} onClose={handleClose}>
        {writer === accessUser ? (
          <div>
            <Item onClick={handleModify}>
              <Content>
                <EditSquareIcon />
                <span>수정</span>
              </Content>
            </Item>
            <Item onClick={handleDelete}>
              <Content>
                <DeleteIcon />
                <span>삭제</span>
              </Content>
            </Item>
          </div>
        ) : (
          <div>
            <Item onClick={handleReport}>신고</Item>
          </div>
        )}
      </TooltipBox>
    </div>
  );
};

export default Tooltip;
