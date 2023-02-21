import React from "react";
import styles from "./Login.module.css";
function Login(props) {
  const { showLogin, handleShowLogin } = props;

  return (
    <>
      {
        <div className={`${showLogin ? null : styles.hidden}`}>
          <div className={styles.modal}>
            <span className={styles.btn_close_modal} onClick={handleShowLogin}>
              &times;
            </span>
            <div className={styles.modal__header}>
              <h2>Welcome back!</h2>
              <h1>Sign in to your account</h1>
              <h3>
                Don't hava an account? <span>Sign Up</span>
              </h3>
            </div>
            <form className={styles.modal__form}>
              <label>Email</label>
              <input type="text" />
              <label>Password</label>
              <input type="password" />
              <span className={styles.forget}>Forget your passord? </span>
              <span className={styles.sign_in}>SIGN IN</span>
              <span className={styles.or}>Or</span>
              <span className={styles.google_sigin_in}>
                Sign in with Google
              </span>
            </form>
          </div>
        </div>
      }
    </>
  );
}
export default Login;
