import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  home: {
    deals: {},
  },
  search: {
    results: {
      products: [],
      filter: {},
    },
  },
  wishlist: [],
  getWishlistDataSuccess: false,
  removeSuccess: false,
  removeLoading: false,
  updateSuccess: false,
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
      state.search = {
        results: {
          products: [],
          filter: {},
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
    fetchDealProducts: (state, action) => {
      state.home.deals[action.payload.title] = action.payload.products;
    },
    fetchHotDealsProducts: (state, action) => {
      state.home["Hot Deals 🔥"] = action.payload;
    },
    fetchPopularProducts: (state, action) => {
      state.home["Popular Products"] = action.payload;
    },
    fetchProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    addProductToWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    startRemoveFromWishlist: (state) => {
      state.removeSuccess = false;
      state.removeLoading = true;
    },
    getWishlistDataSuccessfully: (state) => {
      state.getWishlistDataSuccess = true;
    },
    removeProductFromWishlistSuccessfully: (state) => {
      state.removeSuccess = true;
      state.removeLoading = false;
    },
    startUpdateProductDesiredPrice: (state) => {
      state.updateSuccess = false;
    },
    updateProductDesiredPriceSuccessfully: (state) => {
      state.updateSuccess = true;
    },
  },
});

export const {
  fetchProducts,
  removeProduct,
  fetchProduct,
  addProductToWishlist,
  fetchHotDealsProducts,
  fetchDealProducts,
  fetchPopularProducts,
  fetchSearchProducts,
  sortReduxSearchProducts,
  fetchFilteredSearchProducts,
  getWishlistDataSuccessfully,
  removeProductFromWishlistSuccessfully,
  startRemoveFromWishlist,
  startUpdateProductDesiredPrice,
  updateProductDesiredPriceSuccessfully,
} = productsSlice.actions;

export default productsSlice.reducer;
