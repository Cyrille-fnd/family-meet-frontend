import React from 'react';
import s from '../infiniteScroll/loader.module.css'

const Loader = () => {
    return (
        <div className={s.loaderContainer}>
            <div className={s.loader} />
        </div>
    );
};

export default Loader;
