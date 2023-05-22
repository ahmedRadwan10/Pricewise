import React, { useRef, useState } from "react";
import styles from "./Header.module.css";
import Categories from "./SubComponents/Categories/Categories";
import Login from "../Auth/Auth";
import { useNavigate } from "react-router";
import NotificationMenu from "./SubComponents/NotificationMenu/NotificationMenu";
import Wishlist_Profile from "./SubComponents/Wiishlist_Profile/Wishlist_Profile";
import { useSelector } from "react-redux";
import Search from "./SubComponents/Search/Search";

const Header = () => {
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [authVisible, setAuthVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [wishlistProfileVisible, setWishlistProfiileVisible] = useState(false);
  const navigate = useNavigate();
  const succesSignin = useSelector(({ authState }) => authState.signInSuccess);
  const categoriesElement = useRef();
  const navElement = useRef();

  const handleCategoriesClick = () => {
    setCategoriesVisible((prev) => !prev);
  };

  return (
    <header className={styles.main_container}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        <img src="/assets/imgs/logo.svg" alt="" />
      </div>
      <div ref={categoriesElement} className={styles.categories} onClick={handleCategoriesClick}>
        <i className="fa-solid fa-bars"></i>
        Categories
      </div>
      <Search categoriesElement={categoriesElement} navElement={navElement} />
      <div>
        <nav ref={navElement}>
          <span className={styles.ar}>العربية</span>
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
            {succesSignin ? "profile" : "Sign in"}
          </span>
          <span className="column_divider"></span>
          <span
            className={styles.bell}
            onClick={() => setNotificationsVisible(true)}
          >
            <i className="fa-regular fa-bell"></i>
            Notifications
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
