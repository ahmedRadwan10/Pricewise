import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../../APIs/postUser";
import styles from "./SignUp.module.css";

const SignUp = ({ setAuthMethod, setVisible }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUp, setSignUp] = useState("Sign up");
  const dispatch = useDispatch();
  const refSignUp = useRef();

  const loading = useSelector(({ authState }) => authState.loading);

  const test = (e) => {
    console.log(firstName, lastName, email, password, confirmPassword);
  };
  const changeSubmitBtn = () => {
    refSignUp.current.disabled = loading;
    loading ? setSignUp("plaese wait ...") : setSignUp("Sign up");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signUpUser(dispatch, {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
  };
  useEffect(() => {
    changeSubmitBtn();
  }, [loading]);

  return (
    <div>
      <div className={styles.modal__header}>
        <h1>Create an account</h1>
        <h3>
          Already have an account?{" "}
          <span onClick={() => setAuthMethod("sign-in")}>Sign in</span>
        </h3>
      </div>
      <form className={styles.modal__form} onSubmit={handleSubmit}>
        <div className={styles.name_field}>
          <div>
            <label>First Name</label>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={styles.form_field}>
          <label>Email</label>
          <input
            type="email"
            placeholder="example@mail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.form_field}>
          <label>Password</label>
          <input
            type="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.form_field}>
          <label>Confirm Password</label>
          <input
            type="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button ref={refSignUp} className={styles.sign_up}>
          {signUp}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
