import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './LanguageModal.module.scss';
import Button from "../Button";
import useAccount from "../../hook/useAccount";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import useLanguageSkill from "../../hook/useLanguageSkill";

const cx = classNames.bind(styles);

export default function LanguageModal({children , data, onSubmitModal, type, userInfo}) {
  const [modal, setModal] = useState(false);
  const [languageSkillLoading, languageSkillHook, getLanguageSkillByResume, addLanguageSkill, updateLanguageSkill, deleteLanguageSkill] = useLanguageSkill();

  const [resume_id, setResumeID] = useState(data?.resume_id || '');
  const [language, setLanguage] = useState(data?.language || '');
  const [level, setLevel] = useState(data?.level || null);
  const [langDetailID, setLangDetailID] = useState('');

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(()=>{
    if (type === "update") {
      setResumeID(data?.resume_id || '');
      setLanguage(data?.language || '');
      setLevel(data?.level || null);
      setLangDetailID(data?._id)
    } else if (type === "add") {
      setResumeID(data?.resume_id || '');
    }
  },[data]);

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleSubmitModal = async() => {
      if (type === "add") {
        if (!language) {
          alert("Bạn chưa chọn ngôn ngữ");
          return;
        } else if (!level) {
          alert("Bạn chưa chọn trình độ");
          return;
        } else {
          const newLanguage = await addLanguageSkill(resume_id, language, level);
          setResumeID('');
          setLanguage('');
          setLevel(null);
          setLangDetailID('')
          onSubmitModal(newLanguage);
        }
      } else if (type === "update") {
        if (!language) {
          alert("Bạn chưa chọn ngôn ngữ");
          return;
        } else if (!level) {
          alert("Bạn chưa chọn trình độ");
          return;
        } else {
          const newLanguage = await updateLanguageSkill(langDetailID, resume_id, language, level);
          onSubmitModal(newLanguage);
        }
      }
      setModal(false);
  }

  return (
    <>
      {
        (type === "add") ? (
          <button className={cx('update-button-wrapper')} onClick={toggleModal}>
            <FontAwesomeIcon icon={faPlus} className={cx('update-icon')}></FontAwesomeIcon>
          </button>
        ) : (
          <button className={cx('update-button-wrapper-two')} onClick={toggleModal}>
            <FontAwesomeIcon icon={faPen} className={cx('update-icon-two')}></FontAwesomeIcon>
          </button>
        )
      }

      {modal && (
        <div className={cx('modal')}>
          <div onClick={toggleModal} className={cx('overlay')}></div>
          <div className={cx('modal-content')}>
            <div className={cx('modal-field-container')}>
                <div className={cx('eight-field-container')}>
                  <div className={cx('four-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Ngôn ngữ</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập ngôn ngữ' value={language} onChange={(e)=>{setLanguage(e.target.value)}}></input>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Trình độ</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          {[...Array(5)].map((star, index) => {
                              const currentRate = index + 1;
                              return(
                                  <>
                                      <label>
                                          <input type="radio" className={cx('star-radio')} name="rate" value={currentRate} onClick={()=>{setLevel(currentRate)}}></input>
                                          <FontAwesomeIcon className={cx('level-icon')} color={currentRate <= (Number(level)) ? "yellow" : "gray"} icon={faStar}></FontAwesomeIcon>
                                      </label>
                                  </>
                              )
                          })}
                        </div>
                    </div>
                  </div>
                </div>
                <Button primary onClick={handleSubmitModal}>
                  Xác nhận
                </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
