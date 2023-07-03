import React, { useEffect, useRef } from "react";
import styles from "../Product.module.css";
import { useState } from "react";
import Chart from "./Chart";
import {
  getWishListData,
  sendProductToDataBase,
  sendProductToWishlist,
} from "../../../APIs/products";
import { useDispatch, useSelector } from "react-redux";
import Image from "../../../Components/Collection/Image";
import Alarm from "../../../Components/Collection/Alarm/Alarm";
import {
  setProductid,
  showWishlistPopUp,
} from "../../../redux/slices/addWishlistSlice";

const vendors = {
  Amazon: "/assets/imgs/amazon.png",
  Noon: "/assets/imgs/noon.svg",
  Jumia: "/assets/imgs/jumia.png",
};

const ProductData = ({ product }) => {
  const dispatch = useDispatch();
  const id = useSelector(({ addWishlistState }) => addWishlistState.id);
  const wishlist = useSelector(({ productsState }) => productsState.wishlist);
  const success = useSelector(
    ({ addWishlistState }) => addWishlistState.success
  );
  const token = useSelector(({ authState }) => authState.user.access);
  const user = useSelector(({ authState }) => authState.user);
  const refAddToWishlistBtn = useRef();
  const [added, setAdded] = useState(false);
  const [wishlistBtn, setWishlistBtn] = useState("Add to wishlist");
  let isProductInWishlist = false;

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
    /*sendProductToWishlist(dispatch, products, product.id);*/
    //post request to add product in wishlist in database
    //------------------------------------------------///

    if (user) {
      //show inputForm to enter desired_price
      dispatch(showWishlistPopUp());
    } else {
      console.log("please Sign In"); //ui design
    }
  };

  const checkProductInWishlist = (wishlist) => {
    if (wishlist.length != 0) {
      wishlist.products.map((el) => console.log(el.product.id));
      isProductInWishlist = wishlist.products.some(
        (el) => el.product.id === id
      );
    }
    if (isProductInWishlist) {
      changeAddToWishlistBtn();
    } else {
      defaultAddToWishlistBtn();
    }
  };

  const changeAddToWishlistBtn = () => {
    setWishlistBtn("In Your Wishlist");
    setAdded(true);
    refAddToWishlistBtn.current.style.cursor = "default";
  };

  const defaultAddToWishlistBtn = () => {
    setWishlistBtn("Add to wishlist");
    setAdded(false);
    refAddToWishlistBtn.current.style.cursor = "pointer";
  };

  const renderPriceChange = () => {
    return (
      <div className={styles.saving}>
        {Number(product.price) > Number(product.sale_price) ? (
          <div
            style={
              Number(product.sale_price)
                ? { transform: "scale(1)" }
                : { transform: "scale(0)" }
            }
            className={styles.discount}
          >
            {Math.floor(product.price - product.sale_price)} <span>EGP</span>
          </div>
        ) : (
          <div className={styles.change}>
            {product.sale_price - product.price} <span>EGP</span>
          </div>
        )}
        {Number(product.price) > Number(product.sale_price) ? (
          <div
            style={
              Number(product.sale_price)
                ? { transform: "scale(1)" }
                : { transform: "scale(0)" }
            }
            className={styles.price_change}
          >
            {Math.floor(
              100 - (Number(product.sale_price) / product.price) * 100
            )}
            <span>%</span>{" "}
            <i className={`fa-solid fa-arrow-trend-down fa-beat-fade"}`}></i>
          </div>
        ) : (
          <div className={styles.price_change_negative}>
            {Math.floor(100 - (product.price / product.sale_price) * 100)}
            <span>%</span> <i className="fa-solid fa-arrow-trend-up"></i>
          </div>
        )}
      </div>
    );
  };

  const handleBuyNowClicked = (url) => {
    const newTab = window.open(url, "_blank");
    newTab.focus();
  };

  useEffect(() => {
    dispatch(setProductid(product.id));
    checkProductInWishlist(wishlist);
  }, [product, success, wishlist, id]);
  return (
    <>
      <div className={styles.all_data_container}>
        <div className={styles.box}>
          <h4 className={styles.headline}>Product Overview</h4>
          <div className={styles.product_img_container}>
            {product.images.length > 0 ? (
              <Image
                imgSrc={`${product.images[0].image_url}`}
                imgAlt={product.title}
              />
            ) : (
              <div></div>
            )}
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
              {product.sale_price
                ? renderNewPrice(product.sale_price)
                : renderNewPrice(product.price)}
              {product.sale_price ? renderOldPrice(product.price) : ""}
            </div>
            {product.sale_price ? renderPriceChange() : ""}
          </div>
          <div className={styles.buy_now}>
            <button
              className={styles.buy_now_btn}
              onClick={() => handleBuyNowClicked(product.url)}
            >
              <span>
                <i className="fa-solid fa-cart-plus"></i>
              </span>
              <span>Buy now</span>
            </button>
            <button
              onClick={addToWishlist}
              disabled={added ? true : false}
              className={styles.add_to_wishlist}
              ref={refAddToWishlistBtn}
            >
              <span>
                {added ? (
                  <i className="fa-solid fa-star"></i>
                ) : (
                  <i className="fa-regular fa-bell"></i>
                )}
              </span>
              <span>{wishlistBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductData;
