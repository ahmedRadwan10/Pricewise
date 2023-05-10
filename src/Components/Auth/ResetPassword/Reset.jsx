import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Reset.module.css";
import { sendResetLink } from "../../../APIs/postUser";
import { useNavigate } from "react-router-dom";

const Reset = ({ setAuthMethod, setVisible }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState("Send Reset Link");
  const loading = useSelector(
    ({ authState }) => authState.sendResetLinkLoading
  );
  const success = useSelector(
    ({ authState }) => authState.sendResetLinkSuccess
  );
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");
  const refSubmit = useRef();

  const handleSendReset = () => {
    sendResetLink(dispatch, { email: email });
  };

  const changeSubmitBtn = () => {
    refSubmit.current.disabled = loading;
    loading
      ? setSubmit(<i className="fa-solid fa-circle-notch fa-spin"></i>)
      : setSubmit("Send Reset Link");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendReset();
  };

  useEffect(() => {
    changeSubmitBtn();
    if(success){
        setAuthMethod("after-send")
    }
  }, [loading]);

  return (
    <div>
      <form className={styles.modal__form} onSubmit={handleSubmit}>
        <div className={styles.form_field}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@mail.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button ref={refSubmit} className={styles.sign_up}>
          {submit}
        </button>
      </form>
    </div>
  );
};

export default Reset;
