import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: {},
  subCategories: [],
  products: {}
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchCategories: (state, action) => {
      state.categories = action.payload;
    },
    fetchSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },
    fetchSubCategoryProducts: (state, action) => {
      state.products[action.payload.slug] = action.payload.results;
    },
  },
});

export const { fetchCategories, fetchSubCategories, fetchSubCategoryProducts } = categoriesSlice.actions;

export default categoriesSlice.reducer;
