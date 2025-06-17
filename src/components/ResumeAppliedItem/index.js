import classNames from 'classnames/bind';
import styles from './ResumeAppliedItem.module.scss';
import { faHeart as faHeartSolid, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import useLanguageSkill from '../../hook/useLanguageSkill';
import { useNavigate } from 'react-router-dom';
import useResumeApplied from '../../hook/useResumeApplied';

const cx = classNames.bind(styles);

function ResumeAppliedItem({ data, children, onDeleteResume, type="confirm" }) {
    const navigate = useNavigate();

    const [languageData, setLanguageData] = useState({});
    const [selectedStatus, setSelectedStatus] = useState('');
    const [originalStatus, setOriginalStatus] = useState('');
    const [resumeID, setResumeID] = useState('');
    const [resumeAppliedLoading, resumeAppliedHook, getResumeAppliedByEmail, getSpecificResumeApplied, addResumeApplied, deleteResumeApplied, updateResumeApplied] = useResumeApplied();

    useEffect(()=>{
        setLanguageData(data);
        setSelectedStatus(data?.status);
        setOriginalStatus(data?.status);
        setResumeID(data?._id);
    },[data])

    useEffect(()=>{
        const update_Resume_Applied = async() => {
            if (selectedStatus !== originalStatus) {
                const resume = await updateResumeApplied(data?._id, selectedStatus)
                if (resume) setOriginalStatus(selectedStatus)
            }
        }
        update_Resume_Applied();
    },[selectedStatus])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };


    return (
        <div className={cx('wrapper')}>
            <div className={cx('language')}>
                <span>{languageData?.resume_id?.desired_position || 'Chưa xác định'}</span>
            </div>
            <div className={cx('candidate-name')}>
                <span>{languageData?.resume_id?.user_id?.username || 'Chưa xác định'}</span>
            </div>
            <div className={cx('position')}>
                <span>{languageData?.job_post_id?.job_name || 'Chưa xác định'}</span>
            </div>
            <div className={cx('date-applied')}>
                <span>{formatDate(languageData?.createdAt) || 'Chưa xác định'}</span>
            </div>
            <div className={cx('profile-type')}>
                <span>{languageData?.resume_id?.is_default ? 'Hồ sơ mặc định' : 'Hồ sơ đính kèm'}</span>
            </div>
            <div className={cx('status')} >
                <select className={cx('status-select')} value={selectedStatus} onChange={(e)=>{setSelectedStatus(e.target.value)}}>
                    <option key='0' value='Chờ xác nhận'>
                        Chờ xác nhận
                    </option> 
                    <option key='1' value='Đã liên hệ'>
                        Đã liên hệ
                    </option> 
                    <option key='2' value='Đã test'>
                        Đã test
                    </option> 
                    <option key='3' value='Đã phỏng vấn'>
                        Đã phỏng vấn
                    </option> 
                    <option key='4' value='Trúng tuyển'>
                        Trúng tuyển
                    </option> 
                    <option key='5' value='Không trúng tuyển'>
                        Không trúng tuyển
                    </option> 
                </select>
            </div>
            <div className={cx('action-buttons-wrapper')}>
                <FontAwesomeIcon className={cx('like-button')} icon={faTrash} onClick={async()=>{
                    const resume = await deleteResumeApplied(data?._id);
                    onDeleteResume(resumeID);
                }}/>
                <FontAwesomeIcon className={cx('view-button')} icon={faEye} onClick={()=>{navigate(`/resume-info/${data?.resume_id?._id}`)}}/>
            </div>
        </div>
    );
}

export default ResumeAppliedItem;
