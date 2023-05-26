import React, { useEffect, useRef } from "react";
import styles from "../Product.module.css";
import { useState } from "react";
import Chart from "./Chart";
import { sendProductToWishlist } from "../../../APIs/products";
import { useDispatch, useSelector } from "react-redux";
import Image from "../../../Components/Collection/Image";

const vendors = {
  Amazon: "/assets/imgs/amazon.png",
  Noon: "",
  Jumia: "",
} 

const ProductData = ({ product }) => {
  const dispatch = useDispatch();
  const products = useSelector(({ productsState }) => productsState.products);
  const wishlist = useSelector(({ productsState }) => productsState.wishlist);
  const [added, setAdded] = useState(false);

  const renderOldPrice = (price) => {
    return (
      <div className={styles.old_price}>
        <div>
          <span>{price}</span>
          <span>EGP</span>
        </div>
      </div>
    );
  };

  const renderNewPrice = (price) => {
    return (
      <div className={styles.new_price}>
        <div>
          <span>
            <strong>{price}</strong>
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
          { Number(product.price) > Number(product.sale_price) ? <div style={ Number(product.sale_price) ? { transform: "scale(1)" } : { transform: "scale(0)" } } className={styles.discount}>{Math.floor(product.price - product.sale_price)} <span>EGP</span></div> : <div className={styles.change}>{product.sale_price - product.price} <span>EGP</span></div> }
                { Number(product.price) > Number(product.sale_price) ? <div style={ Number(product.sale_price) ? { transform: "scale(1)" } : { transform: "scale(0)" } } className={styles.price_change}>{Math.floor(100 - (Number(product.sale_price) / product.price) * 100)}<span>%</span> <i className={`fa-solid fa-arrow-trend-down fa-beat-fade"}`}></i></div> : <div className={styles.price_change_negative}>{Math.floor(100 - (product.price / product.sale_price) * 100)}<span>%</span> <i className="fa-solid fa-arrow-trend-up"></i></div>}
      </div>
    );
  };

  const handleBuyNowClicked = (url) => {
    const newTab = window.open(url, '_blank');
    newTab.focus();
  }

  return (
    <>
      <div className={styles.all_data_container}>
        <div className={styles.box}>
        <h4 className={styles.headline}>Product Overview</h4>
            <div className={styles.product_img_container}>
              <Image
                  imgSrc={`https://m.media-amazon.com/images/I/${product.images[0].image_url}.jpg`}
                  imgAlt={product.title}
              />
            </div>
          <div className={styles.header}>
            <h4>{product.brand}</h4>
          </div>
          <h3>{product.title}</h3>
            {product.rating ? (
              <div className={styles.rating_container}>
                <div>
                  <img src={vendors[product.vendor]} alt={product.vendor} />
                </div>
                <span></span>
                <div>
                    <i className="fa-solid fa-star fa-sm"></i>
                </div>
                <span>{Number(product.rating).toFixed(1)}</span> 
                <span></span>
                <span>{product.reviews} reviews</span>
                </div>
            ) : (
              ""
          )}
          <div className={styles.prices}>
            <div>
              {product.sale_price ? renderNewPrice(product.sale_price) : renderNewPrice(product.price)}
              {product.sale_price ? renderOldPrice(product.price) : ""}
            </div>
            {product.sale_price ? renderPriceChange() : ""}
          </div>
          <div className={styles.buy_now}>
              <button className={styles.buy_now_btn} onClick={() => handleBuyNowClicked(product.url)}>
                <span>
                  <i className="fa-solid fa-cart-plus"></i>
                </span>
                <span>Buy now</span>
              </button>
              <button
              onClick={addToWishlist}
              disabled={added ? true : false}
              className={styles.add_to_wishlist}
            >
              <span><i className="fa-regular fa-bell"></i></span>
              <span>Add to wishlist</span>
            </button>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default ProductData;
