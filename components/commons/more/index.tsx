import React from 'react';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import EditIcon from '@/assets/icons/EditIcon';
import MoreIcon from '@/assets/icons/MoreIcon';
import { Button, MoreMenu, Item, ItemContainer } from './styles';

interface MoreProps {
  isMine: boolean;
}

/**
 * @props isMine - 게시글 작성자와 로그인한 사용자의 일치여부 확인
 */
const More = ({ isMine }: MoreProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <MoreIcon width={30} height={30} />
      </Button>
      <MoreMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {isMine ? (
          <div>
            <Item onClick={handleClose}>
              <ItemContainer>
                <div>
                  <EditIcon />
                </div>
                <div>수정</div>
              </ItemContainer>
            </Item>
            <Item onClick={handleClose}>
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
            <Item onClick={handleClose}>신고</Item>
          </div>
        )}
      </MoreMenu>
    </div>
  );
};

export default More;
