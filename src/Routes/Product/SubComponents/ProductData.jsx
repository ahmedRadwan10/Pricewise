import React, { useEffect, useRef } from "react";
import styles from "../Product.module.css";
import { useState } from "react";
import Image from "../../../Components/Collection/Image";
import Chart from "./Chart";
import { sendProductToWishlist } from "../../../APIs/products";
import { useDispatch, useSelector } from "react-redux";

const ProductData = ({ product }) => {
  const dispatch = useDispatch();
  const products = useSelector(({ productsState }) => productsState.products);
  const wishlist = useSelector(({ productsState }) => productsState.wishlist);
  const [added, setAdded] = useState(false);

  const renderOldPrice = () => {
    return (
      <div className={styles.old_price}>
        <span>Old price</span>
        <div>
          <span>{product.old_price.toFixed(2)}</span>
          <span>EGP</span>
        </div>
      </div>
    );
  };

  const renderNewPrice = () => {
    return (
      <div className={styles.new_price}>
        <span>New price</span>
        <div>
          <span>
            <strong>{product.new_price.toFixed(2)}</strong>
          </span>
          <span>EGP</span>
        </div>
      </div>
    );
  };
  const addToWishlist = (e) => {
    e.preventDefault();
    sendProductToWishlist(dispatch, products, product.id);
    //post request to add product in wishlist in database
    //------------------------------------------------///
  };

  const productAddedToishlist = () => {
    if (product.id) {
      wishlist.forEach((p) => {
        if (p.id === product.id) {
          setAdded(true);
          return;
        }
      });
    }
  };
  useEffect(() => {
    setAdded(false);
    productAddedToishlist();
  }, [product, wishlist]);

  const renderPriceChange = () => {
    return (
      <div className={styles.price_change}>
        <span>Price change</span>
        <div>
          {product.old_price > product.new_price ? (
            <div className={styles.decreasing}>
              <span>-</span>
              {Math.floor(100 - (product.new_price / product.old_price) * 100)}
              <span>%</span> <i className={`fa-solid fa-arrow-trend-down`}></i>
            </div>
          ) : (
            <div className={styles.increasing}>
              <span>+</span>
              {Math.floor(100 - (product.old_price / product.new_price) * 100)}
              <span>%</span> <i className="fa-solid fa-arrow-trend-up"></i>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.all_data_container}>
        <div className={styles.header}>
          <h4>{product.brand_name}</h4>
          {product.rating ? (
            <div className={styles.rating_container}>
              {product.rating}
              <i className="fa-solid fa-star fa-sm"></i>
            </div>
          ) : (
            ""
          )}
        </div>
        <h3>{product.title}</h3>
        <div className={styles.buy_now}>
          <button
            onClick={addToWishlist}
            disabled={added ? true : false}
            className={styles.add_to_wishlist}
          >
             <i className="fa-regular fa-bell"></i>
            <i className="fa-solid fa-circle-plus"></i>
          </button>
            <button className={styles.buy_now_btn}>
              <span>
                <i className="fa-solid fa-cart-plus"></i> Buy now
              </span>
            </button>
        </div>
        <div className={styles.prices}>
          {product.new_price ? renderNewPrice() : ""}
          <span className={styles.div}></span>
          {product.old_price ? renderPriceChange() : ""}
          <span className={styles.div}></span>
          {product.old_price ? renderOldPrice() : ""}
        </div>
        <Chart />
        <div className={styles.description}>
              <h3>Overview</h3>
              <p>Typically weighing less than 5 lbs and notebooks keep their supreme lightweight portability advantage over laptops, Laptops are used in a variety of settings such as at work in education for playing games web browsing for personal multimedia and for general home computer use, The main advantage of a laptop as compared with a stationary computer is its mobility, A laptop notebook computer is a small portable personal computer with a screen and alphanumeric keyboard, Laptop Notebook are used in a variety of settings such as at work in education for playing games web browsing for personal multimedia and for general home computer use.</p>
        </div>
      </div>
    </>
  );
};

export default ProductData;
