import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../../../../redux/slices/authSlice";
import styles from "../Wishlist_Profile.module.css";
const Profile = () => {
  const user = useSelector(({ authState }) => authState.user);

  return (
    <>
      <div className="">
        <h1>{user.username}</h1>
      </div>
    </>
  );
};
export default Profile;
