import { configureStore } from '@reduxjs/toolkit';
import bannerReducer from './slices/bannerSlice';
import categoriesReducer from './slices/categoriesSlice';
import productsReducer from './slices/productsSlice';


export const store = configureStore({
    reducer: {
      bannerState: bannerReducer,
      categoriesState: categoriesReducer,
      productsState: productsReducer,
    },
});