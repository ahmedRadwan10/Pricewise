import React, { useState } from 'react';
import styles from './Header.module.css';
import Categories from './SubComponents/Categories/Categories';
import Login from '../Auth/Auth';
import { useNavigate } from 'react-router';

const Header = () => {
    const [categoriesVisible, setCategoriesVisible] = useState(false);
    const [authVisible, setAuthVisible] = useState(false);
    const navigate = useNavigate();

    const handleCategoriesClick = () => {
        setCategoriesVisible(prev => !prev);
    }

    return (
        <header className={styles.main_container}>
            <div className={styles.logo} onClick={() => navigate("/")}>
                <img src="/assets/imgs/logo_img.svg" alt="Logo" />
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
                    <span className={styles.profile} onClick={() => setAuthVisible(true)}><i className="fa-regular fa-user"></i> Sign in</span>
                    <span className='column_divider'></span>
                    <span className={styles.bell}><i className="fa-regular fa-bell"></i></span>
                </nav>
            </div>
            <Categories visible={categoriesVisible} setCategoriesVisible={setCategoriesVisible} />
            <Login visible={authVisible} setVisible={setAuthVisible}/>
        </header>
    );
}

export default Header;
