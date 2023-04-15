import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import Banner from "../../Components/Collection/Banner/Banner";
import { getBanners } from "../../APIs/banners";
import { getCategories, getSubCategories } from "../../APIs/categories";
import styles from "./Category.module.css";
import { getProducts } from "../../APIs/products";
import ProductsOverview from "../../Components/Collection/ProductsOverview/ProductsOverview";
import Sidebar from "./SubComponents/Sidebar";

const Category = () => {
  const products = useSelector(({ productsState }) => productsState.products);
  const banners = useSelector(({ bannerState }) => bannerState.banners);
  const subCategories = useSelector(
    ({ categoriesState }) => categoriesState.subCategories
  );
  const dispatch = useDispatch();
  const params = useParams();

  const renderSubCategoryOverviews = () => {
    if (subCategories)
      return subCategories.map((sub) => (
        <ProductsOverview key={sub} title={sub} products={products} containerSize={"p4"} />
      ));
  };

  useEffect(() => {
    getBanners(dispatch);
    getSubCategories(dispatch, params.category);
    getProducts(dispatch);
  }, [dispatch, params]);
  
  return (
    <div className={styles.main_container}>
      <div className={styles.nav_container}>
          <Link to="/">Home</Link>
          <span>
            <i className="fa-solid fa-chevron-right"></i>
          </span>
          <Link to="/electronics">Electronics</Link>
      </div>
      <Sidebar category={params.category} />
      <div className={styles.main_section}>
        <Banner banners={banners} />
        {renderSubCategoryOverviews()}
      </div>
    </div>
  );
};
export default Category;
