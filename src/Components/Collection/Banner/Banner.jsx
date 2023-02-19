import React from 'react';
import styles from './Banner.module.css';
import { useSelector } from 'react-redux';

const Banner = ({ banners }) => {

    const renderBanners = () => {
        if (banners) return banners.map(banner => <img className={styles.banner_img} key={banner.imgURL} src={banner.imgURL} alt="Banner" />)
    }

    return (
        <div className={styles.main_container}>
            <div className={styles.banners}>
                { renderBanners() }
            </div>
            <div className={styles.btns}>
                <button className={styles.right_btn}><i className="fa-solid fa-chevron-right"></i></button>
                <button className={styles.left_btn}><i className="fa-solid fa-chevron-left"></i></button>
            </div>
        </div>
    );
}

export default Banner;


