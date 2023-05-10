import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./ResetPagePopUp.module.css";
import { passwordReset } from "../../../../../APIs/postUser";
const ResetPagePopUp = ({ setAuthMethod, setVisible }) => {
  const dispatch = useDispatch();
  const [new_password, setPassword] = useState("");
  const [submit, setSubmit] = useState("Reset Password");
  const loading = useSelector(({ authState }) => authState.passwordRestLoading);
  const success = useSelector(({ authState }) => authState.passwordRestSuccess);
  const msg = useSelector(({ authState }) => authState.msgResetPassword);
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");
  const refSubmit = useRef();

  const handlePasswordReset = () => {
    passwordReset(dispatch, uid, token, new_password);
  };

  const changeSubmitBtn = () => {
    refSubmit.current.disabled = loading;
    loading
      ? setSubmit(<i className="fa-solid fa-circle-notch fa-spin"></i>)
      : setSubmit("Reset Password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePasswordReset();
  };

  const renderErr = () => {
    if (msg.new_password) {
      return msg.new_password.map((err) => (
        <p key={err} className={styles.error_message}>
          {err}
        </p>
      ));
    }

    return <p></p>;
  };

  useEffect(() => {
    changeSubmitBtn();
    const url = window.location.href;
    setUid(url.substring(56, 59));
    setToken(url.substring(60, url.length));
    if (success) {
      setAuthMethod("after-send");
    }
  }, [loading]);

  return (
    <div>
      <form className={styles.modal__form} onSubmit={handleSubmit}>
        <div className={styles.form_field}>
          <label>New Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {renderErr()}
        </div>

        <button ref={refSubmit} className={styles.sign_up}>
          {submit}
        </button>
      </form>
    </div>
  );
};

export default ResetPagePopUp;
