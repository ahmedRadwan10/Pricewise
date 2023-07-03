import React, { useEffect, useRef, useState } from "react";
import styles from "../ProductsOverview.module.css";
import Image from "../../Image";
import { sendProductToWishlist } from "../../../../APIs/products";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlarmDetails,
  showAlarm,
} from "../../../../redux/slices/alarmSlice";
import { useNavigate } from "react-router";
import {
  setProductid,
  showWishlistPopUp,
} from "../../../../redux/slices/addWishlistSlice";

const vendors = {
  Amazon: "/assets/imgs/amazon.png",
  Noon: "/assets/imgs/noon.svg",
  Jumia: "/assets/imgs/jumia.png",
};

const ProductCard = ({ product, products, maxProducts }) => {
  const lang = useSelector(({ langState }) => langState.lang);
  const [favBtnActive, setFavBtnActive] = useState(false);
  const [productHovered, setProductHovered] = useState(false);
  const [productContainerHidden, setContainerHidden] = useState(false);
  const [added, setAdded] = useState(false);
  const [icon, setIcon] = useState("fa-regular fa-bell");
  const [secondIcon, setSecondIcon] = useState();
  const refAddToWishlistBtn = useRef();
  const id = useSelector(({ addWishlistState }) => addWishlistState.id);
  const wishlist = useSelector(({ productsState }) => productsState.wishlist);
  const success = useSelector(
    ({ addWishlistState }) => addWishlistState.success
  );
  const user = useSelector(({ authState }) => authState.user);

  const productElement = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let isProductInWishlist = false;

  let currency = lang === "en" ? "EGP" : "جم";

  const handleProductOnClick = (product) => {
    if (!favBtnActive)
      navigate(`/${product.category.toLowerCase()}/${product.slug}`);
  };

  const renderProductOldPrice = (oldPrice) => {
    return (
      <div className={styles.old_price_container}>
        <span
          style={
            oldPrice !== "0"
              ? { transform: "scale(1)" }
              : { transform: "scale(0)" }
          }
        >
          {oldPrice}
        </span>
        <span
          lang={lang}
          style={
            oldPrice !== "0"
              ? { transform: "scale(1)" }
              : { transform: "scale(0)" }
          }
        >
          {currency}
        </span>
      </div>
    );
  };

  const renderProductFooter = (product) => {
    return (
      <>
        {product.rating ? (
          <div className={styles.rating_container}>
            <div className={styles.rating}>
              <i className="fa-solid fa-star fa-sm"></i>
              <span>{Number(product.rating).toFixed(1)}</span>
            </div>
            <div className={styles.reviews}>
              <span>({product.reviews})</span>
            </div>
          </div>
        ) : (
          <div className={styles.rating_container}>
            {" "}
            <i className="fa-solid fa-star fa-sm"></i> <span>0.0</span>
          </div>
        )}
      </>
    );
  };

  const truncateTitle = (title) => {
    const LENGTH = 30;
    if (title.length <= LENGTH) {
      return title;
    } else {
      return title.slice(0, LENGTH);
    }
  };

  const handleFavBtnClick = (productID) => {
    /*setContainerHidden(true);
    sendProductToWishlist(dispatch, products, productID);
    const alarmTitle = `Well done!`;
    const alarmDesc = `${product.title} added to your wishlist successfully.`;
    dispatch(setAlarmDetails({ title: alarmTitle, description: alarmDesc }));
    dispatch(showAlarm());*/
    if (user) {
      dispatch(setProductid(product.id));
      dispatch(showWishlistPopUp());
    } else {
      console.log("please Sign In"); //ui design
    }
  };

  const productStyles = {
    width: `calc((100% - ${maxProducts - 1}em) / ${maxProducts})`,
  };

  const checkProductInWishlist = (wishlist) => {
    if (wishlist.products.length !== 0) {
      isProductInWishlist = wishlist.products.some(
        (el) => el.product.id === product.id
      );
    }
    if (isProductInWishlist) {
      changeAddToWishlistBtn();
    } else {
      defaultAddToWishlistBtn();
    }
  };

  const changeAddToWishlistBtn = () => {
    setAdded(true);
    setIcon("fa-sharp fa-solid fa-heart");
    setSecondIcon("");
    refAddToWishlistBtn.current.style.color = "#921c1c";
    refAddToWishlistBtn.current.style.opacity = "1";
    refAddToWishlistBtn.current.style.cursor = "default";
  };

  const defaultAddToWishlistBtn = () => {
    setAdded(false);
    setIcon("fa-regular fa-bell");
    setSecondIcon("fa-solid fa-circle-plus");
    refAddToWishlistBtn.current.style.color = "var(--dark-gray)";
    refAddToWishlistBtn.current.style.cursor = "pointer";
  };

  useEffect(() => {
    checkProductInWishlist(wishlist);
  }, [product, success, wishlist, product.id]);

  if (product) {
    return (
      <div
        style={maxProducts ? productStyles : {}}
        ref={productElement}
        className={
          productContainerHidden
            ? styles.product_container_hidden
            : styles.product_container
        }
        onClick={() => handleProductOnClick(product)}
        onMouseOver={() => setProductHovered(true)}
        onMouseLeave={() => setProductHovered(false)}
      >
        <button
          onMouseOver={() => setFavBtnActive(true)}
          onMouseLeave={() => setFavBtnActive(false)}
          onClick={() => handleFavBtnClick(product.id)}
          className={styles.fav_btn}
          disabled={added ? true : false}
          ref={refAddToWishlistBtn}
        >
          <i className={icon}></i>
          <i className={secondIcon}></i>
        </button>
        <div className={styles.vendor}>
          <img src={vendors[`${product.vendor}`]} alt={product.vendor} />
        </div>
        <div className={styles.product_img_container}>
          {product.images && product.images.length > 0 ? (
            <Image
              imgSrc={`${product.images[0].image_url}`}
              imgAlt={product.title}
            />
          ) : "" }
        </div>
        <p title={product.title}>{product.title}</p>
        <div className={styles.price_container}>
          <div className={styles.new_price_container}>
            <span>
              {product.sale_price ? product.sale_price : product.price}
            </span>
            <span lang={lang}>{currency}</span>
          </div>
          {product.sale_price
            ? renderProductOldPrice(product.price)
            : renderProductOldPrice("0")}
        </div>
        <div lang={lang} className={styles.saving}>
          {Number(product.price) > Number(product.sale_price) ? (
            <div
              style={
                Number(product.sale_price)
                  ? { transform: "scale(1)" }
                  : { transform: "scale(0)" }
              }
              className={styles.discount}
            >
              {Math.floor(product.price - product.sale_price)}  <span lang={lang}>{currency}</span>
            </div>
          ) : (
            <div className={styles.change}>
              {product.sale_price - product.price}  <span lang={lang}>{currency}</span>
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
              <i
                className={`fa-solid fa-arrow-trend-down ${
                  productHovered ? "fa-beat-fade" : ""
                }`}
              ></i>
            </div>
          ) : (
            <div className={styles.price_change_negative}>
              {Math.floor(100 - (product.price / product.sale_price) * 100)}
              <span>%</span> <i className="fa-solid fa-arrow-trend-up"></i>
            </div>
          )}
        </div>
        <div lang={lang} className={styles.product_footer}>
          {renderProductFooter(product)}
        </div>
      </div>
    );
  }
};

export default ProductCard;
