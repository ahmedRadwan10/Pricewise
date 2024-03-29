import React, { useEffect, useState } from 'react';
import styles from '../Results.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addFilter, changePrices, removeFilter } from '../../../redux/slices/filterSlice';

const Filter = ({ data, display, visible, setVisible }) => {
    const prices = useSelector(({ filterState }) => filterState.prices);
    const [isMd, setIsMd] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const dispatch = useDispatch();

    const rewriteFilterName = (name) => {
        let nameWithoutSpecial = name;
        let nameWords = name.split("_");
        if (nameWords.length > 1) {
            nameWithoutSpecial = name.replace(/__/g, " ").replace(/_/g, " ");
            nameWords = nameWithoutSpecial.split(" ");
            nameWords.shift(); 
        }
        const updatedName = nameWords.join(" ");
        return updatedName;
    }

    const renderFilters = () => {
        if (data.filter) {
          const filterArr = Object.entries(data.filter);
          return filterArr.map((filter, i) => (
              <div key={i} className={styles.gn_filter}>
                  <button onClick={() => handleFilterClicked(i)}><i className="fa-solid fa-circle"></i>
                      <div>
                        {rewriteFilterName(filter[0])} <i className="fa-solid fa-angle-down"></i>
                      </div>
                  </button>
                <form id={`dynamic-filter-${i}`}>
                  {renderFilterData(filter[1], filter[0])}
                </form>
              </div>
          ));
        }
    };
    
    const handleCheckboxChange = (e) => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        let checkbox = e.target;
        let filter_slug = e.target.getAttribute("data-slug");
        let filter_value = e.target.getAttribute("data-value");
        if (prices.length === 0) dispatch(changePrices([data.prices.min_price, data.prices.max_price]))
        if (checkbox.checked) {
            dispatch(addFilter({ filter_slug: filter_slug, filter_value: filter_value }));
        } else {
            dispatch(removeFilter({ filter_slug: filter_slug, filter_value: filter_value }));
        }
    }
    
    const renderFilterData = (filter, filter_slug) => {
        return filter.map((entry, i) =>
                <div key={i} className={styles.flex_box}>
                    <div>
                        <input onChange={handleCheckboxChange} type="checkbox" name={entry[0]} id={`${entry[0]}${filter_slug}`} data-value={entry[0]} data-slug={filter_slug} />
                        <label htmlFor={`${entry[0]}${filter_slug}`}>{entry[0]}</label>
                    </div>
                    <p>{`(${entry[1]})`}</p>
                </div>
        );
    }

    const handleFilterClicked = (filterIndex) => {
        const clickedForm = document.querySelector(`#dynamic-filter-${filterIndex}`);
        const displayStyle = window.getComputedStyle(clickedForm).getPropertyValue("display");
        if (displayStyle === "block") clickedForm.style.display = "none";
        else clickedForm.style.display = "block";
    } 

    const handleFilterPricesSumbit = (e) => {
        e.preventDefault();
        const min_price = minPrice;
        const max_price = maxPrice;
        if (max_price < min_price || max_price === 0 || max_price === data.prices.max_price) {
            e.target.max_price.value = data.prices.max_price;
        }
        
        if (min_price === data.prices.min_price) {
            e.target.min_price.value = data.prices.min_price;
        }
        const minPriceInputValue = Number(e.target.min_price.value);
        const maxPriceInputValue = Number(e.target.max_price.value);
        dispatch(changePrices([minPriceInputValue, maxPriceInputValue]))
        setVisible(false);
    }

    const handleMinPriceChange = (e) => {
        const currentValue = Number(e.target.value);
        if (currentValue > data.prices.min_price && currentValue !== 0) setMinPrice(currentValue);
        else {
            setMinPrice(data.prices.min_price);
        }
    }

    const handleMaxPriceChange = (e) => {
        const currentValue = Number(e.target.value);
        if (currentValue < data.prices.max_price && currentValue !== 0) setMaxPrice(currentValue);
        else {
            setMaxPrice(data.prices.max_price);
        }
    }

    useEffect(() => {
        if (window.innerWidth <= 1280) setIsMd(true); 
    }, []);

    if (data.prices) return (
        <>
            <div className={ visible ? styles.overlay : styles.overlay_hidden} onClick={() => setVisible(false)}></div>
            <div className={styles.sidebar_filters} style={ visible && isMd ? { display: "block" } : {} }>
                <button className={styles.close_btn} onClick={() => setVisible(false)}><i className="fa-solid fa-xmark"></i></button>
                <div className={styles.price_filter}>
                    <button><i className="fa-solid fa-circle"></i> Price</button>
                    <form onSubmit={handleFilterPricesSumbit}>
                        <div>
                            <input type="text" onChange={handleMinPriceChange} placeholder={`From : ${data.prices.min_price}`} autoComplete='off' name='min_price' />
                            <input type="text" onChange={handleMaxPriceChange} placeholder={`To : ${data.prices.max_price}`} autoComplete='off' name='max_price' />
                        </div>
                        <input type="submit" value="Apply" />
                    </form>
                </div>
                <div className={styles.filters}>
                    { data.filter ? renderFilters() : "" }
                </div>
            </div>
        </>
    );
}

export default Filter;