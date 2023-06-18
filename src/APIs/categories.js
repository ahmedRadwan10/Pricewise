import {
  fetchCategories,
  fetchSubCategories,
  fetchSubCategoryProducts,
} from "../redux/slices/categoriesSlice";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function getCategories(dispatch) {
  const response = await fetch("http://127.0.0.1:8000/category/");
  const data = await response.json();
  dispatch(fetchCategories(data));
}

export async function getSubCategories(dispatch, slug, categories) {
  categories.results.map((cat) => {
    if (cat.slug === slug) {
      dispatch(fetchSubCategories(cat.subcategory));
    }
  });
}

export async function getSubCategoriesProducts(dispatch, subCategories) {
  subCategories.forEach(async (sub) => {
     const response = await fetch(`http://127.0.0.1:8000/category/${sub.slug}/products/`);
     const data = await response.json();
     dispatch(fetchSubCategoryProducts({ slug: sub.slug, results: data.results }))
  });
}

