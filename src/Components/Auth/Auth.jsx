import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import styles from "./Auth.module.css";
import Overlay from "../Collection/Overlay/Overlay";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import { useSelector } from "react-redux";
import Activate from "./Activate/Activate";
import { useLocation } from "react-router-dom";
import Reset from "./ResetPassword/Reset";
import AfterSend from "./ResetPassword/SubComponents/AfterSend/AfterSend";
import ResetModule from "./ResetPassword/SubComponents/ResetPage/ResetPagePopUp";
import { useNavigate } from "react-router-dom";

const Auth = ({ visible, setVisible }) => {
  const [authMethod, setAuthMethod] = useState("sign-in");
  const location = useLocation();
  const navigate = useNavigate();
  const isActivationPath = location.pathname.startsWith(
    "/auth/users/activation/"
  );
  const isResetPasswordPath = location.pathname.startsWith(
    "/auth/users/password/reset/confirm/"
  );

  const handleCloseBtn = () => {
    setVisible(false);
    navigate("/");
    setAuthMethod("sign-in");
  };

  useEffect(() => {
    setVisible(false);
    if (isActivationPath) {
      setAuthMethod("activate");
      setVisible(true);
    }
    if (isResetPasswordPath) {
      setAuthMethod("reset-module");
      setVisible(true);
    }
  }, []);
  return ReactDom.createPortal(
    <>
      <Overlay visible={visible} setVisible={setVisible} />
      <div className={visible ? styles.auth_modal : styles.auth_modal_hidden}>
        <span
          className={styles.btn_close_modal}
          onClick={() => handleCloseBtn()}
        >
          <i className="fa-solid fa-xmark"></i>
        </span>
        {authMethod === "sign-in" && (
          <SignIn setAuthMethod={setAuthMethod} setVisible={setVisible} />
        )}
        {authMethod === "sign-up" && (
          <SignUp setAuthMethod={setAuthMethod} setVisible={setVisible} />
        )}
        {authMethod === "activate" && (
          <Activate setAuthMethod={setAuthMethod} setVisible={setVisible} />
        )}
        {authMethod === "reset-pass" && (
          <Reset setAuthMethod={setAuthMethod} setVisible={setVisible} />
        )}
        {authMethod === "after-send" && (
          <AfterSend setAuthMethod={setAuthMethod} setVisible={setVisible} />
        )}
        {authMethod === "reset-module" && (
          <ResetModule setAuthMethod={setAuthMethod} setVisible={setVisible} />
        )}
      </div>
    </>,
    document.getElementById("auth")
  );
};
export default Auth;
