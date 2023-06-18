import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  home: {},
  search: {
    results: {
      products: [],
      filter: {}
    },
  },
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
    fetchSearchProducts: (state, action) => {
      state.search =  {
                        results: {
                          products: [],
                          filter: {}
                        },
                      };
      state.search = action.payload;
    },
    fetchFilteredSearchProducts: (state, action) => {
      state.search.results.products = action.payload.results.products;
      state.search.count = action.payload.count;
    },
    sortReduxSearchProducts: (state, action) => {
      state.search.results.products = action.payload;
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
  fetchPopularProducts,
  fetchSearchProducts,
  sortReduxSearchProducts,
  fetchFilteredSearchProducts
} = productsSlice.actions;

export default productsSlice.reducer;
