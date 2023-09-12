import React, { useCallback, useState } from 'react';

/**
 * Hook used for the default behavior of Tooltip components
 */
const useTooltip = () => {
  // Tooltip open and closed state
  const [tooltipAnchorEl, setTooltipAnchorEl] = useState<HTMLElement | null>(
    null,
  );

  // Tooltip open and closed control value
  const tooltipOpen = Boolean(tooltipAnchorEl);

  // Apply to button that make the tooltip visible
  const handleTooltipOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setTooltipAnchorEl(event.currentTarget);
    },
    [],
  );

  // Apply to button to turn off Tooltip
  const handleTooltipClose = useCallback(() => {
    setTooltipAnchorEl(null);
  }, []);

  return {
    tooltipAnchorEl,
    setTooltipAnchorEl,
    tooltipOpen,
    handleTooltipOpen,
    handleTooltipClose,
  };
};

export default useTooltip;
