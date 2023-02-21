import { configureStore } from '@reduxjs/toolkit';
import bannerReducer from './slices/bannerSlice';
import categoriesReducer from './slices/categoriesSlice';


export const store = configureStore({
    reducer: {
      bannerState: bannerReducer,
      categoriesState: categoriesReducer
    },
});