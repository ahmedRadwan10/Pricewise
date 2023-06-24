import { createSlice } from "@reduxjs/toolkit";
import {
  sendProductToDataBase,
  sendProductToWishlist,
} from "../../APIs/products";

const initialState = {
  shown: false,
  title: "",
  description: "",
  desiredPrice: 0,
  id: 0,
  notifyWhenAnyDrop: false,
  success: false,
  loading: false,
};

export const addToWishlistSlice = createSlice({
  name: "AddToWishlist",
  initialState,

  reducers: {
    showWishlistPopUp: (state) => {
      state.success = false;
      state.shown = true;
    },
    hideWishlistPopUp: (state) => {
      state.shown = false;
    },
    setDesiredPrice: (state, action) => {
      state.desiredPrice = action.payload;
      state.success = false;
    },
    setNotifyWhenAnyDrop: (state, action) => {
      state.notifyWhenAnyDrop = action.payload;
    },
    setProductid: (state, action) => {
      state.id = action.payload;
    },
    startAddToWishlist: (state) => {
      state.success = false;
      state.loading = true;
    },
    successAddToWishlist: (state, action) => {
      state.success = true;
      state.loading = false;
      state.desiredPrice = 0;
    },
  },
});

export const {
  showWishlistPopUp,
  hideWishlistPopUp,
  addProductToWishlist,
  setDesiredPrice,
  setNotifyWhenAnyDrop,
  startAddToWishlist,
  successAddToWishlist,
  setProductid,
} = addToWishlistSlice.actions;

export default addToWishlistSlice.reducer;
