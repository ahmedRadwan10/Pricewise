import React, { useEffect, useRef, useState } from 'react';
import styles from './Banner.module.css';
import { useSelector } from 'react-redux';

const Banner = ({ banners }) => {
    const [bannerIsAutoplay, setAutoplay] = useState(true);
    const [currentBannerIndex, setIndex] = useState(0);
    const [bannerImgsCount, setCount] = useState(0);
    const bannerElement = useRef();
    const paginationElement = useRef();

    const getNumberOfBanners = () => {
        if (banners) setCount(banners.length);
    }

    const renderBanners = () => {
        if (banners) return banners.map(banner => <img className={styles.banner_img} key={banner.imgURL} src={banner.imgURL} alt="Banner" />)
    }

    const renderPagination = () => {
        if (banners) return banners.map(banner => <span className={styles.pagination_span} key={banner.imgURL}></span>);
    }

    const updatePagination = (index = 0) => {
        let spansArr = [...paginationElement.current.children];
        if (banners) {
            spansArr.forEach((span) => {
                span.style.backgroundColor = "var(--color02)";
            });
            paginationElement.current.children[index === bannerImgsCount ? 0 : index ].style.backgroundColor = "var(--color01)";
        }
    }

    const scrollImgsToLeft = () => {
        if (bannerIsAutoplay) setAutoplay(false);
        let bannerWidth = bannerElement.current.offsetWidth;
        
        if (currentBannerIndex === 0) {
            bannerElement.current.scrollLeft = bannerWidth * (bannerImgsCount);
            setIndex(bannerImgsCount - 1);
        }
        else {
            bannerElement.current.scrollLeft -= bannerWidth;
            setIndex(prev => prev - 1);
        }
        updatePagination(currentBannerIndex === 0 ? bannerImgsCount - 1 : currentBannerIndex - 1);
    }

    const scrollImgsToRight = () => {
        if (bannerIsAutoplay) setAutoplay(false);
        let bannerWidth = bannerElement.current.offsetWidth;
        
        if (currentBannerIndex === bannerImgsCount - 1) {
            bannerElement.current.scrollLeft = 0;
            setIndex(0);
        }
        else {
            bannerElement.current.scrollLeft += bannerWidth;
            setIndex(prev => prev + 1);
        }
        updatePagination(currentBannerIndex + 1);
    }

    const autoscrollImgs = () => {
        let bannerWidth = bannerElement.current.offsetWidth;
        
        if (currentBannerIndex === bannerImgsCount - 1) {
            bannerElement.current.scrollLeft = 0;
            setIndex(0);
        }
        else {
            bannerElement.current.scrollLeft += bannerWidth;
            setIndex(prev => prev + 1);
        }
        updatePagination(currentBannerIndex + 1);
    }

    let sliderInterval;
    const playSlider = () => {
        sliderInterval = setInterval(() => {
            autoscrollImgs();
        }, 3000);
    }

    useEffect(() => {
        if (bannerIsAutoplay && bannerImgsCount > 1) playSlider();
        return () => clearInterval(sliderInterval);
    }, [bannerIsAutoplay, bannerImgsCount, currentBannerIndex]);

    useEffect(() => {
        getNumberOfBanners();
    }, [banners]);

    return (
        <div className={styles.main_container}>
            <div ref={bannerElement} className={styles.banners}>
                { renderBanners() }
            </div>
            <div className={styles.btns}>
                <button className={styles.right_btn} onClick={scrollImgsToRight}><i className="fa-solid fa-chevron-right"></i></button>
                <button className={styles.left_btn} onClick={scrollImgsToLeft}><i className="fa-solid fa-chevron-left"></i></button>
            </div>
            <div ref={paginationElement} className={styles.pagination}>
                    { renderPagination() }
                </div>
        </div>
    );
}

export default Banner;


