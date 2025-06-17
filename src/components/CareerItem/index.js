import classNames from 'classnames/bind';
import styles from './CareerItem.module.scss';
import { faHeart as faHeartSolid, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '../Image';
import { useState, useEffect } from 'react';
import { assets } from '../../assets/assets_fe/assets';

const cx = classNames.bind(styles);

function CareerItem({ data, children }) {


    return (
        <div className={cx('wrapper')}>
            <div className={cx('company-image-wrapper')}>
                <div className={cx('company-image-container')}>
                    <Image src={data?.career?.career_logo || ''} fallback={assets.CompanyLogo} className={cx('company-image')}></Image>
                </div>
            </div>
            <div className={cx('company-name-wrapper')}>
                <div className={cx('company-name')}>
                    <span>
                        {data?.career?.career_name || ''} 
                    </span>
                </div>
            </div>
            <div className={cx('other-info')}>
                <div className={cx('job-details')}>
                    <FontAwesomeIcon className={cx('hot-icon')} icon={faBriefcase}></FontAwesomeIcon>
                    <div className={cx('hot-info')}>
                        <span>
                            {data?.count || '0'} công việc
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CareerItem;
