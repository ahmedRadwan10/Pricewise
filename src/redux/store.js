import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./slices/bannerSlice";
import categoriesReducer from "./slices/categoriesSlice";
import productsReducer from "./slices/productsSlice";
import alarmReducer from "./slices/alarmSlice";
import authSlice from "./slices/authSlice";
import langSlice from "./slices/langSlice";

export const store = configureStore({
  reducer: {
    langState: langSlice,
    bannerState: bannerReducer,
    categoriesState: categoriesReducer,
    productsState: productsReducer,
    alarmState: alarmReducer,
    authState: authSlice,
  },
});
