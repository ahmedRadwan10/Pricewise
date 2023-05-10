import React, { useEffect, useRef } from "react";
import styles from "../Product.module.css";
import { useState } from "react";
import Chart from "./Chart";
import { sendProductToWishlist } from "../../../APIs/products";
import { useDispatch, useSelector } from "react-redux";
import Image from "../../../Components/Collection/Image";

const ProductData = ({ product }) => {
  const dispatch = useDispatch();
  const products = useSelector(({ productsState }) => productsState.products);
  const wishlist = useSelector(({ productsState }) => productsState.wishlist);
  const [added, setAdded] = useState(false);

  const renderOldPrice = () => {
    return (
      <div className={styles.old_price}>
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
      <div className={styles.saving}>
          { product.old_price > product.new_price ? <div className={styles.discount}>{product.old_price - product.new_price} <span>EGP</span></div> : <div className={styles.change}>{product.new_price - product.old_price} <span>EGP</span></div> }
          { product.old_price > product.new_price ? <div className={styles.price_change}>{Math.floor(100 - (product.new_price / product.old_price) * 100)}<span>%</span> <i className={`fa-solid fa-arrow-trend-down`}></i></div> : <div className={styles.price_change_negative}>{Math.floor(100 - (product.old_price / product.new_price) * 100)}<span>%</span> <i className="fa-solid fa-arrow-trend-up"></i></div>}
      </div>
    );
  };

  return (
    <>
      <div className={styles.all_data_container}>
        <div className={styles.box}>
        <h4 className={styles.headline}>Product Overview</h4>
          <div className={styles.header}>
            <h4>{product.brand_name}</h4>
            {/* <button
            onClick={addToWishlist}
            disabled={added ? true : false}
            className={styles.add_to_wishlist}
          >
            <i className="fa-regular fa-bell"></i>
            <i className="fa-solid fa-circle-plus"></i>
          </button> */}
          </div>
          <h3>{product.title}</h3>
          <div className={styles.product_img_container}>
            <Image
                imgSrc={`/assets/imgs/products/product.png`}
                imgAlt={product.title}
            />
          </div>
            {product.rating ? (
              <div className={styles.rating_container}>
                <div>
                  <i className="fa-solid fa-star fa-sm"></i>
                  <i className="fa-solid fa-star fa-sm"></i>
                  <i className="fa-solid fa-star fa-sm"></i>
                  <i className="fa-solid fa-star fa-sm"></i>
                  <i className="fa-solid fa-star fa-sm"></i>
                </div>
              <span>{product.rating}</span> 
              <span></span>
              <span>564 reviews</span>
              </div>
            ) : (
              ""
          )}
          <div className={styles.description}>
            <p>
              Typically weighing less than 5 lbs and notebooks keep their supreme lightweight portability advantage over laptops, Laptops are used in a variety of settings such as at work in education for playing games web browsing for personal multimedia and for general.
            </p>
          </div>
          <div className={styles.prices}>
            <div>
              {product.new_price ? renderNewPrice() : ""}
              {product.old_price ? renderOldPrice() : ""}
            </div>
            {product.old_price ? renderPriceChange() : ""}
          </div>
          <div className={styles.buy_now}>
              <button className={styles.buy_now_btn}>
                <span>
                  <i className="fa-solid fa-cart-plus"></i> Buy now
                </span>
              </button>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default ProductData;
