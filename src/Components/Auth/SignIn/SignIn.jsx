import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../../APIs/postUser";
import { addUser } from "../../../redux/slices/authSlice";
import styles from "./SignIn.module.css";

const SignIn = ({ setAuthMethod, setVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, setSignIn] = useState("Sign in");

  const dispatch = useDispatch();
  const refSignIn = useRef();
  const loading = useSelector(({ authState }) => authState.loading);
  const msgSignIn = useSelector(({ authState }) => authState.msgSignIn);
  const success = useSelector(({ authState }) => authState.signInSuccess);

  const changeSubmitBtn = () => {
    refSignIn.current.disabled = loading;
    loading
      ? setSignIn(<i className="fa-solid fa-circle-notch fa-spin"></i>)
      : setSignIn("Sign in");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInUser(dispatch, { email, password });
  };

  useEffect(() => {
    dispatch(addUser());
    changeSubmitBtn();
    setVisible(!success);
  }, [loading]);

  return (
    <div>
      <div className={styles.modal__header}>
        <p>Welcome back!</p>
        <h1>Sign in to your account</h1>
        <h3>
          Don't have an account?{" "}
          <span onClick={() => setAuthMethod("sign-up")}>Sign Up</span>
        </h3>
      </div>
      <form className={styles.modal__form} onSubmit={handleSubmit}>
        <div className={styles.form_field}>
          <label>Email</label>
          <input
            type="text"
            placeholder="example@mail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.form_field}>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className={styles.error_message}>{msgSignIn}</p>
        </div>
        <span className={styles.forget}>Forgot your password? </span>
        <button ref={refSignIn} className={styles.sign_in}>
          {signIn}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
