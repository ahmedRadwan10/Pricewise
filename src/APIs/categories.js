import {
  fetchCategories,
  fetchSubCategories,
} from "../redux/slices/categoriesSlice";

export async function getCategories(dispatch) {
  const response = await fetch("/data/categories.json");
  const data = await response.json();
  dispatch(fetchCategories(data.categories));
}
export async function getSubCategories(dispatch, title) {
  const response = await fetch("/data/categories.json");
  const data = await response.json();
  data.categories.map((cat) => {
    if (cat.title === title) {
      dispatch(fetchSubCategories(cat.subcats));
      return;
    }
  });
}
