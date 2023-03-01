import React, { useEffect, useState } from 'react';
import styles from './NotificationMenu.module.css';
import { useSelector } from 'react-redux';
import MarkBtn from './MarkBtn';

const NotificationMenu = ({ visible, setVisible }) => {
    const [toggle, setToggle] = useState(false);
    const products = useSelector(({ productsState }) => productsState.products);

    const renderNotifications = () => {
        if (products) {
            const productsArr = Object.values(products);
            return productsArr.map(product => 
                <div key={product.id} className={styles.notification}>
                    <span className={styles.dot}></span>
                    <img src="/assets/imgs/products/product.png" alt="" />
                    <div className={styles.info}>
                        <h5>{product.title}</h5>
                        <div className={styles.prices}>
                            <div className={styles.new_price}>
                                <span>{product.new_price}</span>
                                <span>EGP</span>
                                <div className={styles.old_price}>
                                    <span>{product.old_price}</span>
                                    {/* <span>EGP</span> */}
                                </div>
                            </div>
                            { product.old_price > product.new_price ?
                            <div className={styles.price_change}>
                                <span>-</span>
                                {Math.floor(100 - (product.new_price / product.old_price) * 100)}
                                <span>%</span>
                                <i className={"fa-solid fa-arrow-trend-down"}></i></div>
                            :
                            <div className={styles.price_change_negative}><span>+</span>{Math.floor(100 - (product.old_price / product.new_price) * 100)}<span>%</span> <i className="fa-solid fa-arrow-trend-up"></i></div>
                            }
                        </div>
                    </div>
                    <MarkBtn />
                </div>
            );
        }
    }

    return (
        <>
            <div className={ visible ? styles.overlay : styles.overlay_hidden} onClick={() => setVisible(false)}></div>
            <div className={ visible ? styles.main_container : styles.main_container_hidden}>
                <div className={styles.header}>
                    <h3>Notifications</h3>
                    <div className={styles.filters}>
                        <button className={ !toggle ? styles.btn_active : "" } onClick={() => setToggle(prev => !prev)}>Unread</button>
                        <button className={ toggle ? styles.btn_active : "" } onClick={() => setToggle(prev => !prev)}>Read</button>
                    </div>
                </div>
                <div className={styles.notifications}>
                    { renderNotifications() }
                </div>
            </div>
        </>
    );
}

export default NotificationMenu;