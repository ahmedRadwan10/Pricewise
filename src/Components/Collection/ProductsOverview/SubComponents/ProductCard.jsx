import React, { useRef, useState } from 'react';
import styles from '../ProductsOverview.module.css';
import Image from '../../Image';
import { sendProductToWishlist } from '../../../../APIs/products';
import { useDispatch } from 'react-redux';
import { setAlarmDetails, showAlarm } from '../../../../redux/slices/alarmSlice';
import { useNavigate } from 'react-router';

const ProductCard = ({ product, products, maxProducts }) => {
  const [favBtnActive, setFavBtnActive] = useState(false);
  const [productHovered, setProductHovered] = useState(false);
  const [productContainerHidden, setContainerHidden] = useState(false);
  const productElement = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleProductOnClick = (product) => {
      if (!favBtnActive) navigate(`/electronics/mobile-phones${product.title}/${product.id}`);
  }


  const renderProductOldPrice = (product) => {
    return (
        <div className={styles.old_price_container}>
            <span>{product.old_price.toFixed(2)}</span>
            <span>EGP</span>
        </div>
    );
  }

const renderProductFooter = (product) => {
    return (
        <>
            { product.rating ? <div className={styles.rating_container}>
                <i className="fa-solid fa-star fa-sm"></i>
                <span>{product.rating}</span>
            </div> : <div className={styles.rating_container}> <i className="fa-solid fa-star fa-sm"></i> <span>0.0</span></div>}
        </>
    );
  }

  const handleFavBtnClick = (productID) => {
    setContainerHidden(true);
    sendProductToWishlist(dispatch, products, productID);
    const alarmTitle = `Well done!`;
    const alarmDesc = `${product.title} added to your wishlist successfully.`;
    dispatch(setAlarmDetails({ title: alarmTitle, description: alarmDesc }));
    dispatch(showAlarm());
    }
    
    const productStyles = {
        width: `calc((100% - ${maxProducts - 1}em) / ${maxProducts})`
    }

  if (product["img-src"]) {
      return <div
            style={ maxProducts ? productStyles : { } }
            ref={productElement}
            className={ productContainerHidden ? styles.product_container_hidden : styles.product_container }
            onClick={() => handleProductOnClick(product)}
            onMouseOver={() => setProductHovered(true)}
            onMouseLeave={() => setProductHovered(false)}
            >
            <button onMouseOver={() => setFavBtnActive(true)} onMouseLeave={() => setFavBtnActive(false)} onClick={() => handleFavBtnClick(product.id)} className={styles.fav_btn}>
                <i className="fa-regular fa-bell"></i>
                <i className="fa-solid fa-circle-plus"></i>
            </button>
            <div className={styles.product_img_container}>
                <Image imgSrc={`/assets/imgs/products/product.png`} imgAlt={product.title} />
            </div>
            <p title={product.title}>{product.title}</p>
            <div className={styles.price_container}>
                <div className={styles.new_price_container}>
                    <span>{product.new_price.toFixed(2)}</span>
                    <span>EGP</span>
                </div>
                {product.old_price ? renderProductOldPrice(product) : ""}
            </div>
            <div className={styles.saving}>
                { product.old_price > product.new_price ? <div className={styles.discount}>{product.old_price - product.new_price} <span>EGP</span></div> : <div className={styles.change}>{product.new_price - product.old_price} <span>EGP</span></div> }
                { product.old_price > product.new_price ? <div className={styles.price_change}>{Math.floor(100 - (product.new_price / product.old_price) * 100)}<span>%</span> <i className={`fa-solid fa-arrow-trend-down ${productHovered ? "fa-beat-fade" : ""}`}></i></div> : <div className={styles.price_change_negative}>{Math.floor(100 - (product.old_price / product.new_price) * 100)}<span>%</span> <i className="fa-solid fa-arrow-trend-up"></i></div>}
            </div>
        </div>
    }
}

export default ProductCard;