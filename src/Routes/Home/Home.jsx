import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Banner from "../../Components/Collection/Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../../APIs/banners";
import {
  getHotDealsProducts,
  getPopularProducts,
  getProducts,
  getWishListData,
} from "../../APIs/products";
import ProductsOverview from "../../Components/Collection/ProductsOverview/ProductsOverview";
import { useTranslation } from "react-i18next";

const Home = () => {
  const lang = useSelector(({ langState }) => langState.lang);
  const { t } = useTranslation();
  const banners = useSelector(({ bannerState }) => bannerState.banners);
  const hotDealsProducts = useSelector(
    ({ productsState }) => productsState.home.hotDealsProducts
  );
  const popularProducts = useSelector(
    ({ productsState }) => productsState.home.popularProducts
  );
  const wishlist = useSelector(({ productsState }) => productsState.wishlist);
  const token = useSelector(({ authState }) => authState.user.access);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Pricewise - Home";
    getHotDealsProducts(dispatch);
    getPopularProducts(dispatch);
  }, [dispatch]);
  
  useEffect(() => {
    getBanners(dispatch, lang);
  }, [dispatch, lang])

  useEffect(() => {
    if (token) {
      getWishListData(dispatch, token);
    }
  }, [dispatch, token]);

  return (
    <div className={styles.main_container}>
      <Banner banners={banners} />
      <ProductsOverview
        title="Hot Deals 🔥"
        products={hotDealsProducts}
        maxProducts={5}
      />
      <ProductsOverview
        title="Popular Products"
        products={popularProducts}
        maxProducts={5}
      />
    </div>
  );
};

export default Home;
