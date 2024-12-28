import React, { useState, useEffect } from "react";
import classNames from 'classnames/bind';
import styles from './OtherSpeciality.module.scss';
import Image from "../Image";

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
        <a className={cx('wrapper')} href={`/speciality-info/${data?._id}`}>
            <div className={cx('image-wrapper')}>
                <Image className={cx('speciality-image')} src={data?.speciality_image}></Image>
                <div className={cx('speciality-name')}>
                    <span>{data.name?.toUpperCase()}</span>
                </div>
            </div>
        </a>
    )
}

export default OtherSpeciality;