import { useSelector } from "react-redux";
import {
  addProductToWishlist,
  fetchHotDealsProducts,
  fetchPopularProducts,
  fetchProduct,
  fetchProducts,
  fetchSearchProducts,
  getWishlistDataSuccessfully,
  removeProduct,
  sortReduxSearchProducts,
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
    const response = await fetch(
      `http://127.0.0.1:8000/search/products/${query}/?limit=50&offset=${offset}`,
      {
        method: "POST",
      }
    );
    if (response.ok) {
      const data = await response.json();
      dispatch(fetchSearchProducts(data));
    } else {
      throw new Error("Request not successful!");
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export function sortSearchProducts(dispatch, products, sortMethod, isAsend) {
  let noSwaps;
  for (let i = products.length; i > 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      let currentProduct;
      let comparedProduct;
      let condition;
      if (sortMethod === "saving") {
        currentProduct =
          Number(products[j].price) - Number(products[j].sale_price);
        comparedProduct =
          Number(products[j + 1].price) - Number(products[j + 1].sale_price);
        condition = currentProduct > comparedProduct;
      } else {
        currentProduct = Number(products[j].sale_price)
          ? Number(products[j].sale_price)
          : Number(products[j].price);
        comparedProduct = Number(products[j + 1].sale_price)
          ? Number(products[j + 1].sale_price)
          : Number(products[j + 1].price);
        condition = currentProduct > comparedProduct;
      }
      if (condition) {
        let temp = products[j];
        products[j] = products[j + 1];
        products[j + 1] = temp;
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }
  if (isAsend === "false") products.reverse();
  dispatch(sortReduxSearchProducts(products));
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
  try {
    const response = await fetch("http://127.0.0.1:8000/favorites/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Handle successful response
      console.log("Product added to favorites");
    } else {
      // Handle error response
      console.error("Failed to add product to favorites");
    }
  } catch (error) {
    // Handle network error
    console.error("Error:", error);
  }
}

export async function getWishListData(dispatch, token) {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/favorites/?limit=50&offset=0",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      dispatch(addProductToWishlist(data.results));
      dispatch(getWishlistDataSuccessfully());
    }
  } catch (error) {
    // Handle network error
    console.error("Error:", error);
  }
}
