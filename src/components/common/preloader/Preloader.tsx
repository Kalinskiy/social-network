import preloader from '../../../assets/images/loader.svg';
import React from 'react';
import s from './Preloader.module.css';

let Preloader = () => {
    return (
        <div>
            <img className={s.img} src={preloader}/>
        </div>
    )
}

export default Preloader;