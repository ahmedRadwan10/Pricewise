import { createSlice } from '@reduxjs/toolkit';

const initialState = {
      banners: []
};

export const bannerSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    fetchBanners: (state, action) => {
      state.banners = action.payload;
    }
  }
});

export const { fetchBanners } = bannerSlice.actions;

export default bannerSlice.reducer;