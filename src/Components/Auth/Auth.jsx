import React, { useState } from "react";
import ReactDom from "react-dom";
import styles from "./Auth.module.css";
import Overlay from "../Collection/Overlay/Overlay";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

const Auth = ({ visible, setVisible }) => {
  const [authMethod, setAuthMethod] = useState("sign-in");
  return ReactDom.createPortal(
    <>
      <Overlay visible={visible} setVisible={setVisible} />
        <div className={ visible ? styles.auth_modal : styles.auth_modal_hidden }>
          <span className={styles.btn_close_modal} onClick={() => setVisible(false)}>
            <i className="fa-solid fa-xmark"></i>
          </span>
          { authMethod === "sign-in" ? <SignIn setAuthMethod={setAuthMethod} /> : <SignUp setAuthMethod={setAuthMethod} />}
        </div>
    </>,
    document.getElementById("auth")
  );
}
export default Auth;
