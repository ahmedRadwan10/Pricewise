import { fetchProducts } from "../redux/slices/productsSlice";

export async function getProducts(dispatch) {
    const response = await fetch("/data/products.json");
    const data = await response.json();
    dispatch(fetchProducts(data.products));
}