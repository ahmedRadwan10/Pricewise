import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Image from "../Image";
import styles from "./ProductsOverview.module.css";
import {
  addProductToWishlist,
  changeProductWishlistState,
} from "../../../APIs/products";
import ProductCard from "./SubComponents/ProductCard";
import { useTranslation } from "react-i18next";

const ProductsOverview = ({ title, products, maxProducts, ctaIsDisabled, navIsDisabled }) => {
  const lang = useSelector(({ langState }) => langState.lang);
  const { t } = useTranslation();
  const productsContainer = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [maxProductsResize, setMaxProductsResize] = useState(5);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setMaxProductsResize(2);
    } else if (window.innerWidth <= 992) {
      setMaxProductsResize(4);
    } else {
      setMaxProductsResize(maxProducts);
    }
  };

  const addResizeListener = () => {
    window.addEventListener("resize", handleResize);
  };

  const removeResizeListener = () => {
    window.removeEventListener("resize", handleResize);
  };

  const renderProducts = () => {
    if (products) {
      return products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          products={products}
          maxProducts={maxProductsResize}
        />
      ));
    }
  };

  const scrollProductsToLeft = () => {
    productsContainer.current.scrollLeft -= 500;
  };

  const scrollProductsToRight = () => {
    productsContainer.current.scrollLeft += 500;
  };

  useEffect(() => {
    addResizeListener();
    return removeResizeListener;
  }, []);

  if (products)
    return (
      <div className={styles.main_container}>
        { !navIsDisabled ? <><button className={styles.scroll_btn} onClick={scrollProductsToLeft}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button className={styles.scroll_btn} onClick={scrollProductsToRight}>
          <i className="fa-solid fa-chevron-right"></i>
        </button></> : "" }
        <div className={styles.header}>
          <h2>{title}</h2>
          { !ctaIsDisabled ? <button lang={lang}>{t("shop-now")}</button> : "" }
        </div>
        <div ref={productsContainer} className={styles.products_container}>
          {renderProducts()}
        </div>
      </div>
    );
};

export default ProductsOverview;
