import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AfterSend.module.css";
import { useNavigate } from "react-router-dom";

const AfterSend = ({ setAuthMethod, setVisible }) => {
  const dispatch = useDispatch();
  const success = useSelector(({ authState }) => authState.passwordRestSuccess);

  useEffect(() => {
    console.log(success);
  }, []);

  return (
    <div className={styles.container}>
      <i className={`fas fa-check-circle ${styles.circle} fa-bounce`}></i>
      <div className={styles.success}>
        {success
          ? "Your Password has Reset Successfully"
          : "Your ResetLink Sent Successfully to Your Email"}
      </div>
    </div>
  );
};

export default AfterSend;
