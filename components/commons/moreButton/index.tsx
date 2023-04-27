import React, { useState, useCallback } from 'react';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import EditIcon from '@/assets/icons/EditIcon';
import MoreIcon from '@/assets/icons/MoreIcon';
import { Button, MoreMenu, Item, ItemContainer } from './styles';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

interface MoreProps {
  isMine: boolean;
}

/**
 * @props isMine - 게시글 작성자와 로그인한 사용자의 일치여부 확인
 */
const More = ({ isMine }: MoreProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const postInfo = useCallback(() => {
    const boardType = router.asPath.split('/').find((str) => {
      switch (str) {
        case 'project':
          return 'project';
        case 'free':
          return 'free';
        case 'question':
          return 'question';
        default:
          break;
      }
    });

    const postId = router.query.id;

    return {
      boardType,
      postId,
    };
  }, [router]);

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
    window.open(`/project/${postInfo().postId}/modify`);

    setAnchorEl(null);
  }, [postInfo]);

  const handleDelete = useCallback(() => {
    console.log('handleDelete');
    setAnchorEl(null);
  }, []);

  const handleReport = useCallback(() => {
    console.log('handleReport');
    setAnchorEl(null);
  }, []);

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
