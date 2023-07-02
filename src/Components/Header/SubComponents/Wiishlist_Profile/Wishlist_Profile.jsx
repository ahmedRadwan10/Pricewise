import Overlay from "../../../Collection/Overlay/Overlay";
import ReactDOM from "react-dom";
import styles from "./Wishlist_Profile.module.css";
import SideBar from "./subcomponents/SideBar";
import { useState } from "react";
import Profile from "./subcomponents/Profile";
import Wishlist from "./subcomponents/Wishlist";

const Wishlist_Profile = ({ visible, setWishlistProfiileVisible }) => {
  const [page, setPage] = useState("profile");
  const renderProfileHeader = () => {
    return (
      <div className={styles.header}>
        <div>
          <h3>User's Profile</h3>
          <p>Explore Your Profile and take a look about your wishlist.</p>
        </div>
        <span onClick={() => setWishlistProfiileVisible(false)}>
          <i className="fa-solid fa-xmark"></i>
        </span>
      </div>
    );
  };
  const renderWishHeader = () => {
    return (
      <div className={styles.header}>
        <div>
          <h3>User's Wishlist</h3>
          <p>Find your saved products and get ready to buy them</p>
        </div>
        <span onClick={() => setWishlistProfiileVisible(false)}>
          <i className="fa-solid fa-xmark"></i>
        </span>
      </div>
    );
  };
  return ReactDOM.createPortal(
    <>
      <Overlay visible={visible} setVisible={setWishlistProfiileVisible} />
      <div
        className={
          visible ? styles.modal_container : styles.modal_container_hidden
        }
      >
        <SideBar setPage={setPage} page={page} />
        <div className={styles.main_section}>
          {page === "profile" ? renderProfileHeader() : renderWishHeader()}
          {page === "profile" ? <Profile /> : <Wishlist />}
        </div>
      </div>
    </>,
    document.getElementById("wish")
  );
};
export default Wishlist_Profile;
