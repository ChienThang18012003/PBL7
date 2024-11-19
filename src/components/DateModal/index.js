import React, { useState } from "react";
import classNames from 'classnames/bind';
import styles from './DateModal.module.scss';
import Button from "../Button";
import useAccount from "../../hook/useAccount";

const cx = classNames.bind(styles);

export default function DateModal({children , disabled = false, data}) {
  const [modal, setModal] = useState(false);
  const [checkLogin, signUp, loadingAccount, doctorsHook, getAccountByID, filterDoctorList, getAccountByEmail, checkAccountType, uploadProof, changePassword, getDoctorActiveList, addDoctorActiveHour] = useAccount();
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const toggleModal = () => {
    if (disabled) return;
    setModal(!modal);
  };

  const handleSubmitActiveHour = async() => {
      await addDoctorActiveHour(data._id, selectedDate, startTime, endTime, "working");
      setModal(!modal);
  }

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <Button type="button" primary onClick={toggleModal} >
        {children}
      </Button>

      {modal && (
        <div className={cx('modal')}>
          <div onClick={toggleModal} className={cx('overlay')}></div>
          <div className={cx('modal-content')}>
            <div className={cx('modal-field-container')}>
                <div className={cx('field-container')}>
                    <div className={cx('field-name')}>
                        <span>Chọn thứ</span>
                    </div>
                    <select className={cx('field-input')} value={selectedDate} onChange={(e)=>{setSelectedDate(e.target.value)}}>
                      <option value='Monday'>Monday</option>
                      <option value='Tuesday'>Tuesday</option>
                      <option value='Wednesday'>Wednesday</option>
                      <option value='Thurday'>Thurday</option>
                      <option value='Friday'>Friday</option>
                      <option value='Saturday'>Saturday</option>
                      <option value='Sunday'>Sunday</option>
                    </select>
                </div>
                <div className={cx('field-container')}>
                    <div className={cx('field-name')}>
                        <span>Nhập thời gian bắt đầu</span>
                    </div>
                    <input className={cx('field-input')} value={startTime} onChange={(e)=>{setStartTime(e.target.value)}}></input>
                </div>
                <div className={cx('field-container')}>
                    <div className={cx('field-name')}>
                        <span>Nhập thời gian kết thúc</span>
                    </div>
                    <input className={cx('field-input')} value={endTime} onChange={(e)=>{setEndTime(e.target.value)}}></input>
                </div>
                <Button submitTwo onClick={handleSubmitActiveHour}>
                  Thêm giờ khám
                </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
