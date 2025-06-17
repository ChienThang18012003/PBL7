import classNames from 'classnames/bind';
import styles from './ResumeItem.module.scss';
import { faLocationDot, faHeart as faHeartSolid, faBriefcase, faLightbulb, faEye } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '../Image';
import { useState, useEffect } from 'react';
import { assets } from '../../assets/assets_fe/assets';
import { useNavigate } from 'react-router-dom';
import useResumeSaved from '../../hook/useResumeSaved';

const cx = classNames.bind(styles);

function ResumeItem({ data, children, email }) {

    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    const [resumeInfo, setResumeInfo] = useState([]);
    const [resumeSavedLoading, resumeSavedHook, getResumeSavedByEmail, getSpecificResumeSaved, addResumeSaved, deleteResumeSaved] = useResumeSaved();

    function formatToDateInputValue(isoDateString) {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(()=>{
        const fetchResumeSaved = async() => {
            if (email && data && data?._id) {
                const resume = await getSpecificResumeSaved(data?._id, email);
                console.log("Resume: ",resume);
                if (resume) {
                    setIsSaved(true);
                    setResumeInfo(resume);
                } else {
                    setIsSaved(false);
                }
            }
        }
        fetchResumeSaved();
    },[data,email])

    const handleUnsaveResume = async() => {
        const resume = await deleteResumeSaved(resumeInfo?._id);
        if (resume) {
            setIsSaved(false);
            setResumeInfo([]);
        }
    }

    const handleSaveResume = async() => {
        const resume = await addResumeSaved(data?._id, email);
        console.log(resume);
        if (resume) {
            setIsSaved(true);
            setResumeInfo(resume);
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('company-info')}>
                <div className={cx('resume-info-wrapper')}>
                    <div className={cx('company-image-wrapper')}>
                        <Image className={cx('company-image')} src={data?.user_id?.profile_image} fallback={assets.UserImage}></Image>
                    </div>
                    <div className={cx('job-detail-container')}>
                        <div className={cx('job-detail-wrapper')}>
                            <div className={cx('job-name')}>
                                <span>
                                    {data?.user_id?.username || "Chưa xác định"}
                                </span>
                            </div>
                            <div className={cx('company-info-wrapper')}>
                                <div className={cx('company-name')}>
                                    <span>
                                        {data?.desired_position || "Chưa xác định"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('company-info-wrapper-three')}>
                            <div className={cx('company-info-wrapper-two')}>
                                <FontAwesomeIcon className={cx('company-icon')} icon={faBriefcase}></FontAwesomeIcon>
                                <div className={cx('phone-number')}>
                                    <span>
                                        {data?.career_id?.career_name || "Chưa xác định"}
                                    </span>
                                </div>
                            </div>
                            <div className={cx('company-info-wrapper-two')}>
                                <FontAwesomeIcon className={cx('company-icon')} icon={faLocationDot}></FontAwesomeIcon>
                                <div className={cx('phone-number')}>
                                    <span>
                                        {data?.city_id?.name || "Chưa xác định"}
                                    </span>
                                </div>
                            </div>
                            <div className={cx('company-info-wrapper-two')}>
                                <FontAwesomeIcon className={cx('company-icon')} icon={faLightbulb}></FontAwesomeIcon>
                                <div className={cx('phone-number')}>
                                    <span>
                                        {data?.experience}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('resume-action-wrapper')}>
                    <div className={cx('action-button-wrapper')}>
                        {
                            isSaved ? (
                                <FontAwesomeIcon className={cx('like-button')} icon={faHeartSolid} onClick={handleUnsaveResume}/>
                            ) : (
                                <FontAwesomeIcon className={cx('like-button')} icon={faHeart} onClick={handleSaveResume}/>
                            )
                        }
                        <FontAwesomeIcon className={cx('view-button')} icon={faEye} onClick={()=>{navigate(`/resume-info/${data?._id}`)}}/>
                    </div>
                    <div className={cx('company-name')}>
                        <span>
                            Thời gian cập nhật: {formatToDateInputValue(data?.updatedAt)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumeItem;
