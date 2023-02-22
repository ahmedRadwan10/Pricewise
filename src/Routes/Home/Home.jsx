import React, { useEffect } from "react";
import styles from "./Home.module.css";
import Banner from "../../Components/Collection/Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../../APIs/banners";
import { getProducts } from "../../APIs/products";
import ProductsOverview from "../../Components/Collection/ProductsOverview/ProductsOverview";

const Home = () => {
  const banners = useSelector(({ bannerState }) => bannerState.banners);
  const products = useSelector(({ productsState }) => productsState.products);
  const dispatch = useDispatch();

    useEffect(() => {
      document.title = "Pricewise | Home";
      getBanners(dispatch);
      getProducts(dispatch);
    }, [dispatch])

  return (
    <div className={styles.main_container}>
      <Banner banners={banners} />
      <ProductsOverview data={{ title: "New Arrivals", products: products }} />
      <ProductsOverview data={{ title: "Mobile Phones", products: products }} />
      <ProductsOverview data={{ title: "All Tablets", products: products }} />
    </div>
  );
};

export default Home;
