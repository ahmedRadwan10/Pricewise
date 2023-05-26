import React, { useEffect } from 'react';
import styles from '../Product.module.css';

const ProductSpecs = ({ specs }) => {

    const renderSpecs = () => {
        const specsArr = Object.entries(specs);
        return specsArr.map(spec => {
            if (spec[1]) return <li key={spec[0]}>
                                    <p>{spec[0].replace(/_/g, ' ')}</p>
                                    <p>{spec[1]}</p>
                                </li>
        });
    }

    return (
        <div className={styles.specs_container}>
            <ul>
                { renderSpecs() }
            </ul>
        </div>
    );
}

export default ProductSpecs;