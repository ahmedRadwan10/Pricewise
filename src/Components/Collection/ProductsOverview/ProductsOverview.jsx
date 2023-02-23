import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Image from '../Image';
import styles from "./ProductsOverview.module.css";

const ProductsOverview = ({ data }) => {
    const productsContainer = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                 <button className={styles.fav_btn}><img src="/assets/imgs/icons/heart.svg" alt="Fav-Icon" /></button>
                { product.reviews_number ? <div className={styles.rating_container}>
                    <i className="fa-solid fa-star fa-sm"></i>
                    <span>{product.rating}</span>
                </div> : <div className={styles.rating_container}> <i className="fa-solid fa-star fa-sm"></i> 0.0</div>}
            </>
        );
    }

    const renderProducts = () => {
        if (data.products) return data.products.map(product => {
            if (product["img-src"]) {
                return <div
                        key={product["web-scraper-order"]}
                        className={styles.product_container}
                        onClick={() => handleProductOnClick(product)}
                >
                        <div className={styles.product_img_container}>
                            <Image imgSrc={`/assets/imgs/products/product.png`} imgAlt={product.title} />
                        </div>
                        <p title={product.title}>{product.title}</p>
                        <div className={styles.price_container}>
                            <div className={styles.new_price_container}>
                                <span>{product.new_price.toFixed(2)}</span>
                                <span>EGP</span>
                            </div>
                            { product.old_price > product.new_price ? <div className={styles.price_change}>{Math.floor(100 - (product.new_price / product.old_price) * 100)}<span>%</span> <i className="fa-solid fa-arrow-trend-down"></i></div> : <div className={styles.price_change_negative}>{Math.floor(100 - (product.old_price / product.new_price) * 100)}<span>%</span> <i className="fa-solid fa-arrow-trend-up"></i></div>}
                        </div>
                        {product.old_price ? renderProductOldPrice(product) : ""}
                        <div className={styles.product_footer}>
                            { renderProductFooter(product) }
                        </div>
                </div>
           } 
        });
    }

    const handleProductOnClick = (product) => {
        navigate(`/${product.category.title}/${product.subCategory.id}/${product.id}`)
    }

    const scrollProductsToLeft = () => {
        productsContainer.current.scrollLeft -= 500;
    }

    const scrollProductsToRight = () => {
        productsContainer.current.scrollLeft += 500;
    }

    if (data) return (
        <div className={styles.main_container}>
            <button className={styles.scroll_btn} onClick={scrollProductsToLeft}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className={styles.scroll_btn} onClick={scrollProductsToRight}>
                <i className="fa-solid fa-chevron-right"></i>
            </button>
            <div className={styles.header}>
                <h2>{data.title}</h2>
                <button>SHOP NOW</button>
            </div>
            <div ref={productsContainer} className={styles.products_container}>
                { renderProducts() }
            </div>
        </div>
    );
}

export default ProductsOverview;