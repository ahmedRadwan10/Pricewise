import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  subCategories: [],
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
  },
});

export const { fetchCategories, fetchSubCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
