import React, { useCallback, useEffect, useState } from 'react';
import { DeleteIcon, EditIcon, ErrorIcon } from '@/assets/icons';
import {
  OpenButton,
  MUIDrawer,
  Container,
  CancelButton,
  ButtonBox,
  Button,
  Text,
  Icon,
} from './styles';

interface Buttons {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

interface OptionButtonProps {
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

const OptionButton = ({
  icon,
  option,
  handleDelete,
  handleModify,
  handleReport,
}: OptionButtonProps) => {
  const [open, setOpen] = useState(false);
  const [buttons, setButtons] = useState<Buttons[]>([]);
  const [type, setType] = useState({
    delete: {
      icon: <DeleteIcon width={3} height={3} />,
      text: '삭제하기',
      onClick: handleDelete,
    },
    modify: {
      icon: <EditIcon width={3} height={3} />,
      text: '수정하기',
      onClick: handleModify,
    },
    report: {
      icon: <ErrorIcon width={3} height={3} />,
      text: '신고하기',
      onClick: handleReport,
    },
  });

  const handleToggleDrawer = useCallback(
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
      if (option[key as keyof OptionButtonProps['option']]) {
        result.push(type[key as keyof OptionButtonProps['option']]);
      }
    }

    setButtons(result);
  }, [option, type]);

  return (
    <div>
      <React.Fragment>
        <OpenButton onClick={handleToggleDrawer(true)}>{icon}</OpenButton>
        <MUIDrawer
          anchor={'bottom'}
          open={open}
          onClose={handleToggleDrawer(false)}
        >
          <Container
            role='presentation'
            onClick={handleToggleDrawer(false)}
            onKeyDown={handleToggleDrawer(false)}
          >
            <ButtonBox>
              {buttons.map((item) => (
                <Button key={item.text} onClick={item.onClick}>
                  <Icon>{item.icon}</Icon>
                  <Text>{item.text}</Text>
                </Button>
              ))}
            </ButtonBox>

            <CancelButton>취소</CancelButton>
          </Container>
        </MUIDrawer>
      </React.Fragment>
    </div>
  );
};

export default OptionButton;
