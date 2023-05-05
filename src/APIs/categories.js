import {
  fetchCategories,
  fetchSubCategories,
} from "../redux/slices/categoriesSlice";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function getCategories(dispatch) {
  const response = await fetch("/data/categories.json");
  const data = await response.json();
  dispatch(fetchCategories(data.categories));
}
export async function getSubCategories(dispatch, title) {
  const response = await fetch("/data/categories.json");
  const data = await response.json();
  data.categories.map((cat) => {
    if (cat.title.toLowerCase() === title) {
      dispatch(fetchSubCategories(cat.subcats));
      return;
    }
  });
}
