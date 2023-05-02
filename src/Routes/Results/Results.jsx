import React, { useEffect, useState } from 'react';
import styles from './Results.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ResultsProductCard from './SubComponents/ResultsPoductCard';
import { getProducts } from '../../APIs/products';

const Results = () => {
    const products = useSelector(({ productsState }) => productsState.products);
    const [menuIsShown, setMenuIsShown] = useState(false);
    const [currentSort, setCurrentSort] = useState("Price - High to Low");
    const params = useParams();
    const dispatch = useDispatch();

    const handleCurrentSortClick = () => {
        setMenuIsShown(prev => !prev);
    }

    const handleMenuItemClicked = (e) => {
        setCurrentSort(e.target.textContent);
        setMenuIsShown(prev => !prev);
    }

    const renderResultProducts = () => {
        if (products) {
            const productObjects = Object.values(products);
            return productObjects.map(product => <ResultsProductCard  key={product.id} product={product} products={productObjects} />);
        }
    }

    useEffect(() => {
        getProducts(dispatch);
      }, [dispatch]);

    return (
        <div className={styles.main_container}>
            <div className={styles.sidebar_filters}>
                <h3>Filter</h3>
                <div className={styles.category_filter}>
                    <button><i className="fa-solid fa-square-plus"></i> Electronics</button>
                    <div className={styles.sub_categories}>
                        <div>Mobile Phones</div>
                        <div>Smart Watches</div>
                        <div>Tablets</div>
                        <div>Headsets</div>
                    </div>
                </div>
                <div className={styles.category_filter}>
                    <button><i className="fa-solid fa-square-plus"></i> Computer Components</button>
                    <div className={styles.sub_categories}>
                        <div>Laptops</div>
                        <div>Monitors</div>
                        <div>Data Storage</div>
                        <div>TVs</div>
                    </div>
                </div>
            </div>
            <div className={styles.results}>
                <div className={styles.header}>
                    <p><span>345 results for</span> {`${params.searchQuery}`}</p>
                    <div className={styles.btns}>
                        <div className={styles.dropdown}>
                            <div className={styles.current_sort} onClick={handleCurrentSortClick}>
                                <span>{ currentSort }</span>
                                <span><i className={`fa-solid fa-angle-${menuIsShown ? "up" : "down"}`}></i></span>
                            </div>
                            <div className={`${styles.menu} ${menuIsShown ? "visible" : "hidden"}`}>
                                <div onClick={handleMenuItemClicked}>Saving - High to Low</div>
                                <div onClick={handleMenuItemClicked}>Saving - Low to High</div>
                                <div onClick={handleMenuItemClicked}>Price - High to Low</div>
                                <div onClick={handleMenuItemClicked}>Price - High to Low</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.result_products}>
                    { renderResultProducts() }
                </div>
            </div>
        </div>
    );
}

export default Results;