import classNames from 'classnames/bind';
import styles from './CompanyFollowedItem.module.scss';
import { faHeart as faHeartSolid, faBriefcase, faFlag, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '../Image';
import { useState, useEffect } from 'react';
import { assets } from '../../assets/assets_fe/assets';
import useCompanyFollowed from '../../hook/useCompanyFollowed';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function CompanyFollowedItem({ data, children, onDeleteCompanyFollowed }) {

    const [id, setID] = useState("");
    const navigate = useNavigate();
    const [companyFollowedLoading, companyFollowedHook, getCompanyFollowedByEmail, getSpecificCompanyFollowed, addCompanyFollowed, deleteCompanyFollowed] = useCompanyFollowed();
    const handleUnfollowCompany = async(e) => {
        e.stopPropagation();
        const company = await deleteCompanyFollowed(data?._id);
        onDeleteCompanyFollowed(id);
    }
    useEffect(()=>{
        setID(data?._id);
    },[data])


    return (
        <div className={cx('wrapper')} onClick={()=>{navigate(`/company-info/${data?.company_id?._id}`)}}>
            <div className={cx('company-info-wrapper')}>
                <div className={cx('company-logo-wrapper')}><Image className={cx('company-logo')} src={data?.company_id?.logo || ''} fallback={assets.CompanyLogo}></Image></div>
                <div className={cx('company-info')}>
                    <div className={cx('company-name')}>
                        <span>
                            {data?.company_id?.company_name || 'Chưa xác định'}
                        </span>
                    </div>
                    <div className={cx('info-container')}>
                        <FontAwesomeIcon className={cx('info-icon')} icon={faFlag}></FontAwesomeIcon>
                        <div className={cx('info-text')}>
                            <span>
                                {data?.company_id?.career_id?.career_name || "Chưa xác định"}
                            </span>
                        </div>
                    </div>
                    <div className={cx('info-container')}>
                        <FontAwesomeIcon className={cx('info-icon')} icon={faPhone}></FontAwesomeIcon>
                        <div className={cx('info-text')}>
                            <span>
                                {data?.company_id?.company_phone || 'Chưa xác định'}
                            </span>
                        </div>
                    </div>
                    <div className={cx('info-container')}>
                        <FontAwesomeIcon className={cx('info-icon')} icon={faLocationDot}></FontAwesomeIcon>
                        <div className={cx('info-text')}>
                            <span>
                                {data?.company_id?.location_id?.city_id?.name || 'Chưa xác định'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <button className={cx('followed-button')} onClick={handleUnfollowCompany}>
                <FontAwesomeIcon className={cx('followed-icon')} icon={faBriefcase}></FontAwesomeIcon>
                Bỏ theo dõi
            </button>
        </div>
    );
}

export default CompanyFollowedItem;
