import { createSlice } from '@reduxjs/toolkit';

const initialPopupState: {
  isShowPopup: boolean;
  product: ProductModel;
} = {
  isShowPopup: false,
  product: {
    category: '',
    description: '',
    longDescription: '',
    price: '',
    title: '',
  }
};

const popupSlice = createSlice({
  name: 'popup',
  initialState: initialPopupState,
  reducers: {
    SHOW_POPUP(state, action) {
      state.isShowPopup = true;
      state.product = action.payload;
    },
    HIDE_POPUP(state) {
      state.isShowPopup = false;
    },
  },
});

export const counterActions = popupSlice.actions;

export type PopupSliceModel = ReturnType<typeof popupSlice.getInitialState>;

export default popupSlice.reducer;