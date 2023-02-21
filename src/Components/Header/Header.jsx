import React, { useState } from 'react';
import styles from './Header.module.css';
import Categories from './SubComponents/Categories/Categories';

const Header = () => {
    const [categoriesVisible, setCategoriesVisible] = useState(false);

    const handleCategoriesClick = () => {
        setCategoriesVisible(prev => !prev);
    }

    return (
        <header className={styles.main_container}>
            <div className={styles.logo}>
                <p>Pricewise</p>
            </div>
            <div className={styles.categories} onClick={handleCategoriesClick}>
                <i className="fa-solid fa-bars"></i>
                Categories
            </div>
            <div className="search">
                <input type="text" placeholder='What are you looking for?' autoComplete='off' />
            </div>
            <div>
                <nav>
                    <span className={styles.ar}>العربية</span>
                    <span className='column_divider'></span>
                    <span className={styles.profile}><i className="fa-regular fa-user"></i> Ahmed</span>
                    <span className='column_divider'></span>
                    <span className={styles.bell}><i className="fa-regular fa-bell"></i></span>
                </nav>
            </div>
            <Categories visible={categoriesVisible} setCategoriesVisible={setCategoriesVisible} />
        </header>
    );
}

export default Header;