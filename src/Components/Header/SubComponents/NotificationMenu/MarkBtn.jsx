import React, { useState } from 'react';
import styles from './NotificationMenu.module.css';

const MarkBtn = () => {
    const [hovered, setHovered] = useState(false);

    return (
        <button
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            { !hovered ? <i className="fa-regular fa-circle"></i> : <i className="fa-regular fa-circle-check"></i> }
        </button>
    );
}

export default MarkBtn;