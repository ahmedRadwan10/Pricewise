import React, { useEffect, useState } from 'react';
import styles from './Footer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../APIs/categories';

const Footer = () => {
    const lang = useSelector(({ langState }) => langState.lang);
    const categories = useSelector(({ categoriesState }) => categoriesState.categories);
    const [currentYear, setCurrentYear] = useState("");
    const dispatch = useDispatch(); 

    const renderSubCategories = (category) => {
        return category.subcategory.map(sub =>
          <div key={sub.slug}>
            {sub.name}
          </div>
        )
    }

    const renderCategories = () => {
        if (categories.results) return categories.results.map(cat =>
          <div key={cat.name}>
            <h4 className={styles.cat_title}>{cat.name}</h4>
            <div className={styles.cat_subCats}>
              { renderSubCategories(cat) }
            </div>
          </div>
        );
    }
    
    const getCurrentYear = () => {
        const date = new Date();
        setCurrentYear(date.getFullYear());
    }

    useEffect(() => {
        if (!categories) getCategories(dispatch);
        getCurrentYear();
      }, [dispatch, categories]);

    return (
        <div className={styles.main_container}>
            <div className={styles.categories}>
                {renderCategories()}
                <div className={styles.contact}>
                    <h4>Contact</h4>
                    <div>
                        <h5>Email</h5>
                        <p>contact@pricewise.com</p>
                    </div>
                    <div>
                        <h5>Telephone</h5>
                        <p>658-630-652</p>
                    </div>
                </div>
            </div>
            <div className={styles.copyright_container}>
                <div className={styles.logo}>
                    <img src={`/assets/imgs/logo_${lang}.svg`} alt="" />
                </div>
                <div className={styles.copyright}>
                    <p>All rights reserved <i className="fa-regular fa-copyright"></i> Pricewise {currentYear }</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;