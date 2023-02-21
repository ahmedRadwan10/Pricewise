import React from 'react';
import styles from './SignIn.module.css';

const SignIn = () => {
    return (
    <div>
        <div className={styles.modal__header}>
          <p>Welcome back!</p>
          <h1>Sign in to your account</h1>
          <h3>
            Don't have an account? <span>Sign Up</span>
          </h3>
        </div>
        <form className={styles.modal__form}>
            <div className={styles.form_field}>
                <label>Email</label>
                <input type="text" placeholder="example@mail.com" />
            </div>
            <div className={styles.form_field}>
                <label>Password</label>
                <input type="password" />
            </div>
          <span className={styles.forget}>Forgot your password? </span>
          <span className={styles.sign_in}>Sign in</span>
        </form>
      </div>
    );
}

export default SignIn;