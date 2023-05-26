import { useSelector } from "react-redux";
import {
  addProductToWishlist,
  fetchHotDealsProducts,
  fetchPopularProducts,
  fetchProduct,
  fetchProducts,
  removeProduct,
  updateProductWishlist,
  updateProductWishlistState,
} from "../redux/slices/productsSlice";


export async function getHotDealsProducts(dispatch) {
  const response = await fetch('http://127.0.0.1:8000/product/all/deals/');
  const data = await response.json();
  dispatch(fetchHotDealsProducts(data.results));
}

export async function getPopularProducts(dispatch) {
  const response = await fetch('http://127.0.0.1:8000/product/popular/');
  const data = await response.json();
  dispatch(fetchPopularProducts(data.results));
}

export async function getProduct(dispatch, slug) {
  const response = await fetch(`http://127.0.0.1:8000/product/${slug}/`);
  const data = await response.json();
  console.log(data);
  dispatch(fetchProduct(data));
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
