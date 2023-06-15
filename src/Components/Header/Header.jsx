import React, { useRef, useState } from "react";
import styles from "./Header.module.css";
import Categories from "./SubComponents/Categories/Categories";
import Login from "../Auth/Auth";
import { useNavigate } from "react-router";
import NotificationMenu from "./SubComponents/NotificationMenu/NotificationMenu";
import Wishlist_Profile from "./SubComponents/Wiishlist_Profile/Wishlist_Profile";
import { useDispatch, useSelector } from "react-redux";
import Search from "./SubComponents/Search/Search";
import { useTranslation } from "react-i18next";
import { changeReduxLanguage } from "../../redux/slices/langSlice";

const Header = () => {
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [authVisible, setAuthVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [wishlistProfileVisible, setWishlistProfiileVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const succesSignin = useSelector(({ authState }) => authState.signInSuccess);
  const lang = useSelector(({ langState }) => langState.lang);
  const categoriesElement = useRef();
  const navElement = useRef();

  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    dispatch(changeReduxLanguage(`${lang === "en" ? "ar" : "en"}`))
  };

  const handleLanguageChange = (lng) => {
    changeLanguage(lng);
    setSelectedLanguage(lng);
    if (lng === "ar") {
      document.documentElement.dir = "rtl"; // Set direction to right-to-left for Arabic
    } else {
      document.documentElement.dir = "ltr"; // Set direction to left-to-right for other languages
    }
  };

  const getLanguageText = () => {
    if (selectedLanguage === "ar") {
      return "English";
    } else {
      return "العربية";
    }
  };

  const handleCategoriesClick = () => {
    setCategoriesVisible((prev) => !prev);
  };

  return (
    <header className={styles.main_container} lang={lang}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        <img src="/assets/imgs/logo.svg" alt="" />
      </div>
      <div
        lang={lang}
        ref={categoriesElement}
        className={styles.categories}
        onClick={handleCategoriesClick}
      >
        <i className="fa-solid fa-bars"></i>
        <span>{t("categories")}</span>
      </div>
      <Search categoriesElement={categoriesElement} navElement={navElement} />
      <div className={styles.list}>
        <nav ref={navElement}>
          <span
            className={styles.ar}
            onClick={() =>
              handleLanguageChange(selectedLanguage === "ar" ? "en" : "ar")
            }
          >
            {getLanguageText()}
          </span>
          <span className="column_divider"></span>
          <span
            className={styles.profile}
            onClick={() => {
              {
                succesSignin
                  ? setWishlistProfiileVisible(true)
                  : setAuthVisible(true);
              }
            }}
          >
            <i className="fa-regular fa-user"></i>
            {succesSignin ? t("profile") : t("sign-in")}
          </span>
          <span className="column_divider"></span>
          <span
            className={styles.bell}
            onClick={() => setNotificationsVisible(true)}
          >
            <i className="fa-regular fa-bell"></i>
            {t("notifications")}
          </span>
        </nav>
      </div>
      <Categories
        visible={categoriesVisible}
        setCategoriesVisible={setCategoriesVisible}
      />
      <Login visible={authVisible} setVisible={setAuthVisible} />
      <NotificationMenu
        visible={notificationsVisible}
        setVisible={setNotificationsVisible}
      />
      <Wishlist_Profile
        visible={wishlistProfileVisible}
        setWishlistProfiileVisible={setWishlistProfiileVisible}
      />
    </header>
  );
};

export default Header;
