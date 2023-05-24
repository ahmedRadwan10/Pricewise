import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../../APIs/postUser";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SignUp = ({ setAuthMethod, setVisible }) => {
  const [formInput, setFormInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { t } = useTranslation();
  const [signUp, setSignUp] = useState(t("sign-up-submit"));
  const dispatch = useDispatch();
  const refSignUp = useRef();
  const navigate = useNavigate();

  const loading = useSelector(({ authState }) => authState.loading);
  const msg = useSelector(({ authState }) => authState.msg);
  const success = useSelector(({ authState }) => authState.signUpSuccess);

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };
  const validateFormInput = (e) => {
    const initErr = {
      first_name: "",
      last_name: "",
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

  const renderErr = (type) => {
    if (msg.password && type == "password") {
      return msg.password.map((err) => (
        <p key={err} className={styles.error_message}>
          {err}
        </p>
      ));
    }
    if (msg.email && type == "email") {
      return msg.email.map((err) => (
        <p key={err} className={styles.error_message}>
          {err}
        </p>
      ));
    }
    return <p></p>;
  };

  const changeSubmitBtn = () => {
    refSignUp.current.disabled = loading;
    loading
      ? setSignUp(<i className="fa-solid fa-circle-notch fa-spin"></i>)
      : setSignUp(t("sign-up-submit"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFormInput();
  };

  useEffect(() => {
    changeSubmitBtn();
    if (success) {
      setAuthMethod("activate");
    }
  }, [loading, success]);

  return (
    <div>
      <div className={styles.modal__header}>
        <h1>{t("sign-up-h1")}</h1>
        <h3>
          {t("sign-up-h3")}{" "}
          <span onClick={() => setAuthMethod("sign-in")}>
            {t("sign-up-span")}
          </span>
        </h3>
      </div>
      <form className={styles.modal__form} onSubmit={handleSubmit}>
        <div className={styles.name_field}>
          <div>
            <label>{t("sign-up-first-name")}</label>
            <input
              type="text"
              name="first_name"
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              required
            />
          </div>
          <div>
            <label>{t("sign-up-last-name")}</label>
            <input
              type="text"
              name="last_name"
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              required
            />
          </div>
        </div>
        <div className={styles.form_field}>
          <label>{t("sign-up-email")}</label>
          <input
            type="email"
            name="email"
            placeholder="example@mail.com"
            onChange={({ target }) => {
              handleUserInput(target.name, target.value);
            }}
            required
          />
          {renderErr("email")}
        </div>
        <div className={styles.form_field}>
          <label>{t("sign-up-password")}</label>
          <input
            type="password"
            name="password"
            onChange={({ target }) => {
              handleUserInput(target.name, target.value);
            }}
            required
          />
          {renderErr("password")}
        </div>
        <div className={styles.form_field}>
          <label>{t("sign-up-confirm")}</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={({ target }) => {
              handleUserInput(target.name, target.value);
            }}
            required
          />
          <p className={styles.error_message}>{formError.confirmPassword}</p>
          {renderErr("password")}
        </div>
        <button ref={refSignUp} className={styles.sign_up}>
          {signUp}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
