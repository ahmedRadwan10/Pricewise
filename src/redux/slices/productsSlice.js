import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  home: {},
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
    fetchHotDealsProducts: (state, action) => {
      state.home.hotDealsProducts = action.payload;
    },
    fetchPopularProducts: (state, action) => {
      state.home.popularProducts = action.payload;
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
  fetchHotDealsProducts,
  fetchPopularProducts
} = productsSlice.actions;

export default productsSlice.reducer;
