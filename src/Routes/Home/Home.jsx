import React, { useEffect } from "react";
import styles from "./Home.module.css";
import Banner from "../../Components/Collection/Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../../APIs/banners";
import { getHotDealsProducts, getPopularProducts, getProducts } from "../../APIs/products";
import ProductsOverview from "../../Components/Collection/ProductsOverview/ProductsOverview";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const banners = useSelector(({ bannerState }) => bannerState.banners);
  const hotDealsProducts = useSelector(({ productsState }) => productsState.hotDealsProducts);
  const wishlist = useSelector(({ productsState }) => productsState.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
      document.title = "Pricewise - Home";
      getBanners(dispatch);
      getHotDealsProducts(dispatch);
    }, [dispatch]);

  return (
    <div className={styles.main_container}>
      <Banner banners={banners} />
      <ProductsOverview title="Hot Deals 🔥" products={hotDealsProducts} maxProducts={5} />
    </div>
  );
};

export default Home;
