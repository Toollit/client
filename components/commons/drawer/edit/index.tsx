import React, { useCallback, useEffect, useState } from 'react';
import { Drawer as MUIDrawer } from '@mui/material';
import {
  CustomDrawerStyles,
  StyledBox,
  CancelButton,
  ControlButtonContainer,
  ControlButton,
  Text,
  Icon,
  DeleteIcon,
  EditIcon,
  ReportIcon,
  OpenButton,
} from './styles';

interface Buttons {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

interface TooltipDrawerProps {
  icon: React.ReactNode;
  option: {
    delete?: boolean;
    modify?: boolean;
    report?: boolean;
  };
  handleDelete?: () => void;
  handleModify?: () => void;
  handleReport?: () => void;
}

const EditDrawerButton = ({
  icon,
  option,
  handleDelete,
  handleModify,
  handleReport,
}: TooltipDrawerProps) => {
  const [open, setOpen] = useState(false);
  const [buttons, setButtons] = useState<Buttons[]>([]);
  const [type, setType] = useState({
    delete: { icon: <DeleteIcon />, text: '삭제하기', onClick: handleDelete },
    modify: { icon: <EditIcon />, text: '수정하기', onClick: handleModify },
    report: { icon: <ReportIcon />, text: '신고하기', onClick: handleReport },
  });

  const toggleDrawer = useCallback(
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(open);
    },
    [],
  );

  useEffect(() => {
    const result: Buttons[] = [];

    for (let key in option) {
      if (option[key as keyof TooltipDrawerProps['option']]) {
        result.push(type[key as keyof TooltipDrawerProps['option']]);
      }
    }

    setButtons(result);
  }, [option, type]);

  return (
    <div>
      <CustomDrawerStyles />
      <React.Fragment>
        <OpenButton onClick={toggleDrawer(true)}>{icon}</OpenButton>
        <MUIDrawer anchor={'bottom'} open={open} onClose={toggleDrawer(false)}>
          <StyledBox
            role='presentation'
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <ControlButtonContainer>
              {buttons.map((item, index) => (
                <ControlButton key={item.text} onClick={item.onClick}>
                  <Icon>{item.icon}</Icon>
                  <Text>{item.text}</Text>
                </ControlButton>
              ))}
            </ControlButtonContainer>

            <CancelButton>취소</CancelButton>
          </StyledBox>
        </MUIDrawer>
      </React.Fragment>
    </div>
  );
};

export default EditDrawerButton;
