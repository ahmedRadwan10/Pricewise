import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Alarm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlarm } from '../../../redux/slices/alarmSlice';
import Overlay from '../Overlay/Overlay';

const Alarm = () => {
    const shown = useSelector(({ alarmState }) => alarmState.shown);
    const title = useSelector(({ alarmState }) => alarmState.title);
    const description = useSelector(({ alarmState }) => alarmState.description);
    const dispatch = useDispatch();

    return ReactDOM.createPortal(
        <>
            <Overlay visible={shown} />
            <div className={shown ? styles.main_container_shown : styles.main_container}>
                <div className={styles.header}> 
                    <span><i className="fa-solid fa-circle-check"></i></span>
                    <h3>{title}</h3>
                </div>
                <p>{description}</p>
                <div className={styles.btns}>
                    <button onClick={() => dispatch(hideAlarm())}>Dismiss</button>
                    {/* <button>Check your wishlist</button> */}
                </div>
            </div>
        </>,
        document.getElementById("alarm")
    );
}

export default Alarm;