import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { resendAct, verify } from "../../../APIs/postUser";
import { useParams } from "react-router";
import styles from "./Activate.module.css";
import { addEmail } from "../../../redux/slices/authSlice";

const Activate = () => {
  const [activateBtn, setActivateBtn] = useState("Verify Your Account");
  const refActivateBtn = useRef();
  const dispatch = useDispatch();
  const [verifyy, setVerify] = useState(false);
  let { uid, token } = useParams();
  const success = useSelector(({ authState }) => authState.activateSuccess);
  const email = useSelector(({ authState }) => authState.email);

  const verifyAccount = () => {
    verify(dispatch, uid, token);
    setVerify(true);
  };

  const changeActivateBtn = () => {
    refActivateBtn.current.disabled = success;
    success
      ? setActivateBtn("Your Account Is Verified")
      : setActivateBtn("Verify Your Account");
  };

  const resendActivationLink = () => {
    resendAct(dispatch, { email: email });
  };

  useEffect(() => {
    changeActivateBtn();
    dispatch(addEmail());
  }, [success]);

  return (
    <div className={styles.container}>
      <div className={styles.activate_container}>
        <div className={uid == "undefined" ? "" : styles.hidden}>
          <p>
            Check You Email Inbox : {email} <br /> To Verify YourAccount
          </p>

          <p>
            Didn't get the activation link{" "}
            <span
              onClick={() => {
                resendActivationLink();
              }}
            >
              Resend
            </span>
          </p>
        </div>
        <button
          onClick={() => {
            verifyAccount();
          }}
          className={uid == "undefined" ? styles.hidden : styles.submit}
          ref={refActivateBtn}
        >
          {activateBtn}
        </button>
      </div>
    </div>
  );
};

export default Activate;
