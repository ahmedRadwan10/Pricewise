import { createSlice } from '@reduxjs/toolkit';

const initialState = {
      lang: "en"
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
      changeReduxLanguage: (state, action) => {
          state.lang = action.payload;
      }
  }
});

export const { changeReduxLanguage } = languageSlice.actions;

export default languageSlice.reducer;