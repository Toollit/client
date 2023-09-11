import React from 'react';
import { TooltipBox, Item, Content } from './styles';

export interface TooltipProps {
  items: {
    text: string;
    icon?: React.ReactNode;
    handler: () => void;
  }[];
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

/**
 * Tooltip for managing contents. To be used directly below the button components
 * @props items - tooltip select list
 * @props anchorEl - anchorEl to be used to control tooltip
 * @props open - Used to open tooltip
 * @props onClose - Used to close tooltip
 */
const Tooltip = ({ items, anchorEl, open, onClose }: TooltipProps) => {
  return (
    <TooltipBox anchorEl={anchorEl} open={open} onClose={onClose}>
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
