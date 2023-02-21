import React, { useEffect } from "react";
import styles from "./Home.module.css";
import Banner from "../../Components/Collection/Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../../APIs/banners";

const Home = () => {
  const banners = useSelector(({ bannerState }) => bannerState.banners);
  const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Pricewise | Home"
        getBanners(dispatch);
    }, [dispatch])

  return (
    <div className={styles.main_container}>
      <Banner banners={banners} />
    </div>
  );
};

export default Home;
