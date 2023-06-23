import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./AddPopUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import Overlay from "../Overlay/Overlay";
import {
  hideWishlistPopUp,
  showWishlistPopUp,
  setDesiredPrice,
  setNotifyWhenAnyDrop,
} from "../../../redux/slices/addWishlistSlice";
import { getWishListData, sendProductToDataBase } from "../../../APIs/products";

const AddWishPopUp = () => {
  const shown = useSelector(({ addWishlistState }) => addWishlistState.shown);
  const id = useSelector(({ addWishlistState }) => addWishlistState.id);
  const loading = useSelector(
    ({ addWishlistState }) => addWishlistState.loading
  );
  const success = useSelector(
    ({ addWishlistState }) => addWishlistState.success
  );
  const desiredPrice = useSelector(
    ({ addWishlistState }) => addWishlistState.desiredPrice
  );
  const notifyWhenAnyDrop = useSelector(
    ({ addWishlistState }) => addWishlistState.notifyWhenAnyDrop
  );

  const [inputPrice, setInputPrice] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);
  const token = useSelector(({ authState }) => authState.user.access);
  const [submit, setSubmit] = useState("Submit");
  const dispatch = useDispatch();
  const refSubmit = useRef();

  const changeSubmitBtn = () => {
    refSubmit.current.disabled = loading;
    loading
      ? setSubmit(<i className="fa-solid fa-circle-notch fa-spin"></i>)
      : setSubmit("Submit");
  };

  const hnadleSendProductToDataBase = (desiredPrice, success) => {
    if (desiredPrice && !success) {
      sendProductToDataBase(
        dispatch,
        {
          desired_price: desiredPrice,
          product_id: id,
          notify_when_any_drop: notifyWhenAnyDrop,
        },
        token
      );
    }
  };

  useEffect(() => {
    dispatch(setNotifyWhenAnyDrop(checkboxValue));
    changeSubmitBtn();
    hnadleSendProductToDataBase(desiredPrice, success);
    if (success) {
      getWishListData(dispatch, token);
      dispatch(hideWishlistPopUp());
    }
  }, [checkboxValue, loading, desiredPrice]);

  return ReactDOM.createPortal(
    <>
      <Overlay visible={shown} />
      <div
        className={shown ? styles.main_container_shown : styles.main_container}
      >
        <div className={styles.header}>
          <span>
            <i className="fa-solid fa-circle-check"></i>
          </span>
          <h3>{}</h3>
        </div>
        <p>{}</p>
        <div className={styles.checkbox}>
          <label>
            <input
              type="checkbox"
              checked={checkboxValue}
              onChange={(e) => setCheckboxValue(e.target.checked)}
            />
            Notify when any price drops
          </label>
        </div>
        <div className={styles.btns}>
          <input
            type="text"
            value={inputPrice}
            onChange={(e) => setInputPrice(e.target.value)}
            placeholder="Enter Your DesiredPrice"
          />
          <button
            onClick={() => {
              dispatch(setDesiredPrice(inputPrice));

              setInputPrice(""); // Reset the input value after dispatching
            }}
            ref={refSubmit}
          >
            {submit}
          </button>
          <button onClick={() => dispatch(hideWishlistPopUp())}>Close</button>
          {/* <button>Check your wishlist</button> */}
        </div>
      </div>
    </>,
    document.getElementById("addWishPopUp")
  );
};

export default AddWishPopUp;
