import { fetchCategories } from "../redux/slices/categoriesSlice";

export async function getCategories(dispatch) {
    const response = await fetch("/data/categories.json");
    const data = await response.json();
    dispatch(fetchCategories(data.categories));
}