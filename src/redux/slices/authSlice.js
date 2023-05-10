import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  signUpSuccess: false,
  signInSuccess: false,
  loading: false,
  error: false,
  token: "",
  msg: {},
  msgSignIn: "",
  activateSuccess: false,
  activateLoading: false,
  email: "",
  sendResetLinkSuccess: false,
  sendResetLinkLoading: false,
  passwordRestSuccess: false,
  passwordRestLoading: false,
  msgResetPassword: {},
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
    addEmail: (state) => {
      const userEmail = localStorage.getItem("email");
      state.email = JSON.parse(userEmail);
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
      state.msg = {};
    },
    successSignUpUser: (state, action) => {
      state.signUpSuccess = true;
      state.loading = false;
      state.email = action.payload.email;
      localStorage.setItem("email", JSON.stringify(action.payload.email));
    },
    errorSignUpUser: (state, action) => {
      state.loading = false;
      state.error = true;
      state.msg = action.payload;
    },
    ////SignIn////////
    startSignInUser: (state) => {
      state.msgSignIn = "";
      state.signInSuccess = false;
      state.loading = true;
    },
    successSignInUser: (state, action) => {
      state.msgSignIn = "";
      state.loading = false;
      state.signInSuccess = true;
      state.token = action.payload.token;
      state.user = action.payload;

      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", action.payload.token);
    },
    errorSignInUser: (state, action) => {
      state.msgSignIn = action.payload;
      state.loading = false;
      state.error = true;
    },
    ////Activate////////
    startActivate: (state) => {
      state.activateLoading = true;
      state.activateSuccess = false;
    },
    successActivate: (state) => {
      state.activateSuccess = true;
      state.activateLoading = false;
    },
    errorActivate: (state) => {
      state.activateSuccess = false;
      state.activateLoading = false;
    },
    ////ResetPass////////
    startSendResetLink: (state) => {
      state.sendResetLinkSuccess = false;
      state.sendResetLinkLoading = true;
    },
    successSendResetLink: (state) => {
      state.sendResetLinkSuccess = true;
      state.sendResetLinkLoading = false;
    },
    errorSendResetLink: (state) => {
      state.sendResetLinkSuccess = false;
      state.sendResetLinkLoading = true;
    },
    ////PassReset////////
    startPasswordReset: (state) => {
      state.passwordRestSuccess = false;
      state.passwordRestLoading = true;
      state.msgResetPassword = {};
    },
    successPasswordReset: (state) => {
      state.passwordRestSuccess = true;
      state.passwordRestLoading = false;
    },
    errorPasswordReset: (state, action) => {
      state.passwordRestSuccess = false;
      state.passwordRestLoading = false;
      state.msgResetPassword = action.payload;
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
  startActivate,
  successActivate,
  errorActivate,
  addEmail,
  msgSignIn,
  startSendResetLink,
  sendResetLinkSuccess,
  sendResetLinkLoading,
  successSendResetLink,
  errorSendResetLink,
  startPasswordReset,
  successPasswordReset,
  errorPasswordReset,
  passwordRestSuccess,
  passwordRestLoading,
  msgResetPassword,
} = authSlice.actions;
export default authSlice.reducer;
