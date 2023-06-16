import React, { useEffect, useState } from 'react';
import styles from '../Results.module.css';
import { useDispatch } from 'react-redux';
import { addFilter } from '../../../redux/slices/filterSlice';

const Filter = ({ data }) => {
    const [savingRange, setRange] = useState(0);
    const dispatch = useDispatch();

    const handleRangeInputChange = (e) => {
        setRange(Number(e.target.value));
    }

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
        let checkbox = e.target;
        let filter_slug = e.target.getAttribute("data-slug");
        let filter_value = e.target.id;
        if (checkbox.checked) {
            dispatch(addFilter({ filter_slug: filter_slug, filter_value: filter_value }));
        } else {

        }
    }
    
    const renderFilterData = (filter, filter_slug) => {
        return filter.map((entry, i) =>
                <div key={i} className={styles.flex_box}>
                    <div>
                        <input onChange={handleCheckboxChange} type="checkbox" name={entry[0]} id={entry[0]} data-slug={filter_slug} />
                        <label htmlFor={entry[0]}>{entry[0]}</label>
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

    if (data.prices) return (
        <div className={styles.sidebar_filters}>
            <div className={styles.price_filter}>
                <button><i className="fa-solid fa-circle"></i> Price</button>
                <form>
                    <div>
                        <input type="text" placeholder={`From : ${data.prices.min_price}`} autoComplete='off' />
                        <input type="text" placeholder={`To : ${data.prices.max_price}`} autoComplete='off' />
                    </div>
                    <input type="submit" value="Apply" />
                </form>
            </div>
            <div className={styles.saving_filter}>
                <button><i className="fa-solid fa-circle"></i> Saving</button>
                <form>
                    <label><span>Up to</span> {savingRange}<span>%</span></label>
                    <input type="range" name="range" min={0} max={100} onChange={handleRangeInputChange}  />
                </form>
            </div>
            { data.filter ? renderFilters() : "" }
        </div>
    );
}

export default Filter;