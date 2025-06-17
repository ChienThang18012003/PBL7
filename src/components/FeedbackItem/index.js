import classNames from 'classnames/bind';
import styles from './FeedbackItem.module.scss';
import { faHeart as faHeartSolid, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '../Image';
import { useState, useEffect } from 'react';
import { assets } from '../../assets/assets_fe/assets';
import FeedbackModal from '../FeedbackModal';
import useFeedback from '../../hook/useFeedback';

const cx = classNames.bind(styles);

function FeedbackItem({ data, children, type='update', onSubmitFeedBack, onDeleteFeedback}) {

    const [feedbackLoading, feedbackHook, getAllFeedback, getSpecificFeedback, addFeedback, changeFeedback, changeFeedbackStatus, deleteFeedback] = useFeedback();

    const handleDeleteFeedback = async() => {
        const deletedFeedback = await deleteFeedback(data?._id);
        if (deletedFeedback) onDeleteFeedback(deletedFeedback)
    }

    return (
        <div className={cx('wrapper')}>
            {
                (type==='update') && (
                    <div className={cx('company-button-wrapper')}>
                        <FeedbackModal data={data} type='update' onSubmitModal={onSubmitFeedBack}></FeedbackModal>
                        <button className={cx('delete-button-wrapper')} onClick={handleDeleteFeedback}>
                            <FontAwesomeIcon icon={faTrash} className={cx('update-icon')}></FontAwesomeIcon>
                        </button>
                    </div>
                )
            }
            <div className={cx('company-image-wrapper')}>
                <div className={cx('company-image-container')}>
                    <Image src={data?.user_id?.profile_image} fallback={assets.UserImage} className={cx('company-image')}></Image>
                </div>
            </div>
            <div className={cx('company-name-wrapper')}>
                <div className={cx('company-name')}>
                    <span>
                        {data?.user_id?.username || 'Chưa xác định'}
                    </span>
                </div>
            </div>
            <div className={cx('other-info')}>
                <div className={cx('job-details')}>
                    {[...Array(5)].map((star, index) => {
                        const currentRate = index + 1;
                        return(
                            <>
                                <label>
                                    <FontAwesomeIcon className={cx('level-icon')} color={currentRate <= (Number(data?.rating)) ? "yellow" : "gray"} icon={faStar}></FontAwesomeIcon>
                                </label>
                            </>
                        )
                    })}
                </div>
            </div>
            <div className={cx('feedback-wrapper')}>
                <span>{data?.content || 'Chưa xác định'}</span>
            </div>

        </div>
    );
}

export default FeedbackItem;
