import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../../../../redux/slices/authSlice";
import styles from "../Wishlist_Profile.module.css";
const Profile = () => {
  const user = useSelector(({ authState }) => authState.user);

  return (
    <>
      <div className={styles.profile}>
        <header>
          <ul>
            <li>Overview</li>
          </ul>
        </header>
        <section>
          <div>
            <h3>Name</h3>
            <p>{user.firstName + " " + user.lastName}</p>
          </div>
          <div>
            <h3>Email</h3>
            <p>{user.email}</p>
          </div>
        </section>
      </div>
    </>
  );
};
export default Profile;
