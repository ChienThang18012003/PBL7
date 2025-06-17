import classNames from 'classnames/bind';
import styles from './JobsItem.module.scss';
import { faBuilding, faMoneyBill, faLocationDot, faCalendar, faFire, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '../Image';
import { useState, useEffect } from 'react';
import { assets } from '../../assets/assets_fe/assets';
import { useNavigate } from 'react-router-dom';
import useJobPostSaved from '../../hook/useJobPostSaved';

const cx = classNames.bind(styles);

function JobsItem({ data, children }) {

    const navigate = useNavigate();
    const [isFollowed, setIsFollowed] = useState(false);
    const [jobPostSaved, setJobPostSaved] = useState({});
    const [jobPostSavedLoading, jobPostSavedHook, getJobPostSavedByEmail, getSpecificJobPostSaved, addJobPostSaved, deleteJobPostSaved] = useJobPostSaved();
    const [email, setEmail] = useState('');

    useEffect(()=>{
        const fetchEmail = async() => {
            let item = localStorage.getItem('isLoginSuccess');

            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email){
                    setEmail(obj?.email)
                }
           }
        }
        fetchEmail();
    },[]);

    useEffect(()=>{
        const fetchSpecificJobPostSaved = async() => {
            if (email && data) {
                const jobPostSaved = await getSpecificJobPostSaved(data?._id, email);
                if (jobPostSaved) {setIsFollowed(true);setJobPostSaved(jobPostSaved);}
                else {setIsFollowed(false);}
            }
        }
        fetchSpecificJobPostSaved();
    },[email, data])

    const handleFollowClick = async(e) => {
        e.stopPropagation();
        const job = await addJobPostSaved(data?._id, email);
        if (job) {setIsFollowed(true);setJobPostSaved(job)}
    }
    const handleUnfollowClick = async(e) => {
        e.stopPropagation();
        const job = await deleteJobPostSaved(jobPostSaved?._id);
        if (job) {setIsFollowed(false);setJobPostSaved({})}
    }

    const [isHovered, setIsHovered] = useState(false);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className={cx('wrapper')} onClick={()=>{navigate(`/job-info/${data?._id}`); window.scrollTo(0,0);}}>
            <div className={cx('company-info')}>
                <div className={cx('company-image-wrapper')}>
                    <Image className={cx('company-image')} src={data?.company_id?.logo || ''} fallback={assets.CompanyLogo}></Image>
                </div>
                <div className={cx('job-detail-wrapper')}>
                    <div className={cx('job-name')}>
                        <span>
                            {data?.job_name || "Chưa xác định"}
                        </span>
                    </div>
                    <div className={cx('company-info-wrapper')}>
                        <FontAwesomeIcon className={cx('company-icon')} icon={faBuilding}></FontAwesomeIcon>
                        <div className={cx('company-name')}>
                            <span>
                                {data?.company_id?.company_name || "Chưa xác định"}
                            </span>
                        </div>
                    </div>
                    <div className={cx('company-info-wrapper')}>
                        <FontAwesomeIcon className={cx('company-icon')} icon={faMoneyBill}></FontAwesomeIcon>
                        <div className={cx('company-name')}>
                            <span>
                                {data?.salary_min || "0"} - {data?.salary_max || "0"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('job-details-wrapper')}>
                <div className={cx('job-details')}>
                    <FontAwesomeIcon className={cx('company-icon')} icon={faLocationDot}></FontAwesomeIcon>
                    <div className={cx('job-info')}>
                        <span>
                            {data?.location_id?.city_id?.name || "Chưa xác định"}
                        </span>
                    </div>
                </div>
                <div className={cx('job-details')}>
                    <FontAwesomeIcon className={cx('company-icon')} icon={faCalendar}></FontAwesomeIcon>
                    <div className={cx('job-info')}>
                        <span>
                            {formatDate(data?.deadline) || "Chưa xác định"}
                        </span>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className={cx('other-info')}>
                {
                    data?.is_urgent ? (
                        <div className={cx('job-details')}>
                            <FontAwesomeIcon className={cx('hot-icon')} icon={faFire}></FontAwesomeIcon>
                            <div className={cx('hot-info')}>
                                <span>
                                    HOT
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('job-details')}>
                        </div>
                    )
                }
                {
                    email && (
                        <div>
                            {
                                isFollowed ? (
                                    <FontAwesomeIcon className={cx('like-button')} onClick={handleUnfollowClick} icon={faHeartSolid} />
                                ) : (
                                    <FontAwesomeIcon className={cx('like-button')} onClick={handleFollowClick} icon={faHeart} />
                                )
                            }
                        </div>   
                    )
                }
            </div>
        </div>
    );
}

export default JobsItem;
