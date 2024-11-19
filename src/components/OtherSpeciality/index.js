import React, { useState, useEffect } from "react";
import classNames from 'classnames/bind';
import styles from './OtherSpeciality.module.scss';

const cx = classNames.bind(styles);

function OtherSpeciality({data}) {
    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
    return(
        <a className={cx('wrapper')} href={`/speciality-info/${data._id}`}>
            <div className={cx('image-wrapper')}>
                <img className={cx('speciality-image')} src={`data:image/jpeg;base64,${arrayBufferToBase64(data.speciality_image.data)}`}></img>
                <div className={cx('speciality-name')}>
                    <span>{data.name?.toUpperCase()}</span>
                </div>
            </div>
        </a>
    )
}

export default OtherSpeciality;