import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Banner from "../../Components/Collection/Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../../APIs/banners";
import {
  getDealProducts,
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
  const categories = useSelector(({ categoriesState }) => categoriesState.categories);
  const banners = useSelector(({ bannerState }) => bannerState.banners);
  const homeDeals = useSelector(({ productsState }) => productsState.home);
  const wishlist = useSelector(({ productsState }) => productsState.wishlist);
  const token = useSelector(({ authState }) => authState.user.access);
  const dispatch = useDispatch();

  const renderHomeDeals = () => {
    if (homeDeals.deals) {
      const entries = Object.entries(homeDeals.deals);
      return entries.map(deal => {
        return <ProductsOverview
        title={deal[0]}
        products={deal[1]}
        maxProducts={5}
      />
      });
    }
  }

  useEffect(() => {
    document.title = "Pricewise - Home";
    getHotDealsProducts(dispatch);
    getPopularProducts(dispatch);
  }, [dispatch]);
  
  useEffect(() => {
    getDealProducts(dispatch, categories);
  }, [dispatch, categories])
  
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
        title={"Hot Deals 🔥"}
        products={homeDeals["Hot Deals 🔥"]}
        maxProducts={5}
      />
      <ProductsOverview
        title={"Popular Products"}
        products={homeDeals["Popular Products"]}
        maxProducts={5}
      />
      { renderHomeDeals() }
    </div>
  );
};

export default Home;
