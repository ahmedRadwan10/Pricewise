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
import { setAlarmDetails, showAlarm } from "../../../redux/slices/alarmSlice";

const vendors = {
  Amazon: "/assets/imgs/amazon.png",
  Noon: "",
  Jumia: "",
};

const ProductData = ({ product }) => {
  const dispatch = useDispatch();
  const products = useSelector(({ productsState }) => productsState.products);
  const wishlist = useSelector(({ productsState }) => productsState.wishlist);
  const success = useSelector(
    ({ productsState }) => productsState.getWishlistDataSuccess
  );
  const token = useSelector(({ authState }) => authState.user.access);
  const user = useSelector(({ authState }) => authState.user);
  const refAddToWishlistBtn = useRef();
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [desiredPrice, setDesiredPrice] = useState();
  const [wishlistBtn, setWishlistBtn] = useState("Add to wishlist");
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
      setWishlistOpen(!wishlistOpen);
    } else {
      console.log("please Sign In"); //ui design
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

  const handleWishlistSubmit = () => {
    if (desiredPrice) {
      //sendProductToDataBase with product_id and desired_price
      sendProductToDataBase(
        {
          product_id: product.id,
          desired_price: desiredPrice,
        },
        token
      );

      //show alarm
      dispatch(
        setAlarmDetails({
          title: product.title,
          description: product.description,
        })
      );
      dispatch(showAlarm());

      //change addToWishlist button
      changeAddToWishlistBtn();

      // Close the wishlist form/modal
      setWishlistOpen(false);
    }
  };
  useEffect(() => {
    const isProductInWishlist = wishlist.some(
      (el) => el.product.id === product.id
    );
    if (isProductInWishlist) {
      changeAddToWishlistBtn();
    } else {
      defaultAddToWishlistBtn();
    }
  }, [product]);
  return (
    <>
      <div className={styles.all_data_container}>
        <div className={styles.box}>
          <h4 className={styles.headline}>Product Overview</h4>
          <div className={styles.product_img_container}>
            {product.images && product.images.length > 0 ? (
              <Image
                imgSrc={`https://m.media-amazon.com/images/I/${product.images[0].image_url}.jpg`}
                imgAlt={product.title}
              />
            ) : (
              <div>No image</div>
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
            {wishlistOpen && (
              <div className={styles.wishlist_form}>
                <input
                  type="number"
                  placeholder="Enter Desired Price"
                  onChange={(e) => setDesiredPrice(e.target.value)}
                />
                <button onClick={handleWishlistSubmit}>Submit</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductData;
