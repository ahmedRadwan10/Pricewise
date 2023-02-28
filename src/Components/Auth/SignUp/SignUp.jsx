import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../../APIs/postUser";
import styles from "./SignUp.module.css";

const SignUp = ({ setAuthMethod, setVisible }) => {
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signUp, setSignUp] = useState("Sign up");
  const dispatch = useDispatch();
  const refSignUp = useRef();

  const loading = useSelector(({ authState }) => authState.loading);

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };
  const validateFormInput = (e) => {
    const initErr = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    if (formInput.confirmPassword !== formInput.password) {
      setFormError({
        ...formError,
        confirmPassword: "Password and confirm password should be same",
      });
      return;
    }
    setFormError({ initErr });
    signUpUser(dispatch, formInput);
  };

  const changeSubmitBtn = () => {
    refSignUp.current.disabled = loading;
    loading
      ? setSignUp(<i className="fa-solid fa-circle-notch fa-spin"></i>)
      : setSignUp("Sign up");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFormInput();
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
            <label className="required">First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              required
            />
          </div>
          <div>
            <label className="required">Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              required
            />
          </div>
        </div>
        <div className={styles.form_field}>
          <label className="required">Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@mail.com"
            onChange={({ target }) => {
              handleUserInput(target.name, target.value);
            }}
            required
          />
        </div>
        <div className={styles.form_field}>
          <label className="required">Password</label>
          <input
            type="password"
            name="password"
            onChange={({ target }) => {
              handleUserInput(target.name, target.value);
            }}
            required
          />
        </div>
        <div className={styles.form_field}>
          <label className="required">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={({ target }) => {
              handleUserInput(target.name, target.value);
            }}
            required
          />
          <p className={styles.error_message}>{formError.confirmPassword}</p>
        </div>
        <button ref={refSignUp} className={styles.sign_up}>
          {signUp}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
