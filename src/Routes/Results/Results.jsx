import React, { useEffect, useState } from 'react';
import styles from './Results.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ResultsProductCard from './SubComponents/ResultsPoductCard';
import { getProducts, getSearchProducts } from '../../APIs/products';
import Filter from './SubComponents/Filter';

const Results = () => {
    const searchData = useSelector(({ productsState }) => productsState.search);
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
        if (searchData) {
            return searchData.results["products"].map(product => <ResultsProductCard  key={product.id} product={product} products={searchData.results["products"]} />);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getSearchProducts(dispatch, params.searchQuery);
      }, [dispatch, params]);

    return (
        <div className={styles.main_container}>
            <Filter data={searchData.results} />
            <div className={styles.results}>
                <div className={styles.header}>
                    <p><span>{searchData.count} results</span> {`${params.searchQuery}`}</p>
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