import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Image from "../Image";
import styles from "./ProductsOverview.module.css";
import {
  addProductToWishlist,
  changeProductWishlistState,
} from "../../../APIs/products";
import ProductCard from "./SubComponents/ProductCard";
import { useTranslation } from "react-i18next";

const ProductsOverview = ({ title, products, maxProducts }) => {
  const { t } = useTranslation();
  const productsContainer = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renderProducts = () => {
    if (products) {
      return products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          products={products}
          maxProducts={maxProducts}
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

  // useEffect(() => {
  //     console.log(products);
  // })

  if (products)
    return (
      <div className={styles.main_container}>
        <button className={styles.scroll_btn} onClick={scrollProductsToLeft}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button className={styles.scroll_btn} onClick={scrollProductsToRight}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        <div className={styles.header}>
          <h2>{title}</h2>
          <button>{t("shop-now")}</button>
        </div>
        <div ref={productsContainer} className={styles.products_container}>
          {renderProducts()}
        </div>
      </div>
    );
};

export default ProductsOverview;
