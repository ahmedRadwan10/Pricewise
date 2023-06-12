import React, { useRef, useState } from "react";
import styles from "../../Header.module.css";
import Overlay from "../../../Collection/Overlay/Overlay";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const stylesObj = {
  zIndex: 99,
};

const Search = ({ categoriesElement, navElement }) => {
  const { t } = useTranslation();
  const [searchOverviewVisible, setSearchOverviewVisible] = useState(false);
  const navigate = useNavigate();
  const searchBox = useRef();

  const handleInputFocus = () => {
    // setSearchOverviewVisible(true);
    // navElement.current.style.display = "none";
    // categoriesElement.current.style.display = "none";
  };

  const handleInputBlur = () => {
    // setSearchOverviewVisible(false);
    // navElement.current.style.display = "flex";
    // categoriesElement.current.style.display = "flex";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${e.target.searchQuery.value}`);
    setSearchOverviewVisible(false);
    searchBox.current.blur();
  };

  return (
    <>
      {/* <Overlay
        visible={searchOverviewVisible}
        setSearchOverviewVisible={setSearchOverviewVisible}
        moreStyles={stylesObj}
      /> */}
      <div className={styles.search}>
        <form onSubmit={handleFormSubmit}>
          <input
            ref={searchBox}
            type="text"
            name="searchQuery"
            placeholder={t("search")}
            autoComplete="off"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </form>
        <div
          style={
            searchOverviewVisible ? { display: "block" } : { display: "none" }
          }
          className={styles.search_overview}
        ></div>
      </div>
    </>
  );
};

export default Search;
