import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: {},
  wishlist: []
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
      state.products = action.payload;
    },
    removeProduct: (state, action) => {
      delete state.products[`ID-${action.payload}`];
    },
    addProductToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
  }
});

export const { fetchProducts, removeProduct, addProductToWishlist } = productsSlice.actions;

export default productsSlice.reducer;