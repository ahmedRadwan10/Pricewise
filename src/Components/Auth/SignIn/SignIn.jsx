import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../../APIs/postUser";
import { addUser } from "../../../redux/slices/authSlice";
import styles from "./SignIn.module.css";
import { useTranslation } from "react-i18next";

const SignIn = ({ setAuthMethod, setVisible }) => {
  const lang = useSelector(({ langState }) => langState.lang);
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, setSignIn] = useState(t("sign-in-submit"));

  const dispatch = useDispatch();
  const refSignIn = useRef();
  const loading = useSelector(({ authState }) => authState.loading);
  const msgSignIn = useSelector(({ authState }) => authState.msgSignIn);
  const success = useSelector(({ authState }) => authState.signInSuccess);

  const changeSubmitBtn = () => {
    refSignIn.current.disabled = loading;
    loading
      ? setSignIn(<i className="fa-solid fa-circle-notch fa-spin"></i>)
      : setSignIn(t("sign-in-submit"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInUser(dispatch, { email, password });
  };

  const resetPassword = () => {
    setAuthMethod("reset-pass");
  };

  useEffect(() => {
    dispatch(addUser());
    changeSubmitBtn();
    setVisible(!success);
  }, [loading]);

  return (
    <div>
      <div className={styles.modal__header}>
        <p lang={lang}>{t("sign-in-p")}</p>
        <h1 lang={lang}>{t("sign-in-h1")}</h1>
        <h3 lang={lang}>
          {t("sign-in-h3")}{" "}
          <span lang={lang} onClick={() => setAuthMethod("sign-up")}>
            {t("sign-in-span")}
          </span>
        </h3>
      </div>
      <form className={styles.modal__form} onSubmit={handleSubmit}>
        <div className={styles.form_field}>
          <label lang={lang}>{t("sign-in-email")}</label>
          <input
            lang={lang}
            type="text"
            placeholder=""
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.form_field}>
          <label lang={lang}>{t("sign-in-password")}</label>
          <input
            lang={lang}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className={styles.error_message}>{msgSignIn}</p>
        </div>
        <span
          lang={lang}
          className={styles.forget}
          onClick={() => {
            resetPassword();
          }}
        >
          {t("sign-in-forget")}{" "}
        </span>
        <button lang={lang} ref={refSignIn} className={styles.sign_in}>
          {signIn}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
