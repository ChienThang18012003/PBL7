import classNames from 'classnames/bind';
import styles from './EducationItem.module.scss';
import { faCalendar, faHeart as faHeartSolid, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import useEducationDetail from '../../hook/useEducationDetail';
import EducationModal from '../EducationModal';

const cx = classNames.bind(styles);

function EducationItem({ data, children, onDeleteEducation, type="confirm" }) {
    
    const [educationData, setEducationData] = useState({});
    const [educationDetailLoading, educationDetailHook, getEduDetailByResume, addEduDetail, updateEduDetail, deleteEduDetail] = useEducationDetail();

    useEffect(()=>{
        setEducationData(data);
    },[data])

    const handleSubmitModal = (returnObject) => {
        setEducationData(returnObject);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleDeleteItem = async() => {
        const deletedEdu = await deleteEduDetail(data?._id);
        onDeleteEducation({id: educationData?._id});
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
                                    <span>{formatDate(educationData?.start_date) || "Chưa xác định"} - {formatDate(educationData?.completed_date) || "Chưa xác định"}</span>
                                </div>
                            </div>
                            <div className={cx('exp-info')}>
                                <span>{educationData?.degree_name}</span>
                            </div>
                            <div className={cx('comp-info')}>
                                <span>{educationData?.training_place_name}</span>
                            </div>
                            <div className={cx('major-info')}>
                                <span>{educationData?.major}</span>
                            </div>
                        </div>
                        {
                            type!=="view" && (
                                <div className={cx('action-buttons-wrapper')}>
                                    <button className={cx('delete-button-wrapper')} onClick={handleDeleteItem}>
                                        <FontAwesomeIcon icon={faTrash} className={cx('update-icon')}></FontAwesomeIcon>
                                    </button>
                                    <EducationModal data={educationData} type="update" onSubmitModal={handleSubmitModal}></EducationModal>
                                </div>
                            )
                        }
                    </div>
                    <div className={cx('description-wrapper')}>
                        <div className={cx('description')}>
                            <span>
                                {educationData?.description}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EducationItem;
