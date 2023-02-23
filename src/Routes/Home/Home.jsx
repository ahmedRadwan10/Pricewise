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
  const wishlist = useSelector(({ productsState }) => productsState.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
      document.title = "Pricewise | Home";
      getBanners(dispatch);
      getProducts(dispatch);
    }, [dispatch])

  return (
    <div className={styles.main_container}>
      <Banner banners={banners} />
      <ProductsOverview title="New Arrivals" products={products} />
    </div>
  );
};

export default Home;
