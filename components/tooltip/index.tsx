import React from 'react';
import { TooltipBox, Item, Content } from './styles';
import type { PopoverOrigin } from '@mui/material';

export interface TooltipProps {
  items: {
    text: string;
    icon?: React.ReactNode;
    handler: () => void;
  }[];
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  position?: PopoverOrigin;
}

/**
 * Tooltip for managing contents.
 * To be used directly below the button tag.
 * Only use with button tag. When used with other tags, the button appears to be pressed.
 * @props items - tooltip select list
 * @props anchorEl - anchorEl to be used to control tooltip
 * @props open - Used to open tooltip
 * @props onClose - Used to close tooltip
 * @props position - tooltip display position
 */
const Tooltip = ({
  items,
  anchorEl,
  open,
  onClose,
  position = {
    vertical: 'center',
    horizontal: 'center',
  },
}: TooltipProps) => {
  return (
    <TooltipBox
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={position}
    >
      {items?.map((item) => {
        return (
          <Item key={item.text} onClick={item.handler}>
            <Content>
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </Content>
          </Item>
        );
      })}
    </TooltipBox>
  );
};

export default Tooltip;
