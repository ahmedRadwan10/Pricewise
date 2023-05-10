import { useSelector } from "react-redux";
import {
  addProductToWishlist,
  fetchProduct,
  fetchProducts,
  removeProduct,
  updateProductWishlist,
  updateProductWishlistState,
} from "../redux/slices/productsSlice";


export async function getProducts(dispatch) {
  const response = await fetch('/data/products.json');
  const data = await response.json();
  dispatch(fetchProducts({ ...data }));
}

export async function getProduct(dispatch, productID) {
  const response = await fetch("/data/products.json");
  const data = await response.json();
  dispatch(fetchProduct(data[`ID-${productID}`]));
}

export async function sendProductToWishlist(dispatch, products, productID) {
  let product = {};
  const productsArr = Object.values(products);
  productsArr.forEach((p) => {
    if (p.id === productID) {
      product = p;
    }
  });
  // dispatch(removeProduct(productID));
  dispatch(addProductToWishlist(product));
}
