import { useSelector } from "react-redux";
import {
  addProductToWishlist,
  fetchHotDealsProducts,
  fetchPopularProducts,
  fetchProduct,
  fetchProducts,
  fetchSearchProducts,
  removeProduct,
  updateProductWishlist,
  updateProductWishlistState,
} from "../redux/slices/productsSlice";

export async function getHotDealsProducts(dispatch) {
  const response = await fetch("http://127.0.0.1:8000/product/all/deals/");
  const data = await response.json();
  dispatch(fetchHotDealsProducts(data.results));
}

export async function getPopularProducts(dispatch) {
  const response = await fetch("http://127.0.0.1:8000/product/popular/");
  const data = await response.json();
  dispatch(fetchPopularProducts(data.results));
}

export async function getSearchProducts(dispatch, query, offset) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/search/products/${query}/?limit=50&offset=${offset}`, {
      method: "POST",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      dispatch(fetchSearchProducts(data));
    } else {
      throw new Error("Request not successful!");
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getProduct(dispatch, slug) {
  const response = await fetch(`http://127.0.0.1:8000/product/${slug}/`);
  const data = await response.json();
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

export async function sendProductToDataBase(data, token) {
  fetch("http://127.0.0.1:8000/favorites/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        // Handle successful response
        console.log("Product added to favorites");
      } else {
        // Handle error response
        console.error("Failed to add product to favorites");
      }
    })
    .catch((error) => {
      // Handle network error
      console.error("Error:", error);
    });
}
