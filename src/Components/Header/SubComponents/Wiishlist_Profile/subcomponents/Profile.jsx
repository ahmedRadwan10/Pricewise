import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../../../../redux/slices/authSlice";
import styles from "../Wishlist_Profile.module.css";
import { useState, useEffect } from "react";
import { getUserData } from "../../../../../APIs/postUser";

const Profile = () => {
  const user = useSelector(({ authState }) => authState.userData);
  const success = useSelector(({ authState }) => authState.getUserDataSuccess);
  const [profileButton, setProfileButton] = useState("Update");
  const [formInput, setFormInput] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };
  useEffect(() => {
    setFormInput({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  }, [user]);

  return (
    <>
      <div className={styles.profile}>
        <form className={styles.modal__form}>
          <div className={styles.name_field}>
            <div>
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                id="fname"
                name="first_name"
                value={formInput.first_name}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                id="lname"
                name="last_name"
                value={formInput.last_name}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
              />
            </div>
          </div>
          <div className={styles.form_field}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formInput.email}
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
            />
          </div>
          <button className={styles.profile_button}>{profileButton}</button>
        </form>
      </div>
    </>
  );
};

export default Profile;
