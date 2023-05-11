import React, { Suspense, useState } from "react";
import styles from "./Product.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "../../Components/Collection/Image";
import { lazy } from "react";
import { getProduct, getProducts } from "../../APIs/products";
import ProductData from "./SubComponents/ProductData";
import ProductsOverview from "../../Components/Collection/ProductsOverview/ProductsOverview";
import Chart from "./SubComponents/Chart";
import ProductSpecs from "./SubComponents/ProductSpecs";

const Product = () => {
  const [togglerIsSpecs, setTogglerIsSpecs] = useState(false);
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
          <ProductData product={product} />
          <div className={styles.right_container}>
            <Chart />
            <div className={styles.specs_description_container}>
              <div className={styles.toggle}>
                <h4 onClick={() => setTogglerIsSpecs(false)} className={ !togglerIsSpecs ? styles.active_toggler : ""}>Description</h4>
                <h4 onClick={() => setTogglerIsSpecs(true)} className={ togglerIsSpecs ? styles.active_toggler : ""}>Specifications</h4>
              </div>
              <div className={styles.content}>
                {
                  togglerIsSpecs ? <ProductSpecs /> :
                    <div className={styles.description}>
                      <p>
                        Typically weighing less than 5 lbs and notebooks keep their supreme lightweight portability advantage over laptops, Laptops are used in a variety of settings such as at work in education for playing games web browsing for personal multimedia and for general.
                      </p>
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
        <ProductsOverview title="Same Products" products={products} maxProducts={5} />
      </div>
    );
};

export default Product;
