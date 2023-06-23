import { useSelector } from "react-redux";
import {
  addProductToWishlist,
  fetchDealProducts,
  fetchFilteredSearchProducts,
  fetchHotDealsProducts,
  fetchPopularProducts,
  fetchProduct,
  fetchProducts,
  fetchSearchProducts,
  getWishlistDataSuccessfully,
  removeProduct,
  removeProductFromWishlistSuccessfully,
  sortReduxSearchProducts,
  startRemoveFromWishlist,
  startUpdateProductDesiredPrice,
  updateProductDesiredPriceSuccessfully,
  updateProductWishlist,
  updateProductWishlistState,
} from "../redux/slices/productsSlice";
import {
  startAddToWishlist,
  successAddToWishlist,
} from "../redux/slices/addWishlistSlice";

export async function getHotDealsProducts(dispatch) {
  const response = await fetch("http://127.0.0.1:8000/product/all/deals/");
  const data = await response.json();
  dispatch(fetchHotDealsProducts(data.results));
}

export async function getDealProducts(dispatch, categories) {
  categories.results.forEach((cat) => {
    cat.subcategory.forEach(async (sub) => {
      const response = await fetch(
        `http://127.0.0.1:8000/product/${sub.slug}/deals/`
      );
      const data = await response.json();
      dispatch(
        fetchDealProducts({ title: sub.name + "s", products: data.results })
      );
    });
  });
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

export async function getFilteredSearchProducts(
  dispatch,
  query,
  filters,
  price
) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/search/products/${query}/?filters=${filters}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filters, price }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      dispatch(fetchFilteredSearchProducts(data));
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

export async function sendProductToDataBase(dispatch, data, token) {
  try {
    dispatch(startAddToWishlist());
    const response = await fetch("http://127.0.0.1:8000/favorites/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    console.log(response);

    if (response.ok) {
      // Handle successful response
      console.log("Product added to favorites");
      dispatch(successAddToWishlist());
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
      console.log(data);
      dispatch(addProductToWishlist(data.results));
      dispatch(getWishlistDataSuccessfully());
    }
  } catch (error) {
    // Handle network error
    console.error("Error:", error);
  }
}

export async function deleteFromWishlist(dispatch, token, id) {
  try {
    dispatch(startRemoveFromWishlist());
    const response = await fetch(`http://127.0.0.1:8000/favorites/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);

    if (response.ok) {
      dispatch(removeProductFromWishlistSuccessfully());
    }
  } catch (error) {
    // Handle network error
    console.error("Error:", error);
  }
}

export async function updateProductDesiredPrice(dispatch, token, id, price) {
  try {
    dispatch(startUpdateProductDesiredPrice());
    const response = await fetch(`http://127.0.0.1:8000/favorites/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ desired_price: price }),
    });
    console.log(response);

    if (response.ok) {
      dispatch(updateProductDesiredPriceSuccessfully());
    }
  } catch (error) {
    // Handle network error
    console.error("Error:", error);
  }
}
