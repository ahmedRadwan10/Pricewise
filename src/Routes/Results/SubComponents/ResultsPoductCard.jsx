import React, { useRef, useState } from 'react';
import styles from '../Results.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Image from '../../../Components/Collection/Image';
import { sendProductToWishlist } from '../../../APIs/products';
import { setAlarmDetails, showAlarm } from '../../../redux/slices/alarmSlice';

const vendors = {
  Amazon: "/assets/imgs/amazon.png",
  Noon: "",
  Jumia: "",
};

const ResultsProductCard = ({ product, products }) => {
  const lang = useSelector(({ langState }) => langState.lang);
  const [favBtnActive, setFavBtnActive] = useState(false);
  const [productHovered, setProductHovered] = useState(false);
  const [productContainerHidden, setContainerHidden] = useState(false);
  const productElement = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleProductOnClick = (product) => {
    if (!favBtnActive) navigate(`/${product.category.toLowerCase()}/${product.slug}`);
  }


  const renderOldPrice = (price) => {
    return (
      <div className={styles.old_price_container}>
        <div>
          <span>{price}</span>
          <span>EGP</span>
        </div>
      </div>
    );
  };
    
    const renderNewPrice = (price) => {
        return (
          <div className={styles.new_price_container}>
            <div>
              <span>
                <strong>{price}</strong>
              </span>
              <span>EGP</span>
            </div>
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
                  <span>({ product.reviews })</span>
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

  const handleFavBtnClick = (productID) => {
    setContainerHidden(true);
    sendProductToWishlist(dispatch, products, productID);
    const alarmTitle = `Well done!`;
    const alarmDesc = `${product.title} added to your wishlist successfully.`;
    dispatch(setAlarmDetails({ title: alarmTitle, description: alarmDesc }));
    dispatch(showAlarm());
  }
    
  if (product) {
      return <div
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
            <div className={styles.vendor}>
              <img src={vendors[`${product.vendor}`]} alt={product.vendor} />
            </div>
            <div className={styles.product_img_container}>
                <Image imgSrc={`https://m.media-amazon.com/images/I/${product.images[0].image_url}.jpg`} imgAlt={product.title} />
            </div>
            <p title={product.title}>{product.title}</p>
            <div className={styles.price_container}>
                <div className={styles.new_price_container}>
                {product.sale_price ? renderNewPrice(product.sale_price) : renderNewPrice(product.price)}
                </div>
                {product.sale_price ? renderOldPrice(product.price) : ""}
            </div>
            <div className={styles.saving}>
              { Number(product.price) > Number(product.sale_price) ? <div style={ Number(product.sale_price) ? { transform: "scale(1)" } : { transform: "scale(0)" } } className={styles.discount}>{Math.floor(product.price - product.sale_price)} <span>EGP</span></div> : <div className={styles.change}>{product.sale_price - product.price} <span>EGP</span></div> }
              { Number(product.price) > Number(product.sale_price) ? <div style={ Number(product.sale_price) ? { transform: "scale(1)" } : { transform: "scale(0)" } } className={styles.price_change}>{Math.floor(100 - (Number(product.sale_price) / product.price) * 100)}<span>%</span> <i className={`fa-solid fa-arrow-trend-down fa-beat-fade"}`}></i></div> : <div className={styles.price_change_negative}>{Math.floor(100 - (product.price / product.sale_price) * 100)}<span>%</span> <i className="fa-solid fa-arrow-trend-up"></i></div>}
            </div>
            <div lang={lang} className={styles.product_footer}>
                { renderProductFooter(product) }
            </div>
        </div>
    }
}

export default ResultsProductCard;