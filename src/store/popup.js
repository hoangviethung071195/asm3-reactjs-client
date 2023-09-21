import { createSlice } from '@reduxjs/toolkit';

const initialPopupState = { isShowPopup: false, product: {} };

const popupSlice = createSlice({
  name: 'popup',
  initialState: initialPopupState,
  reducers: {
    SHOW_POPUP(state, action) {
      state.isShowPopup = true;
      state.product = action.payload
    },
    HIDE_POPUP(state) {
      state.isShowPopup = false;
    },
  },
});

export const counterActions = popupSlice.actions;

export default popupSlice.reducer;