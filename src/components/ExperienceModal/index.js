import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './ExperienceModal.module.scss';
import Button from "../Button";
import useAccount from "../../hook/useAccount";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import useExperienceDetail from "../../hook/useExperienceDetail";

const cx = classNames.bind(styles);

export default function ExperienceModal({children , data, onSubmitModal, type, userInfo}) {
  const [modal, setModal] = useState(false);
  const [experienceDetailLoading, experienceDetailHook, getExpDetailByResume, addExpDetail, updateExpDetail, deleteExpDetail] = useExperienceDetail();

  const [resume_id, setResumeID] = useState(data?.resume_id || '');
  const [job_name, setJobName] = useState(data?.job_name || '');
  const [company_name, setCompanyName] = useState(data?.company_name || '');
  const [start_date, setStartDate] = useState(data?.start_date || null);
  const [end_date, setEndDate] = useState(data?.end_date || null);
  const [description, setDescription] = useState(data?.description || '');
  const [expDetailID, setExpDetailID] = useState('');

  const toggleModal = () => {
    setModal(!modal);
  };

  const createExperienceObject = () => {

        return {
            resume_id,
            job_name,
            company_name,
            start_date,
            end_date,
            description
        };
    };

  useEffect(()=>{
    if (type === "update") {
      setResumeID(data?.resume_id || '');
      setCompanyName(data?.company_name || '');
      setJobName(data?.job_name || '');
      setStartDate(formatToDateInputValue(data?.start_date));
      setEndDate(formatToDateInputValue(data?.end_date));
      setDescription(data?.description || '')
      setExpDetailID(data?._id)
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

  const splitTwoPartString = (str) => {
      const index = str.indexOf(' ');
      if (index === -1) {
          return { first: str, second: '' }; // hoặc null tùy yêu cầu
      }
      const first = str.slice(0, index).trim();
      const second = str.slice(index + 1).trim();
      return { first, second };
  };

  function toDateInputFormat(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  const handleStartDateChange = (e) => {
    setStartDate(e.target.value); // yyyy-MM-dd
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value); // yyyy-MM-dd
  };


  const handleSubmitModal = async() => {
      if (type === "add") {
        if (!job_name) {
          alert("Bạn chưa nhập tên công việc");
          return;
        } else if (!company_name) {
          alert("Bạn chưa nhập tên công ty");
          return;
        } else if (!start_date) {
          alert("Bạn chưa chọn ngày bắt đầu");
          return;
        } else if (!end_date) {
          alert("Bạn chưa chọn ngày kết thúc");
          return;
        } else {
          const newExpDetail = await addExpDetail(resume_id, job_name, company_name, start_date, end_date, description);
          setResumeID('');
          setCompanyName('');
          setJobName('');
          setStartDate(null);
          setEndDate(null);
          setDescription('')
          setExpDetailID('')
          onSubmitModal(newExpDetail);
        }
      } else if (type === "update") {
        if (!job_name) {
          alert("Bạn chưa nhập tên công việc");
          return;
        } else if (!company_name) {
          alert("Bạn chưa nhập tên công ty");
          return;
        } else if (!start_date) {
          alert("Bạn chưa chọn ngày bắt đầu");
          return;
        } else if (!end_date) {
          alert("Bạn chưa chọn ngày kết thúc");
          return;
        } else {
          const newExpDetail = await updateExpDetail(expDetailID, resume_id, job_name, company_name, start_date, end_date, description);
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
                            <span>Tên công việc</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập tên công việc' value={job_name} onChange={(e)=>{setJobName(e.target.value)}}></input>
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
                            <span>Tên công ty</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập tên công ty' value={company_name} onChange={(e)=>{setCompanyName(e.target.value)}}></input>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Ngày kết thúc</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                        <input 
                            type="date" 
                            className={cx('field-input')} 
                            value={end_date || ''} 
                            onChange={handleEndDateChange}
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
