import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: {},
  wishlist: [],
  selectedProduct: {},
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
      state.products = action.payload;
    },
    removeProduct: (state, action) => {
      delete state.products[`ID-${action.payload}`];
    },
    fetchProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    addProductToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
  },
});

export const {
  fetchProducts,
  removeProduct,
  fetchProduct,
  addProductToWishlist,
} = productsSlice.actions;

export default productsSlice.reducer;
