import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { resendAct, verify } from "../../../APIs/postUser";
import { useParams } from "react-router";
import styles from "./Activate.module.css";
import { addEmail, successActivate } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Activate = ({ setAuthMethod, setVisible }) => {
  const [activateBtn, setActivateBtn] = useState("Verify Your Account");
  const refActivateBtn = useRef();
  const refResendBtn = useRef();
  const dispatch = useDispatch();
  const [verifyy, setVerify] = useState(false);
  const [wait, setWait] = useState("");
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");
  const loading = useSelector(({ authState }) => authState.activateLoading);
  const email = useSelector(({ authState }) => authState.email);

  const verifyAccount = () => {
    verify(dispatch, uid, token)
      .then(() => {
        setVerify(true);
        handleActivateBtnSuccuss();
      })
      .catch(() => {
        handleActivateBtnError();
      });
  };

  const handleActivateBtnError = () => {
    setActivateBtn("Can't Verify Your Account");
    refActivateBtn.current.disabled = !loading;
  };

  const handleActivateBtnSuccuss = () => {
    setActivateBtn("Your Account Is Verified");
    refActivateBtn.current.disabled = !loading;
  };

  const changeSubmitBtn = () => {
    loading
      ? setActivateBtn(<i className="fa-solid fa-circle-notch fa-spin"></i>)
      : setActivateBtn("Verify Your Account");
  };

  const resendActivationLink = () => {
    resendAct(dispatch, { email: email });
  };

  const changeResendBtn = () => {
    refResendBtn.current.style.color = `var(--blue)`;
    setWait("");
    refResendBtn.current.style.cursor = "pointer";
  };

  const resendTime = () => {
    refResendBtn.current.style.color = `var(--light-gray)`;
    setWait("Wait some time to resend again.");
    refResendBtn.current.style.cursor = "default";
    setTimeout(changeResendBtn, 10000);
  };

  useEffect(() => {
    changeSubmitBtn();
    dispatch(addEmail());
    const url = window.location.href;
    setUid(url.substring(44, 47));
    setToken(url.substring(48, url.length - 1));
    console.log(uid, token);
  }, [loading]);

  return (
    <div className={styles.container}>
      <div className={styles.activate_container}>
        <div className={uid == "" ? "" : styles.hidden}>
          <p>
            Check You Email Inbox : {email} <br /> To Verify YourAccount
          </p>

          <p>
            Didn't get the activation link{" "}
            <span
              onClick={() => {
                resendActivationLink();
                resendTime();
              }}
              ref={refResendBtn}
            >
              Resend
            </span>
          </p>
          <p>{wait}</p>
        </div>
        <button
          onClick={() => {
            verifyAccount();
          }}
          className={uid == "" ? styles.hidden : styles.submit}
          ref={refActivateBtn}
        >
          {activateBtn}
        </button>
      </div>
    </div>
  );
};

export default Activate;
