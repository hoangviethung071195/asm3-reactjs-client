import { configureStore } from '@reduxjs/toolkit';

import popupReducer from './popup';

const store = configureStore({
  reducer: { popup: popupReducer},
});

export type ConfigureStoreModel = ReturnType<typeof store.getState>;

export default store;