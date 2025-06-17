import classNames from 'classnames/bind';
import styles from './SavedJobItem.module.scss';
import { faBuilding, faMoneyBill, faLocationDot, faCalendar, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '../Image';
import { useState, useEffect } from 'react';
import { assets } from '../../assets/assets_fe/assets';
import { useNavigate } from 'react-router-dom';
import useJobPostSaved from '../../hook/useJobPostSaved';

const cx = classNames.bind(styles);

function SavedJobItem({ data, children, onDeleteJobPostSaved }) {

    const [jobPostSavedLoading, jobPostSavedHook, getJobPostSavedByEmail, getSpecificJobPostSaved, addJobPostSaved, deleteJobPostSaved] = useJobPostSaved();
    const [id, setID] = useState('');

    const handleUnsaveJobPost = async(e) => {
        e.stopPropagation();
        const jobpost = await deleteJobPostSaved(data?._id);
        onDeleteJobPostSaved(id);
    }

    useEffect(()=>{
        setID(data?._id)
    },[data])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    const navigate = useNavigate();

    return (
        <div className={cx('wrapper')} onClick={()=>{navigate(`/job-info/${data?.job_post_id?._id}`)}}>
            <div className={cx('info-container')}>
                <div className={cx('company-info')}>
                    <div className={cx('company-image-wrapper')}>
                        <Image className={cx('company-image')} src={data?.job_post_id?.company_id?.logo || ''} fallback={assets.CompanyLogo}></Image>
                    </div>
                    <div className={cx('job-detail-wrapper')}>
                        <div className={cx('job-name')}>
                            <span>
                                {data?.job_post_id?.job_name || 'Chưa xác định'}
                            </span>
                        </div>
                        <div className={cx('company-info-wrapper')}>
                            <FontAwesomeIcon className={cx('company-icon')} icon={faBuilding}></FontAwesomeIcon>
                            <div className={cx('company-name')}>
                                <span>
                                    {data?.job_post_id?.company_id?.company_name || 'Chưa xác định'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('job-details-wrapper')}>
                    <div className={cx('job-details')}>
                        <FontAwesomeIcon className={cx('company-icon')} icon={faMoneyBill}></FontAwesomeIcon>
                        <div className={cx('job-info')}>
                            <span>
                                {data?.job_post_id?.salary_min || '0'} - {data?.job_post_id?.salary_max || '0'}
                            </span>
                        </div>
                    </div>
                    <div className={cx('job-details')}>
                        <FontAwesomeIcon className={cx('company-icon')} icon={faLocationDot}></FontAwesomeIcon>
                        <div className={cx('job-info')}>
                            <span>
                                {data?.job_post_id?.location_id?.city_id?.name || 'Chưa xác định'}
                            </span>
                        </div>
                    </div>
                    <div className={cx('job-details')}>
                        <FontAwesomeIcon className={cx('company-icon')} icon={faCalendar}></FontAwesomeIcon>
                        <div className={cx('job-info')}>
                            <span>
                                {formatDate(data?.job_post_id?.deadline) || "Chưa xác định"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <button className={cx('followed-button')} onClick={handleUnsaveJobPost}>
                <FontAwesomeIcon className={cx('followed-icon')} icon={faHeartSolid}></FontAwesomeIcon>
                Bỏ Lưu
            </button>
        </div>
    );
}

export default SavedJobItem;
