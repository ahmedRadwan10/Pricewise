import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import Banner from "../../Components/Collection/Banner/Banner";
import { getBanners } from "../../APIs/banners";
import { getSubCategories, getSubCategoriesProducts } from "../../APIs/categories";
import styles from "./Category.module.css";
import { getProducts } from "../../APIs/products";
import ProductsOverview from "../../Components/Collection/ProductsOverview/ProductsOverview";
import Sidebar from "./SubComponents/Sidebar";

const Category = () => {
  const lang = useSelector(({ langState }) => langState.lang);
  const banners = useSelector(({ bannerState }) => bannerState.banners);
  const products = useSelector(({ categoriesState }) => categoriesState.products);
  const categories = useSelector(({ categoriesState }) => categoriesState.categories);
  const subCategories = useSelector(({ categoriesState }) => categoriesState.subCategories);
  const dispatch = useDispatch();
  const params = useParams();

  const renderSubCategoryOverviews = () => {
    if (subCategories)
      return subCategories.map((sub) => {
        return <ProductsOverview
          key={sub.slug}
          title={`${sub.name}s`}
          products = {products[sub.slug]}
          maxProducts = {3}
        />
    });
  };

  const capitalizeWord = (word) => {
    const str = word.charAt(0).toUpperCase() + word.slice(1);
    return <>{str}</>;
  };

  useEffect(() => {
    getBanners(dispatch, lang);
    getSubCategories(dispatch, params.category, categories);
    getSubCategoriesProducts(dispatch, subCategories);
  }, [dispatch, params, categories, subCategories, lang]);

  return (
    <div className={styles.main_container}>
      <div className={styles.nav_container}>
        <Link to="/">Home</Link>
        <span>
          <i className="fa-solid fa-chevron-right"></i>
        </span>
        <Link to={`/${params.category}`}>
          {capitalizeWord(params.category)}
        </Link>
      </div>
      <Sidebar category={params.category} />
      <div className={styles.main_section}>
        <Banner banners={banners} />
        { renderSubCategoryOverviews() }
      </div>
    </div>
  );
};
export default Category;
