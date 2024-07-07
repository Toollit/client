import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import CampaignFill0 from 'public/static/icons/campaign/campaign_FILL0.svg';
import CampaignFill1 from 'public/static/icons/campaign/campaign_FILL1.svg';

const CampaignIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? CampaignFill1 : CampaignFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default CampaignIcon;
