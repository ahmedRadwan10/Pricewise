import styles from "../Wishlist_Profile.module.css";

const SideBar = ({ setPage, page }) => {
  return (
    <>
      <div className={styles.sidebar}>
        <ul>
          <li onClick={() => setPage("profile")} className={ page === "profile" ? styles.active_page : "" }>Profile</li>
          <li onClick={() => setPage("wishlist")} className={ page === "wishlist" ? styles.active_page : "" }>Wishlist</li>
        </ul>
      </div>
    </>
  );
};
export default SideBar;
