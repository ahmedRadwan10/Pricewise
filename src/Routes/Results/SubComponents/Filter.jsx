import React, { useState } from 'react';
import styles from '../Results.module.css';

const Filter = ({ data }) => {
    const [savingRange, setRange] = useState(0);

    const handleRangeInputChange = (e) => {
        setRange(Number(e.target.value));
    }

    const rewriteFilterName = (name) => {
        const nameWithoutSpecial = name.replace(/__/g, " ").replace(/_/g, " ");
        const words = nameWithoutSpecial.split(" ");
        words.shift(); 
        const updatedName = words.join(" ");
        return updatedName;
    }

    const renderFilters = () => {
        if (data.filter) {
          const filterArr = Object.entries(data.filter);
          return filterArr.map(filter => (
            filter[1][0] !== null ? (
              <div key={filter[1][0]} className={styles.gn_filter}>
                <button><i className="fa-solid fa-circle"></i> {rewriteFilterName(filter[0])}</button>
                <form>
                  {renderFilterData(filter[1])}
                </form>
              </div>
            ) : ""
          ));
        }
      };
    
    const renderFilterData = (filter) => {
        console.log(filter);
        if (filter[0][0]) return filter.map(entry =>
                <div className={styles.flex_box}>
                    <div>
                        <input type="checkbox" name={entry[0]} id={entry[0]} />
                        <label htmlFor={entry[0]}>{entry[0]}</label>
                    </div>
                    <p>{`(${entry[1]})`}</p>
                </div>
        );
    }

    if (data.prices) return (
        <div className={styles.sidebar_filters}>
            <h3>Filter</h3>
            <div className={styles.category_filter}>
                <button><i className="fa-solid fa-circle"></i> Electronics</button>
                <div className={styles.sub_categories}>
                    <div>Mobile Phones</div>
                    <div>Smart Watches</div>
                    <div>Tablets</div>
                    <div>Headsets</div>
                </div>
            </div>
            <div className={styles.category_filter}>
                <button><i className="fa-solid fa-circle"></i> Computer Components</button>
                <div className={styles.sub_categories}>
                    <div>Laptops</div>
                    <div>Monitors</div>
                    <div>Data Storage</div>
                    <div>TVs</div>
                </div>
            </div>
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
              
            <div className={styles.gn_filter}>
                <button><i className="fa-solid fa-circle"></i> Seller</button>
                <form>
                    <div className={styles.flex_box}>
                        <div>
                            <input type="checkbox" name="amazon" id="amazon" />
                            <label htmlFor="amazon">Amazon</label>
                        </div>
                        <p>(20)</p>
                    </div>
                    <div className={styles.flex_box}>
                        <div>
                            <input type="checkbox" name="noon" id="noon" />
                            <label htmlFor="noon">Noon</label>
                        </div>
                        <p>(31)</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Filter;