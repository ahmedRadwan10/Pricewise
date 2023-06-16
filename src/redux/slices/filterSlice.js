import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters: {}
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
      addFilter: (state, action) => {
          const slug = action.payload.filter_slug;
          const value = action.payload.filter_value;
          if (state.filters[slug]) state.filters[slug].push(value);
          else state.filters[slug] = [value];
      }
  }
});

export const { addFilter } = filterSlice.actions;

export default filterSlice.reducer;