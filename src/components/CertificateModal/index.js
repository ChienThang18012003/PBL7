import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './CertificateModal.module.scss';
import Button from "../Button";
import useAccount from "../../hook/useAccount";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import useCertificate from "../../hook/useCertificate";

const cx = classNames.bind(styles);

export default function CertificateModal({children , data, onSubmitModal, type, userInfo}) {
  const [modal, setModal] = useState(false);
  const [certificateLoading, certificateHook, getCertificateByResume, addCertificate, updateCertificate, deleteCertificate] = useCertificate();

  const [resume_id, setResumeID] = useState(data?.resume_id || '');
  const [name, setName] = useState(data?.name || '');
  const [training_place, setTrainingPlace] = useState(data?.training_place || '');
  const [start_date, setStartDate] = useState(data?.start_date || null);
  const [expiration_date, setExpirationDate] = useState(data?.expiration_date || null);
  const [description, setDescription] = useState(data?.description || '');
  const [cerDetailID, setCerDetailID] = useState('');

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(()=>{
    if (type === "update") {
      setResumeID(data?.resume_id || '');
      setName(data?.name || '');
      setTrainingPlace(data?.training_place || '');
      setStartDate(formatToDateInputValue(data?.start_date));
      setExpirationDate(formatToDateInputValue(data?.expiration_date));
      setDescription(data?.description || '')
      setCerDetailID(data?._id)
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

  const handleExpirationDateChange = (e) => {
    setExpirationDate(e.target.value); // yyyy-MM-dd
  };


  const handleSubmitModal = async() => {
      if (type === "add") {
        if (!name) {
          alert("Bạn chưa nhập tên chứng chỉ");
          return;
        } else if (!training_place) {
          alert("Bạn chưa nhập nơi đào tạo");
          return;
        } else if (!start_date) {
          alert("Bạn chưa chọn ngày bắt đầu");
          return;
        } else if (!expiration_date) {
          alert("Bạn chưa chọn ngày hết hạn");
          return;
        } else {
          const newCerDetail = await addCertificate(resume_id, name, training_place, start_date, expiration_date, description);
          setResumeID('');
          setName('');
          setTrainingPlace('');
          setStartDate(null);
          setExpirationDate(null);
          setDescription('')
          setCerDetailID('')
          onSubmitModal(newCerDetail);
        }
      } else if (type === "update") {
        if (!name) {
          alert("Bạn chưa nhập tên chứng chỉ");
          return;
        } else if (!training_place) {
          alert("Bạn chưa nhập nơi đào tạo");
          return;
        } else if (!start_date) {
          alert("Bạn chưa chọn ngày bắt đầu");
          return;
        } else if (!expiration_date) {
          alert("Bạn chưa chọn ngày hết hạn");
          return;
        } else {
          const newCerDetail = await updateCertificate(cerDetailID, resume_id, name, training_place, start_date, expiration_date, description);
          onSubmitModal(newCerDetail);
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
                            <span>Tên chứng chỉ</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập tên chứng chỉ' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
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
                  </div>
                  <div className={cx('four-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Nơi đào tạo</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập nơi đào tạo' value={training_place} onChange={(e)=>{setTrainingPlace(e.target.value)}}></input>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Ngày hết hạn</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                        <input 
                            type="date" 
                            className={cx('field-input')} 
                            value={expiration_date || ''} 
                            onChange={handleExpirationDateChange}
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
