import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters: {},
    prices: [],
    numOfFilters: 0
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
          state.numOfFilters++;
      },
      removeFilter: (state, action) => {
          const slug = action.payload.filter_slug;
          const value = action.payload.filter_value;
          const arrayOfFilter = state.filters[slug];
          var index = arrayOfFilter.indexOf(value);
          if (index !== -1) {
              arrayOfFilter.splice(index, 1);
              state.numOfFilters--;
          }
          if (arrayOfFilter.length === 0) delete state.filters[slug];
      },
      changePrices: (state, action) => {
          state.prices = action.payload;
      }
  }
});

export const { addFilter, removeFilter, changePrices } = filterSlice.actions;

export default filterSlice.reducer;