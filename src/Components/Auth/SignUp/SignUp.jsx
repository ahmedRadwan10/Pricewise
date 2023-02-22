import React from 'react';
import styles from './SignUp.module.css';

const SignUp = ({ setAuthMethod }) => {
    return (
    <div>
        <div className={styles.modal__header}>
          <h1>Create an account</h1>
          <h3>
            Already have an account? <span onClick={() => setAuthMethod("sign-in")}>Sign in</span>
          </h3>
        </div>
        <form className={styles.modal__form}>
            <div className={styles.name_field}>
                <div>
                    <label>First Name</label>
                    <input type="text" />
               </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" />
               </div>
            </div>
            <div className={styles.form_field}>
                <label>Email</label>
                <input type="text" placeholder="example@mail.com" />
            </div>
            <div className={styles.form_field}>
                <label>Password</label>
                <input type="password" />
            </div>
            <div className={styles.form_field}>
                <label>Confirm Password</label>
                <input type="password" />
            </div>
          <span className={styles.sign_up}>Sign up</span>
        </form>
    </div>
    );
}

export default SignUp;