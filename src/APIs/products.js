import { useSelector } from "react-redux";
import { addProductToWishlist, fetchProducts, removeProduct, updateProductWishlist, updateProductWishlistState } from "../redux/slices/productsSlice";

export async function getProducts(dispatch) {
    const response = await fetch("/data/products.json");
    const data = await response.json();
    dispatch(fetchProducts({...data}));
}

export async function sendProductToWishlist(dispatch, products, productID) {
    let product = {};
    products.forEach(p => {
        if (p.id === productID) {
            product = p;
        }
    });
    // dispatch(removeProduct(productID));
    dispatch(addProductToWishlist(product));
}