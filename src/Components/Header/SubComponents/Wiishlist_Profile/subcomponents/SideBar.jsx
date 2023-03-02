import styles from "../Wishlist_Profile.module.css";

const SideBar = ({ setPage }) => {
  return (
    <>
      <div className={styles.sidebar}>
        <ul>
          <li onClick={() => setPage("profile")}>Profile</li>
          <li onClick={() => setPage("wishlist")}>Wishlist</li>
        </ul>
      </div>
    </>
  );
};
export default SideBar;
