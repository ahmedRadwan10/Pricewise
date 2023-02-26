import React, { Suspense } from "react";
import styles from "./Product.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "../../Components/Collection/Image";
import { lazy } from "react";
import { getProduct, getProducts } from "../../APIs/products";
import ProductData from "./SubComponents/ProductData";
import ProductsOverview from "../../Components/Collection/ProductsOverview/ProductsOverview";

const Product = () => {
  const products = useSelector(({ productsState }) => productsState.products);
        const product = useSelector(({ productsState }) => productsState.selectedProduct);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (product) document.title = `${product.title}`;
    return () => (document.title = "Pricewise");
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProduct(dispatch, params.productID);
    getProducts(dispatch);
  }, [dispatch, params]);

  if (product)
    return (
      <div className={styles.main_container}>
        <div className={styles.nav_container}>
          <Link>Home</Link>
          <span>
            <i className="fa-solid fa-chevron-right"></i>
          </span>
          <Link to="">Electronics</Link>
          <span>
            <i className="fa-solid fa-chevron-right"></i>
          </span>
          <Link to="">{product.title}</Link>
        </div>
        <div className={styles.flex_container}>
          <div className={styles.product_img_container}>
            <Image
              imgSrc={`/assets/imgs/products/product.png`}
              imgAlt={product.title}
            />
          </div>
                <ProductData product={product} />
        </div>
            <div className={styles.description}>
              <h3>Overview</h3>
              <p><i className="fa-solid fa-circle-info"></i> Typically weighing less than 5 lbs and notebooks keep their supreme lightweight portability advantage over laptops, Laptops are used in a variety of settings such as at work in education for playing games web browsing for personal multimedia and for general home computer use, The main advantage of a laptop as compared with a stationary computer is its mobility, A laptop notebook computer is a small portable personal computer with a screen and alphanumeric keyboard, Laptop Notebook are used in a variety of settings such as at work in education for playing games web browsing for personal multimedia and for general home computer use.</p>
            </div>
            <ProductsOverview title="Same Products" products={products} />
            <ProductsOverview title="New Arrivals" products={products} />
      </div>
    );
};

export default Product;
