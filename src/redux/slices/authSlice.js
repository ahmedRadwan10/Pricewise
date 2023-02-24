import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  signUpSuccess: false,
  loading: false,
  error: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startPostUser: (state) => {
      state.signUpSuccess = false;
      state.loading = true;
    },
    successPostUser: (state, action) => {
      state.signUpSuccess = action.payload;
      state.loading = false;
    },
    errorPostUser: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});
export const { startPostUser, successPostUser, errorPostUser } =
  authSlice.actions;
export default authSlice.reducer;
