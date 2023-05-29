import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Banner from "../../Components/Collection/Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../../APIs/banners";
import {
  getHotDealsProducts,
  getPopularProducts,
  getProducts,
} from "../../APIs/products";
import ProductsOverview from "../../Components/Collection/ProductsOverview/ProductsOverview";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const banners = useSelector(({ bannerState }) => bannerState.banners);
  const hotDealsProducts = useSelector(
    ({ productsState }) => productsState.home.hotDealsProducts
  );
  const popularProducts = useSelector(
    ({ productsState }) => productsState.home.popularProducts
  );
  const wishlist = useSelector(({ productsState }) => productsState.wishlist);
  const dispatch = useDispatch();

  const [maxProducts, setMaxProducts] = useState(5);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setMaxProducts(2);
    } else if (window.innerWidth <= 992) {
      setMaxProducts(4);
    } else {
      setMaxProducts(5);
    }
  };

  const addResizeListener = () => {
    window.addEventListener("resize", handleResize);
  };

  const removeResizeListener = () => {
    window.removeEventListener("resize", handleResize);
  };

  useEffect(() => {
    document.title = "Pricewise - Home";
    getBanners(dispatch);
    getHotDealsProducts(dispatch);
    getPopularProducts(dispatch);
    addResizeListener();
    return removeResizeListener;
  }, [dispatch]);

  return (
    <div className={styles.main_container}>
      <Banner banners={banners} />
      <ProductsOverview
        title="Hot Deals 🔥"
        products={hotDealsProducts}
        maxProducts={maxProducts}
      />
      <ProductsOverview
        title="Popular Products"
        products={popularProducts}
        maxProducts={maxProducts}
      />
    </div>
  );
};

export default Home;
