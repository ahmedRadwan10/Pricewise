import React from "react";
import styles from "./Overlay.module.css";
function Overlay(props) {
  const { showOverlay } = props;
  return (
    <>
      {
        <div className={`${showOverlay ? null : styles.hidden}`}>
          <div className={styles.overlay}></div>
        </div>
      }
    </>
  );
}
export default Overlay;
