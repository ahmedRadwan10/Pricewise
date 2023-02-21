import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import styles from './Categories.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../APIs/categories';

const Categories = ({ visible, setCategoriesVisible }) => {
  const categories = useSelector(({ categoriesState }) => categoriesState.categories);
  const dispatch = useDispatch(); 

  const renderSubCategories = (category) => {
    return category.subcats.map(sub =>
      <div key={sub}>
        {sub}
      </div>
    )
  }

  const renderCategories = () => {
    if (categories) return categories.map(cat =>
      <div key={cat.title}>
        <h4 className={styles.cat_title}>{cat.title}</h4>
        <div className={styles.cat_subCats}>
          { renderSubCategories(cat) }
        </div>
      </div>
    );
  }

  useEffect(() => {
    getCategories(dispatch);
  }, [dispatch]);

  return ReactDOM.createPortal(
    <>
      <div
        style={visible ? { display: "block" } : { display: "none" }}
        className={styles.main_container}
        onClick={() => setCategoriesVisible(false)}>
      </div>
      <div
        style={visible ? { top: "50%" } : { top: "-100%" }}
        className={styles.modal_container}
      >
        <div className={styles.header}>
          <div>
            <h3>Our Categories</h3>
            <p>Explore the top online shopping categories.</p>
          </div>
          <span onClick={() => setCategoriesVisible(false)}><i className="fa-solid fa-xmark"></i></span>
        </div>
        <div className={styles.container}>
          <div className={styles.categories}>
            { renderCategories() }
          </div>
          <div className={styles.cat_img}>
            <img src="/assets/imgs/logo_brand.svg" alt="Category" />
          </div>
       </div>
      </div>
    </>,
    document.getElementById("cats")
  );
}

export default Categories;