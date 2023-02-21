import React from "react";
import styles from "./Overlay.module.css";
function Overlay(props) {
  const { showOverlay } = props;
  return (
    <>
      {
        <div
          className={`${showOverlay ? styles.overlay : styles.hidden}`}
        ></div>
      }
    </>
  );
}
export default Overlay;
