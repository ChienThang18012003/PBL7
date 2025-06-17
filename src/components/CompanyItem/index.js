import classNames from 'classnames/bind';
import styles from './CompanyItem.module.scss';
import { faHeart as faHeartSolid, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '../Image';
import { useState, useEffect } from 'react';
import { assets } from '../../assets/assets_fe/assets';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function CompanyItem({ data, children }) {

    const navigate = useNavigate();

    return (
        <div className={cx('wrapper')} onClick={()=>{navigate(`/company-info/${data?._id}`)}}>
            <div className={cx('company-image-wrapper')}>
                <div className={cx('company-image-container')}>
                    <Image src={data?.company_logo || ''} fallback={assets.CompanyLogo} className={cx('company-image')}></Image>
                </div>
            </div>
            <div className={cx('company-name-wrapper')}>
                <div className={cx('company-name')}>
                    <span>
                        {data?.company_name || 'Chưa xác định'}
                    </span>
                </div>
            </div>
            <div className={cx('other-info')}>
                <div className={cx('job-details')}>
                    <FontAwesomeIcon className={cx('hot-icon')} icon={faBriefcase}></FontAwesomeIcon>
                    <div className={cx('hot-info')}>
                        <span>
                            {data?.job_post_count} công việc
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyItem;
