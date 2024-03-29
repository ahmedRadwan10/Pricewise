import React, { useEffect, useState } from "react";
import styles from "./NotificationMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import MarkBtn from "./MarkBtn";
import { useNavigate } from "react-router";
import {
  getNotificationData,
  getNotificationProductData,
} from "../../../../APIs/products";

const NotificationMenu = ({ visible, setVisible }) => {
  const homeDeals = useSelector(({ productsState }) => productsState.home);
  const lang = useSelector(({ langState }) => langState.lang);
  const [toggle, setToggle] = useState(false);
  const token = useSelector(({ authState }) => authState.user.access);
  const notificationData = useSelector(
    ({ productsState }) => productsState.notificationData
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNotificationClicked = (product) => {
    navigate(`/${product.category.toLowerCase()}/${product.slug}`);
    setVisible(false);
  };

  useEffect(() => {
    getNotificationData(dispatch, token);
  }, [token]);

  const renderNotifications = () => {
      if (notificationData.length != 0) {
        return notificationData.results.map((product) => (
          <div
            key={product.id}
            className={styles.notification}
            onClick={() => handleNotificationClicked(product)}
          >
            <span className={styles.dot}></span>
            <div className={styles.img_container}>
              <img src={`${product.images[0].image_url}`} alt={product.title} />
            </div>
            <div className={styles.info}>
              <h5>{product.title}</h5>
              <div className={styles.prices}>
                <div className={styles.new_price}>
                  <span>{product.favorite.product.sale_price}</span>
                  <span>EGP</span>
                  <div className={styles.old_price}>
                    <span>{product.favorite.product.price}</span>
                    {/* <span>EGP</span> */}
                  </div>
                </div>
                <div className={styles.saving}>
                  {/* { Number(product.price) > Number(product.sale_price) ? <div style={ Number(product.sale_price) ? { transform: "scale(1)" } : { transform: "scale(0)" } } className={styles.discount}>{Math.floor(product.price - product.sale_price)} <span>EGP</span></div> : <div className={styles.change}>{product.sale_price - product.price} <span>EGP</span></div> } */}
                  {Number(product.favorite.product.price) >
                  Number(product.favorite.product.sale_price) ? (
                    <div
                      style={
                        Number(product.sale_price)
                          ? { transform: "scale(1)" }
                          : { transform: "scale(0)" }
                      }
                      className={styles.price_change}
                    >
                      {Math.floor(
                        100 -
                          (Number(product.favorite.product.sale_price) /
                            product.favorite.product.price) *
                            100
                      )}
                      <span>%</span>{" "}
                      <i
                        className={`fa-solid fa-arrow-trend-down fa-beat-fade"}`}
                      ></i>
                    </div>
                  ) : (
                    <div className={styles.price_change_negative}>
                      {Math.floor(
                        100 -
                          (product.favorite.product.price /
                            product.favorite.product.sale_price) *
                            100
                      )}
                      <span>%</span>{" "}
                      <i className="fa-solid fa-arrow-trend-up"></i>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <MarkBtn />
            <div className={styles.saving}>
              {/* { Number(product.price) > Number(product.sale_price) ? <div style={ Number(product.sale_price) ? { transform: "scale(1)" } : { transform: "scale(0)" } } className={styles.discount}>{Math.floor(product.price - product.sale_price)} <span>EGP</span></div> : <div className={styles.change}>{product.sale_price - product.price} <span>EGP</span></div> } */}
              {Number(product.favorite.product.price) >
              Number(product.favorite.product.sale_price) ? (
                <div
                  style={
                    Number(product.sale_price)
                      ? { transform: "scale(1)" }
                      : { transform: "scale(0)" }
                  }
                  className={styles.price_change}
                >
                  {Math.floor(
                    100 -
                      (Number(product.favorite.product.sale_price) /
                        product.favorite.product.price) *
                        100
                  )}
                  <span>%</span>{" "}
                  <i
                    className={`fa-solid fa-arrow-trend-down fa-beat-fade"}`}
                  ></i>
                </div>
              ) : (
                <div className={styles.price_change_negative}>
                  {Math.floor(
                    100 -
                      (product.favorite.product.price /
                        product.favorite.product.sale_price) *
                        100
                  )}
                  <span>%</span> <i className="fa-solid fa-arrow-trend-up"></i>
                </div>
              )}
            </div>
          </div>
        ));
      }
    };

  return (
    <>
      <div
        className={visible ? styles.overlay : styles.overlay_hidden}
        onClick={() => setVisible(false)}
      ></div>
      <div
        lang={lang}
        className={
          visible ? styles.main_container : styles.main_container_hidden
        }
      >
        <div className={styles.header}>
          <div>
            <h3>Notifications</h3>
            <p>Stay updated on your favorite products.</p>
          </div>
          {/* <div className={styles.filters}>
                        <button className={ !toggle ? styles.btn_active : "" } onClick={() => setToggle(prev => !prev)}>Unread</button>
                        <button className={ toggle ? styles.btn_active : "" } onClick={() => setToggle(prev => !prev)}>Read</button>
                    </div> */}
        </div>
        <div className={styles.notifications}>{renderNotifications()}</div>
      </div>
    </>
  );
};

export default NotificationMenu;
