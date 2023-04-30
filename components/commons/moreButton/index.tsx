import React, { useState, useCallback, useEffect } from 'react';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import EditIcon from '@/assets/icons/EditIcon';
import MoreIcon from '@/assets/icons/MoreIcon';
import { Button, MoreMenu, Item, ItemContainer } from './styles';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { deletePostAPI } from '@/apis/deletePost';
import { errorMessage } from '@/apis/errorMessage';

interface MoreProps {
  isMine: boolean;
}

/**
 * @props isMine - 게시글 작성자와 로그인한 사용자의 일치여부 확인
 */
const More = ({ isMine }: MoreProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const postId = router.query.id;

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
    window.open(`/modify/${postType}/${postId}`);

    setAnchorEl(null);
  }, [postType, postId]);

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

  const handleReport = useCallback(() => {
    console.log('handleReport');
    setAnchorEl(null);
  }, []);

  useEffect(() => {
    const postType = router.asPath.split('/').find((type) => {
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
      <MoreMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {isMine ? (
          <div>
            <Item onClick={handleModify}>
              <ItemContainer>
                <div>
                  <EditIcon />
                </div>
                <div>수정</div>
              </ItemContainer>
            </Item>
            <Item onClick={handleDelete}>
              <ItemContainer>
                <div>
                  <DeleteIcon />
                </div>
                <div>삭제</div>
              </ItemContainer>
            </Item>
          </div>
        ) : (
          <div>
            <Item onClick={handleReport}>신고</Item>
          </div>
        )}
      </MoreMenu>
    </div>
  );
};

export default More;
