import React, { useRef, useState } from 'react';
import styles from '../ProductsOverview.module.css';
import Image from '../../Image';
import { addProductToWishlist, sendProductToWishlist } from '../../../../APIs/products';
import { useDispatch } from 'react-redux';

const ProductCard = ({ product, products }) => {
  const [favBtnActive, setFavBtnActive] = useState(false);
  const [productContainerHidden, setContainerHidden] = useState(false);
  const productElement = useRef();
  const dispatch = useDispatch();

  const handleProductOnClick = (product) => {
    // navigate(`/${product.category.title}/${product.subCategory.id}/${product.id}`)
  }


  const renderProductOldPrice = (product) => {
    return (
        <div className={styles.old_price_container}>
            <span>{product.old_price.toFixed(2)}</span>
        </div>
    );
  }

const renderProductFooter = (product) => {
    return (
        <>
            { product.rating ? <div className={styles.rating_container}>
                <i className="fa-solid fa-star fa-sm"></i>
                <span>{product.rating}</span>
            </div> : <div className={styles.rating_container}> <i className="fa-solid fa-star fa-sm"></i> 0.0</div>}
        </>
    );
  }

  const handleFavBtnClick = (productID) => {
    // productElement.current.style.marginRight = "4em";
    setContainerHidden(true);
    setTimeout(() => {
      // productElement.current.style.marginRight = "0";
    }, 600)
    sendProductToWishlist(dispatch, products, productID);
  }

  if (product["img-src"]) {
    return <div
            ref={productElement}
            className={ productContainerHidden ? styles.product_container_hidden : styles.product_container }
            onClick={() => handleProductOnClick(product)}
            >
            <button onMouseOver={() => setFavBtnActive(true)} onMouseLeave={() => setFavBtnActive(false)} onClick={() => handleFavBtnClick(product.id)} className={styles.fav_btn}>{ !favBtnActive ? <img src="/assets/imgs/icons/heart.svg" alt="Heart Icon" /> : <img src="/assets/imgs/icons/heart_red.svg" alt="Heart Icon" /> }</button>
            <div className={styles.product_img_container}>
                <Image imgSrc={`/assets/imgs/products/product.png`} imgAlt={product.title} />
            </div>
            <p title={product.title}>{product.title}</p>
            <div className={styles.price_container}>
                <div className={styles.new_price_container}>
                    <span>{product.new_price.toFixed(2)}</span>
                    <span>EGP</span>
                </div>
                {product.old_price > product.new_price ? <div className={styles.price_change}>{Math.floor(100 - (product.new_price / product.old_price) * 100)}<span>%</span> <i className="fa-solid fa-arrow-trend-down fa-beat-fade"></i></div> : <div className={styles.price_change_negative}>{Math.floor(100 - (product.old_price / product.new_price) * 100)}<span>%</span> <i className="fa-solid fa-arrow-trend-up"></i></div>}
            </div>
            {product.old_price ? renderProductOldPrice(product) : ""}
            <div className={styles.product_footer}>
                { renderProductFooter(product) }
            </div>
        </div>
    }
}

export default ProductCard;