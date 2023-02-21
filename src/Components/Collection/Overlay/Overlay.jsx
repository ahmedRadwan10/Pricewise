import React from "react";
import styles from "./Overlay.module.css";

const Overlay = ({ visible, setVisible }) => {
  return (
    <>
      <div
        className={ visible ? styles.overlay : styles.overlay_hidden }
        onClick={() => setVisible(false)}>
      </div>
    </>
  );
}
export default Overlay;
