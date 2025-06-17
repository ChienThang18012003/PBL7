import classNames from 'classnames/bind';
import styles from './LanguageItem.module.scss';
import { faHeart as faHeartSolid, faStar, faTrash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import useLanguageSkill from '../../hook/useLanguageSkill';
import LanguageModal from '../LanguageModal';

const cx = classNames.bind(styles);

function LanguageItem({ data, children, onDeleteLanguage, type="confirm" }) {

    const [languageData, setLanguageData] = useState({});
    const [languageSkillLoading, languageSkillHook, getLanguageSkillByResume, addLanguageSkill, updateLanguageSkill, deleteLanguageSkill] = useLanguageSkill();

    useEffect(()=>{
        setLanguageData(data);
    },[data])

    const handleSubmitModal = (returnObject) => {
        setLanguageData(returnObject);
    }

    const handleDeleteItem = async() => {
        const deletedLang = await deleteLanguageSkill(data?._id);
        onDeleteLanguage({id: languageData?._id});
    }


    return (
        <div className={cx('wrapper')}>
            <div className={cx('language')}>
                <span>{languageData?.language}</span>
            </div>
            <div className={cx('level-wrapper')}>
                {[...Array(5)].map((star, index) => {
                    const currentRate = index + 1;
                    return(
                        <>
                            <label>
                                <FontAwesomeIcon className={cx('level-icon')} color={currentRate <= (Number(languageData?.level)) ? "yellow" : "gray"} icon={faStar}></FontAwesomeIcon>
                            </label>
                        </>
                    )
                })}
            </div>
            {
                type!=="view" && (
                    <div className={cx('action-buttons-wrapper')}>
                        <LanguageModal data={languageData} type="update" onSubmitModal={handleSubmitModal}></LanguageModal>
                        <button className={cx('delete-button-wrapper')} onClick={handleDeleteItem}>
                            <FontAwesomeIcon icon={faTrash} className={cx('update-icon')}></FontAwesomeIcon>
                        </button>
                    </div>
                )
            }
        </div>
    );
}

export default LanguageItem;
