import React, { useState } from 'react';
import styles from '../Results.module.css';

const Filter = () => {
    const [savingRange, setRange] = useState(0);

    const handleRangeInputChange = (e) => {
        setRange(Number(e.target.value));
    }

    return (
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
            <div className={styles.price_filter}>
                <button><i className="fa-solid fa-square-plus"></i> Price</button>
                <form>
                    <div>
                        <input type="text" placeholder='From' autoComplete='off' />
                        <input type="text" placeholder='To' autoComplete='off' />
                    </div>
                    <input type="submit" value="Apply" />
                </form>
            </div>
            <div className={styles.saving_filter}>
                <button><i className="fa-solid fa-square-plus"></i> Saving</button>
                <form>
                    <label><span>Up to</span> {savingRange}<span>%</span></label>
                    <input type="range" name="range" min={0} max={100} onChange={handleRangeInputChange}  />
                </form>
            </div>
            <div className={styles.seller_filter}>
                <button><i className="fa-solid fa-square-plus"></i> Seller</button>
                <form>
                    <div>
                        <label htmlFor="amazon">Amazon</label>
                        <input type="checkbox" name="amazon" id="amazon" />
                    </div>
                    <div>
                        <label htmlFor="noon">Noon</label>
                        <input type="checkbox" name="noon" id="noon" />
                    </div>
                </form>
            </div>
            </div>
    );
}

export default Filter;