import React from "react";
import styles from "./Header.module.css";

const Header = (props) => {
  const { handleShowLogin } = props;
  return (
    <header className={styles.main_container}>
      <div className={styles.logo}>
        <p>Pricewise</p>
      </div>
      <div className={styles.categories}>
        <i className="fa-solid fa-bars"></i>
        Categories
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="What are you looking for?"
          autoComplete="off"
        />
      </div>
      <div>
        <nav>
          <span className={styles.ar}>العربية</span>
          <span className="column_divider"></span>
          <span className={styles.profile} onClick={handleShowLogin}>
            <i className="fa-regular fa-user"></i> Ahmed
          </span>
          <span className="column_divider"></span>
          <span className={styles.bell}>
            <i className="fa-regular fa-bell"></i>
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
