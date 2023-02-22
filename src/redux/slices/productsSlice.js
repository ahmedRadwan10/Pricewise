import { createSlice } from '@reduxjs/toolkit';

const initialState = {
      products: []
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
      state.products = action.payload;
    }
  }
});

export const { fetchProducts } = productsSlice.actions;

export default productsSlice.reducer;