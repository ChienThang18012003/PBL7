import classNames from 'classnames/bind';
import styles from './MajorItem.module.scss';
import { faHeart as faHeartSolid, faStar, faTrash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import useAdvanceSkill from '../../hook/useAdvanceSkill';
import MajorModal from '../MajorModal';

const cx = classNames.bind(styles);

function MajorItem({ data, children, onDeleteteMajor, type="confirm" }) {

    const [majorData, setMajorData] = useState({});
    const [advanceSkillLoading, advanceSkillHook, getAdvanceSkillByResume, addAdvanceSkill, updateAdvanceSkill, deleteAdvanceSkill] = useAdvanceSkill();

    useEffect(()=>{
        setMajorData(data);
    },[data])

    const handleSubmitModal = (returnObject) => {
        setMajorData(returnObject);
    }

    const handleDeleteItem = async() => {
        const deletedMajor = await deleteAdvanceSkill(data?._id);
        onDeleteteMajor({id: majorData?._id});
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('language')}>
                <span>{majorData?.name}</span>
            </div>
            <div className={cx('level-wrapper')}>
                {[...Array(5)].map((star, index) => {
                    const currentRate = index + 1;
                    return(
                        <>
                            <label>
                                <FontAwesomeIcon className={cx('level-icon')} color={currentRate <= (Number(majorData?.level)) ? "yellow" : "gray"} icon={faStar}></FontAwesomeIcon>
                            </label>
                        </>
                    )
                })}
            </div>
            {
                type!=="view" && (
                    <div className={cx('action-buttons-wrapper')}>
                        <MajorModal data={majorData} type="update" onSubmitModal={handleSubmitModal}></MajorModal>
                        <button className={cx('delete-button-wrapper')} onClick={handleDeleteItem}>
                            <FontAwesomeIcon icon={faTrash} className={cx('update-icon')}></FontAwesomeIcon>
                        </button>
                    </div>
                )
            }
        </div>
    );
}

export default MajorItem;
