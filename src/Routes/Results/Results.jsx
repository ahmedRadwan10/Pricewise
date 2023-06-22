import React, { useEffect, useRef, useState } from 'react';
import styles from './Results.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ResultsProductCard from './SubComponents/ResultsPoductCard';
import { getFilteredSearchProducts, getProducts, getSearchProducts, sortSearchProducts } from '../../APIs/products';
import Filter from './SubComponents/Filter';

const Results = () => {
    const searchData = useSelector(({ productsState }) => productsState.search);
    const filters = useSelector(({ filterState }) => filterState.filters);
    const prices = useSelector(({ filterState }) => filterState.prices);
    const numOfFilters = useSelector(({ filterState }) => filterState.numOfFilters);
    const [menuIsShown, setMenuIsShown] = useState(false);
    const [numOfProducts, setNumOfProducts] = useState(0);
    const [currentSort, setCurrentSort] = useState("Arranged by");
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const [visible, setVisible] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();
    const paginationElement = useRef();

    const handleCurrentSortClick = () => {
        setMenuIsShown(prev => !prev);
    }

    const handleMenuItemClicked = (e) => {
        setCurrentSort(e.target.textContent);
        setMenuIsShown(prev => !prev);

        let products = [...searchData.results.products];
        let sortMethod = e.target.getAttribute("data-method");
        let isAsend = e.target.getAttribute("data-asend");
        sortSearchProducts(dispatch, products, sortMethod, isAsend)
    }

    const renderResultProducts = () => {
        if (searchData) {
            return searchData.results["products"].map(product => <ResultsProductCard  key={product.id} product={product} products={searchData.results["products"]} />);
        }
    }

    const createArrayFromNumber = (n) => {
        let array = [];
        for (let i = 1; i <= n; i++) {
          array.push(i);
        }
        return array;
    }

    const navigateToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (pageNumber * 50 < searchData.count) {
            setOffset(pageNumber * 50);
            setIsLastPage(false);
        }
        else {
            setOffset(((pageNumber - 1) * 50) + 1);
            setIsLastPage(true);
        }
    }

    const renderPagination = () => {
        const numOfPages = Math.ceil(searchData.count / 50);
        const result = createArrayFromNumber(numOfPages);
        return result.map((btn, i) => {
            return <button key={i} onClick={() => navigateToPage(i + 1)} className={ currentPage === i + 1 ? styles.active_pagination : ""}>{i + 1}</button>;
        });
    }

    const paginatePrev = () => {
        setIsLastPage(false);
        if (currentPage !== 1) {
            setCurrentPage(prev => prev - 1);
            setOffset(prev => prev - 50);
        }
    }
    
    const paginateNext = () => {
        const numOfPages = Math.ceil(searchData.count / 50);
        if (currentPage === numOfPages - 1) setIsLastPage(true);
        if (currentPage < numOfPages) {
            setCurrentPage(prev => prev + 1);
            setOffset(prev => prev + 50);
        }
    }

    const handleFilterBtnClicked = () => {
        setVisible(true);
    }

    useEffect(() => {
        getFilteredSearchProducts(dispatch, params.searchQuery, filters, prices)
    }, [filters, prices]);

    useEffect(() => {
        if (numOfFilters === 0) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            getSearchProducts(dispatch, params.searchQuery, offset);
        }
    }, [numOfFilters]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        getSearchProducts(dispatch, params.searchQuery, offset);
    }, [dispatch, params, offset]);

    return (
        <div className={styles.main_container}>
            <button className={styles.filter_btn} onClick={handleFilterBtnClicked}><i className="fa-solid fa-filter"></i> Filters</button>
            <Filter visible={visible} setVisible={setVisible} data={searchData.results} />
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
                                <div onClick={handleMenuItemClicked} data-method="saving" data-asend="false">Saving - High to Low</div>
                                <div onClick={handleMenuItemClicked} data-method="saving" data-asend="true">Saving - Low to High</div>
                                <div onClick={handleMenuItemClicked} data-method="price" data-asend="false">Price - High to Low</div>
                                <div onClick={handleMenuItemClicked} data-method="price" data-asend="true">Price - Low to High</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.result_products}>
                    { renderResultProducts() }
                </div>
                <div className={styles.pagination}>
                    <button onClick={paginatePrev} className={ currentPage === 1 ? styles.disable_pagination : "" }><i className="fa-solid fa-angle-left"></i></button>
                    { renderPagination() }
                    <button onClick={paginateNext} className={ isLastPage ? styles.disable_pagination : "" }><i className="fa-solid fa-angle-right"></i></button>
                </div>
            </div>
        </div>
    );
}

export default Results;