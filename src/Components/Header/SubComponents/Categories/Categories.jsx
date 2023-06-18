import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Categories.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../../APIs/categories";
import Overlay from "../../../Collection/Overlay/Overlay";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Categories = ({ visible, setCategoriesVisible }) => {
  const lang = useSelector(({ langState }) => langState.lang);
  const { t } = useTranslation();

  const categories = useSelector(({ categoriesState }) => categoriesState.categories);
  const dispatch = useDispatch();

  const renderSubCategories = (category) => {
    if  (category.subcategory) return category.subcategory.map((sub) => <div key={sub.slug}>{sub.name}</div>);
  };

  const renderCategories = () => {
      return categories.results.map((cat) => (
        <div key={cat.name}>
          <h4 className={styles.cat_title}> 
            <Link
              to={`/${cat.slug}`}
              onClick={() => setCategoriesVisible(false)}
            >
              {cat.name}
            </Link>
          </h4>
          <div className={styles.cat_subCats}>{renderSubCategories(cat)}</div>
        </div>
      ));
  };

  useEffect(() => {
    getCategories(dispatch);
  }, [dispatch]);

  if (categories.results) return ReactDOM.createPortal(
    <>
      <Overlay visible={visible} setVisible={setCategoriesVisible} />
      <div
        className={
          visible ? styles.modal_container : styles.modal_container_hidden
        }
      >
        <div className={styles.header}>
          <div>
            <h3 lang={lang}>{t("our-categories")}</h3>
            <p lang={lang}>{t("our-categories-p")}</p>
          </div>
          <span onClick={() => setCategoriesVisible(false)}>
            <i className="fa-solid fa-xmark"></i>
          </span>
        </div>
        <div className={styles.container}>
          <div className={styles.categories}>{renderCategories()}</div>
          <div className={styles.cat_img}>
            <img src="/assets/imgs/logo_brand.svg" alt="Category" />
          </div>
        </div>
      </div>
    </>,
    document.getElementById("cats")
  );
};

export default Categories;
