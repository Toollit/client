import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import AdminPanelSettingsFill0 from 'public/static/icons/adminPanelSettings/admin_panel_settings_FILL0.svg';
import AdminPanelSettingsFill1 from 'public/static/icons/adminPanelSettings/admin_panel_settings_FILL1.svg';

const AdminPanelSettingsIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill
    ? AdminPanelSettingsFill1
    : AdminPanelSettingsFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default AdminPanelSettingsIcon;
