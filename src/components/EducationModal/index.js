import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './EducationModal.module.scss';
import Button from "../Button";
import useAccount from "../../hook/useAccount";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import useEducationDetail from "../../hook/useEducationDetail";

const cx = classNames.bind(styles);

export default function EducationModal({children , data, onSubmitModal, type}) {
  const [modal, setModal] = useState(false);
  const [educationDetailLoading, educationDetailHook, getEduDetailByResume, addEduDetail, updateEduDetail, deleteEduDetail] = useEducationDetail();

  const [resume_id, setResumeID] = useState(data?.resume_id || '');
  const [degree_name, setDegreeName] = useState(data?.degree_name || '');
  const [training_place_name, setTrainingPlaceName] = useState(data?.training_place_name || '');
  const [major, setMajor] = useState(data?.major || '');
  const [start_date, setStartDate] = useState(data?.start_date || null);
  const [completed_date, setCompletedDate] = useState(data?.completed_date || null);
  const [description, setDescription] = useState(data?.description || '');
  const [eduDetailID, setEduDetailID] = useState('');

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(()=>{
    if (type === "update") {
      setResumeID(data?.resume_id || '');
      setDegreeName(data?.degree_name || '');
      setTrainingPlaceName(data?.training_place_name || '');
      setMajor(data?.major || '');
      setStartDate(formatToDateInputValue(data?.start_date));
      setCompletedDate(formatToDateInputValue(data?.completed_date));
      setDescription(data?.description || '')
      setEduDetailID(data?._id)
    } else if (type === "add") {
      setResumeID(data?.resume_id || '');
    }
  },[data]);

  function formatToDateInputValue(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }



  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value); // yyyy-MM-dd
  };

  const handleCompletedDateChange = (e) => {
    setCompletedDate(e.target.value); // yyyy-MM-dd
  };


  const handleSubmitModal = async() => {
      if (type === "add") {
        if (!degree_name) {
          alert("Bạn chưa nhập tên bằng cấp");
          return;
        } else if (!training_place_name) {
          alert("Bạn chưa nhập nơi đào tạo");
          return;
        } else if (!major) {
          alert("Bạn chưa chọn chuyên ngành đào tạo");
          return;
        } else if (!start_date) {
          alert("Bạn chưa chọn ngày bắt đầu");
          return;
        } else if (!completed_date) {
          alert("Bạn chưa chọn ngày hoàn thành");
          return;
        } else {
          const newEduDetail = await addEduDetail(resume_id, degree_name, major, training_place_name, start_date, completed_date, description);
          setResumeID('');
          setDegreeName('');
          setTrainingPlaceName('');
          setMajor('');
          setStartDate(null);
          setCompletedDate(null);
          setDescription('')
          onSubmitModal(newEduDetail);
        }
      } else if (type === "update") {
        if (!degree_name) {
          alert("Bạn chưa nhập tên bằng cấp");
          return;
        } else if (!training_place_name) {
          alert("Bạn chưa nhập nơi đào tạo");
          return;
        } else if (!major) {
          alert("Bạn chưa chọn chuyên ngành đào tạo");
          return;
        } else if (!start_date) {
          alert("Bạn chưa chọn ngày bắt đầu");
          return;
        } else if (!completed_date) {
          alert("Bạn chưa chọn ngày hoàn thành");
          return;
        } else {
          const newExpDetail = await updateEduDetail(eduDetailID, resume_id, degree_name, major, training_place_name, start_date, completed_date, description);
          console.log(newExpDetail);
          onSubmitModal(newExpDetail);
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
                            <span>Tên bằng cấp</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập tên bằng cấp' value={degree_name} onChange={(e)=>{setDegreeName(e.target.value)}}></input>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Ngày bắt đầu</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                        <input 
                            type="date" 
                            className={cx('field-input')} 
                            value={start_date || ''} 
                            onChange={handleStartDateChange}
                        />
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Chuyên ngành đào tạo</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập chuyên ngành đào tạo' value={major} onChange={(e)=>{setMajor(e.target.value)}}></input>
                        </div>
                    </div>
                  </div>
                  <div className={cx('four-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Nơi đào tạo</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập nơi đào tạo' value={training_place_name} onChange={(e)=>{setTrainingPlaceName(e.target.value)}}></input>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Ngày hoàn thành đào tạo</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                        <input 
                            type="date" 
                            className={cx('field-input')} 
                            value={completed_date || ''} 
                            onChange={handleCompletedDateChange}
                        />
                        </div>
                    </div>
                  </div>
                </div>
                <div className={cx('career-field-container')}>
                    <div className={cx('field-container-two')}>
                        <div className={cx('field-name')}>
                            <span>Mô tả</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <textarea className={cx('field-text-area')} placeholder='Nhập mô tả' value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
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
