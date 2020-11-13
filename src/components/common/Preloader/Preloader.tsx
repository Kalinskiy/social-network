import preloader from '../../../assets/icons/preloader.gif';
import React from 'react';
import s from './Preloader.module.css';

let Preloader = () => {
    return (
        <div className={s.container}>
            <img className={s.img} src={preloader}/>
        </div>
    )
}

export default Preloader;