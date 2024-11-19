import React, { useState } from "react";
import classNames from 'classnames/bind';
import styles from './ListModal.module.scss';
import Button from "../Button";
import useAccount from "../../hook/useAccount";
import AppointmentInfo from "../AppointmentInfo";

const cx = classNames.bind(styles);

export default function ListModal({children , disabled = false, data}) {
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
      <Button rounded type="button" primary onClick={toggleModal} >
        {children}
      </Button>

      {modal && (
        <div className={cx('modal')}>
          <div onClick={toggleModal} className={cx('overlay')}></div>
          <div className={cx('modal-content')}>
            <div className={cx('modal-field-container')}>
                 {
                  data.map( (appointment) => (
                    <AppointmentInfo data={appointment}></AppointmentInfo>
                  ))
                 }
            </div>
          </div>
        </div>
      )}
    </>
  );
}
