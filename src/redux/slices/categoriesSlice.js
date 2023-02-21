import { createSlice } from '@reduxjs/toolkit';

const initialState = {
      categories: []
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategories: (state, action) => {
      state.categories = action.payload;
    }
  }
});

export const { fetchCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;