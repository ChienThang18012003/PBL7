import classNames from 'classnames/bind';
import styles from './ExperienceItem.module.scss';
import { faCalendar, faHeart as faHeartSolid,faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import ExperienceModal from '../ExperienceModal';
import useExperienceDetail from '../../hook/useExperienceDetail';

const cx = classNames.bind(styles);

function ExperienceItem({ data, children, onDeleteExperience, type = "confirm" }) {

    const [experienceData, setExperienceData] = useState({});
    const [experienceDetailLoading, experienceDetailHook, getExpDetailByResume, addExpDetail, updateExpDetail, deleteExpDetail] = useExperienceDetail();

    useEffect(()=>{
        setExperienceData(data);
    },[data])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleSubmitModal = (returnObject) => {
        setExperienceData(returnObject);
    }

    const handleDeleteItem = async() => {
        const deletedExp = await deleteExpDetail(data?._id);
        onDeleteExperience({id: experienceData?._id});
    }

    return (
        <div className={cx('container')}>
            <div className={cx('top-circle')}></div>
            <div className={cx('bottom-circle')}></div>
            <div className={cx('wrapper')}>
                <div className={cx('company-info')}>
                    <div className={cx('experience-info-wrapper')}>
                        <div className={cx('experience-info')}>
                            <div className={cx('date-wrapper')}>
                                <FontAwesomeIcon className={cx('date-icon')} icon={faCalendar}></FontAwesomeIcon>
                                <div className={cx('date-info')}>
                                    <span>{formatDate(experienceData?.start_date) || "Chưa xác định"} - {formatDate(experienceData?.end_date) || "Chưa xác định"} </span>
                                </div>
                            </div>
                            <div className={cx('exp-info')}>
                                <span>{experienceData?.job_name}</span>
                            </div>
                            <div className={cx('comp-info')}>
                                <span>{experienceData?.company_name}</span>
                            </div>
                        </div>
                        {
                            type !== "view" && (
                            <div className={cx('action-buttons-wrapper')}>
                                <button className={cx('delete-button-wrapper')} onClick={handleDeleteItem}>
                                    <FontAwesomeIcon icon={faTrash} className={cx('update-icon')}></FontAwesomeIcon>
                                </button>
                                <ExperienceModal data={experienceData} type="update" onSubmitModal={handleSubmitModal}></ExperienceModal>
                            </div>
                            )
                        }
                    </div>
                    <div className={cx('description-wrapper')}>
                        <div className={cx('description')}>
                            <span>
                                {experienceData?.description}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExperienceItem;
