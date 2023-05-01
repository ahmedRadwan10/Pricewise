import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  signUpSuccess: false,
  signInSuccess: false,
  loading: false,
  error: false,
  token: "",
  msg: {},
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state) => {
      const userStr = localStorage.getItem("user");
      state.token = localStorage.getItem("token");
      state.user = JSON.parse(userStr);

      if (state.user) {
        state.signInSuccess = true;
      } else state.user = "";
      state.token = "";
    },
    logOut: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.signInSuccess = false;
    },
    ///SignUp//////
    startSignUpUser: (state) => {
      state.signUpSuccess = false;
      state.loading = true;
    },
    successSignUpUser: (state, action) => {
      state.signUpSuccess = action.payload;
      state.loading = false;
    },
    errorSignUpUser: (state, action) => {
      state.loading = false;
      state.error = true;
      state.msg = action.payload;
    },
    ////SignIn////////
    startSignInUser: (state) => {
      state.msg = "";
      state.signInSuccess = false;
      state.loading = true;
    },
    successSignInUser: (state, action) => {
      state.msg = "";
      state.loading = false;
      state.signInSuccess = true;
      state.token = action.payload.token;
      state.user = action.payload;

      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", action.payload.token);
    },
    errorSignUpUser: (state, action) => {
      state.msg = action.payload;
      state.loading = false;
      state.error = true;
    },
  },
});
export const {
  addUser,
  logOut,
  startSignUpUser,
  successSignUpUser,
  errorSignUpUser,
  startSignInUser,
  successSignInUser,
  errorSignInUser,
  msg,
} = authSlice.actions;
export default authSlice.reducer;
