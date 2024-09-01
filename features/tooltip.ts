import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  isTooltipOpen: boolean;
  tooltipButtons: { text: string; onClick: VoidFunction }[];
}

const initialState: InitialState = {
  isTooltipOpen: false,
  tooltipButtons: [],
};

const tooltipSlice = createSlice({
  name: 'tooltip',
  initialState,
  reducers: {
    openTooltip: (
      state,
      action: PayloadAction<Pick<InitialState, 'tooltipButtons'>>,
    ) => {
      const { tooltipButtons } = action.payload;
      state.isTooltipOpen = true;
      state.tooltipButtons = tooltipButtons;
    },
    closeTooltip: (state) => {
      state.isTooltipOpen = false;
      state.tooltipButtons = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { openTooltip, closeTooltip } = tooltipSlice.actions;

export default tooltipSlice.reducer;
