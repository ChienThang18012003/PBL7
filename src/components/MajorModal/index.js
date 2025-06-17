import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './MajorModal.module.scss';
import Button from "../Button";
import useAccount from "../../hook/useAccount";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import useAdvanceSkill from "../../hook/useAdvanceSkill";

const cx = classNames.bind(styles);

export default function MajorModal({children , data, onSubmitModal, type, userInfo}) {
  const [modal, setModal] = useState(false);
  const [advanceSkillLoading, advanceSkillHook, getAdvanceSkillByResume, addAdvanceSkill, updateAdvanceSkill, deleteAdvanceSkill] = useAdvanceSkill();

  const [resume_id, setResumeID] = useState(data?.resume_id || '');
  const [name, setName] = useState(data?.name || '');
  const [level, setLevel] = useState(data?.level || null);
  const [majorDetailID, setMajorDetailID] = useState('');

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(()=>{
    if (type === "update") {
      setResumeID(data?.resume_id || '');
      setName(data?.name || '');
      setLevel(data?.level || null);
      setMajorDetailID(data?._id)
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
        if (!name) {
          alert("Bạn chưa nhập kỹ năng");
          return;
        } else if (!level) {
          alert("Bạn chưa chọn trình độ");
          return;
        } else {
          const newMajor = await addAdvanceSkill(resume_id, name, level);
          setResumeID('');
          setName('');
          setLevel(null);
          setMajorDetailID('')
          onSubmitModal(newMajor);
        }
      } else if (type === "update") {
        if (!name) {
          alert("Bạn chưa nhập kỹ năng");
          return;
        } else if (!level) {
          alert("Bạn chưa chọn trình độ");
          return;
        } else {
          const newMajor = await updateAdvanceSkill(majorDetailID, resume_id, name, level);
          onSubmitModal(newMajor);
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
                            <span>Kỹ năng</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập kỹ năng' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
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
