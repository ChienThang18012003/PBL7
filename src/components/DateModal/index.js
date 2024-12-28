import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './DateModal.module.scss';
import Button from "../Button";
import useAccount from "../../hook/useAccount";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPen } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

export default function DateModal({children , disabled = false, data = [], onAddActiveHour, onUpdateActiveHour, type = "add", hourData = ""}) {
  const [modal, setModal] = useState(false);
  const [
    checkLogin, 
    signUp, 
    loadingAccount, 
    doctorsHook, 
    getAccountByID, 
    filterDoctorList, 
    getAccountByEmail, 
    checkAccountType, 
    uploadProof, 
    changePassword, 
    getDoctorActiveList, 
    addDoctorActiveHour, 
    changeAccountInfo, 
    changeDoctorInfo, 
    searchDoctor, 
    forgotPassword, 
    getDoctorList, 
    deleteDoctorActiveHour, 
    updateDoctorActiveHour
    ] = useAccount();
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [appointmentLimit, setAppointmentLimit] = useState('');
  const [startTimeValue, setStartTimeValue] = useState(null);
  const [endTimeValue, setEndTimeValue] = useState(null);

  const [isDisabled, setIsDisabled] = useState(false);
  const [originalStartTime, setOriginalStartTime] = useState('');
  const [originalEndTime, setOriginalEndTime] = useState('');
  const [originalDate, setOriginalDate] = useState('');
  const [originalAppointmentLimit, setOriginalAppointmentLimit] = useState('');
  const [hourType, setHourType] = useState('appointment');

  const toggleModal = () => {
    if (disabled) return;
    setModal(!modal);
  };

  useEffect(() => {
    if (type === "update" && hourData) {
      const parts = hourData.split(" ");
        const day = parts[0];
        const start_time = parts[1];
        const end_time = parts[2];
        const appointment_limit = parts[4];
        const hour_type = parts[5];
  
        setSelectedDate(day);
        setStartTime(start_time);
        setEndTime(end_time);
        setAppointmentLimit(appointment_limit);
        setHourType(hour_type);
        setOriginalDate(day);
        setOriginalStartTime(start_time);
        setOriginalEndTime(end_time);
        setOriginalAppointmentLimit(appointment_limit);

  
        const startTimeObj = new Date();
        const [startHours, startMinutes] = start_time.split(":").map(Number);
        startTimeObj.setHours(startHours, startMinutes, 0);
        setStartTimeValue(startTimeObj);
  
        const endTimeObj = new Date();
        const [endHours, endMinutes] = end_time.split(":").map(Number);
        endTimeObj.setHours(endHours, endMinutes, 0);
        setEndTimeValue(endTimeObj);
    }
  }, [type, hourData]);

  useEffect(() => {
    if (type === "update") {
      if (selectedDate === originalDate) {
        setIsDisabled(true);
      }
      else {
        setIsDisabled(false);
      }
    }
  },[selectedDate]);

  useEffect(() => {
    if (type === "update") {
      if (startTime === originalStartTime) {
        setIsDisabled(true);
      }
      else {
        setIsDisabled(false);
      }
    }
  },[startTime]);

  useEffect(() => {
    if (type === "update") {
      if (endTime === originalEndTime) {
        setIsDisabled(true);
      }
      else {
        setIsDisabled(false);
      }
    }
  },[endTime]);

  useEffect(() => {
    if (type === "update") {
      if (appointmentLimit === originalAppointmentLimit) {
        setIsDisabled(true);
      }
      else {
        setIsDisabled(false);
      }
    }
  },[appointmentLimit]);

  const generateActiveHourObject = (day, startTime, endTime, appointmentLimit) => {
      return {
        day : day,
        start_time: startTime,
        end_time: endTime,
        appointment_limit: appointmentLimit
      }
  }
  
  const handleStartTimeChange = (newDateTime) => {
     setStartTimeValue(newDateTime);
     if (newDateTime) {
      const formattedTime = newDateTime.format("HH:mm"); 
      setStartTime(formattedTime); 
     }
     else{
      setStartTime('');
     }
  }

  const handleEndTimeChange = (newDateTime) => {
    setEndTimeValue(newDateTime);
    if (newDateTime) {
     const formattedTime = newDateTime.format("HH:mm"); 
     setEndTime(formattedTime); 
    }
    
 }

 const handleSubmitActiveHour = async () => {

  if (!selectedDate) {
    alert("Vui lòng chọn thứ!");
    return;
  }

  if (!startTime) {
    alert("Vui lòng chọn thời gian bắt đầu!");
    return;
  }

  if (!endTime) {
    alert("Vui lòng chọn thời gian kết thúc!");
    return;
  }

  const limit = Number(appointmentLimit);
  if (isNaN(limit) || limit <= 0) {
    alert("Giới hạn số lượng phải lớn hơn 0");
    return;
  }


  if (startTimeValue >= endTimeValue) {
    alert("Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc");
    return;
  }

  const newActiveHour = await addDoctorActiveHour(
    data?._id,
    selectedDate,
    startTime,
    endTime,
    "appointment",
    appointmentLimit
  );

  if (newActiveHour && typeof newActiveHour === 'object') {
    onAddActiveHour(newActiveHour);
    setModal(!modal);
    setStartTime('');
    setEndTime('');
    setAppointmentLimit('');
    setStartTimeValue(null);
    setEndTimeValue(null);
    setSelectedDate('');
    alert("Thêm giờ làm việc thành công!");
  } else if (newActiveHour && typeof newActiveHour !== 'object') {
    alert(newActiveHour);
  } else {
    alert("Có lỗi xảy ra, vui lòng thử lại sau!");
  }
}

  const handleUpdateActiveHour = async() => {
    if (!selectedDate) {
      alert("Vui lòng chọn thứ!");
      return;
    }
  
    if (!startTime) {
      alert("Vui lòng chọn thời gian bắt đầu!");
      return;
    }
  
    if (!endTime) {
      alert("Vui lòng chọn thời gian kết thúc!");
      return;
    }
  
    const limit = Number(appointmentLimit);
    if (isNaN(limit) || limit <= 0) {
      alert("Giới hạn số lượng phải lớn hơn 0");
      return;
    }
  
  
    if (startTimeValue >= endTimeValue) {
      alert("Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc");
      return;
    }
    
    const userConfirmed = window.confirm("Bạn có chắc chắn muốn chỉnh sửa giờ làm việc này không?");
    if (userConfirmed) {
      const editedActiveHour = await updateDoctorActiveHour(
        data?._id, 
        selectedDate, 
        startTime, 
        endTime, 
        hourType, 
        appointmentLimit, 
        originalDate, 
        originalStartTime, 
        originalEndTime, 
        hourType);
  
      if (editedActiveHour && typeof editedActiveHour === 'object') {
        alert("Cập nhật giờ làm việc thành công!");
        const newActiveHour = generateActiveHourObject(selectedDate, startTime, endTime, appointmentLimit);
        const oldActiveHour = generateActiveHourObject(originalDate, originalStartTime, originalEndTime, originalAppointmentLimit);
        setOriginalDate(selectedDate);
        setOriginalStartTime(startTime);
        setOriginalEndTime(endTime);
        setOriginalAppointmentLimit(appointmentLimit);
        setIsDisabled(true);
        onUpdateActiveHour(newActiveHour, oldActiveHour);
        return;
      }
      else if (editedActiveHour && typeof editedActiveHour !== 'object') {
        alert(editedActiveHour);
        return;
      }
      else {
        alert("Có lỗi xảy ra, vui lòng thử lại sau!");
        return;
      }
    }
  }


  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      {
        type === "add" ? (
          <Button type="button" disabled={disabled} primary onClick={toggleModal} leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}>
            {children}
          </Button>
        ) : (
          <Button type="button" disabled={disabled} primary onClick={toggleModal} leftIcon={<FontAwesomeIcon icon={faPen} />}>
            {children}
          </Button>
        )
      }
      

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
                      <option value=''>Chọn thứ</option>
                      <option value='Monday'>Monday</option>
                      <option value='Tuesday'>Tuesday</option>
                      <option value='Wednesday'>Wednesday</option>
                      <option value='Thursday'>Thursday</option>
                      <option value='Friday'>Friday</option>
                      <option value='Saturday'>Saturday</option>
                      <option value='Sunday'>Sunday</option>
                    </select>
                </div>
                <div className={cx('field-container')}>
                    <div className={cx('field-name')}>
                        <span>Nhập thời gian bắt đầu</span>
                    </div>
                    <DatePicker
                      disableDayPicker
                      value={startTimeValue}
                      onChange={handleStartTimeChange}
                      format="HH:mm"
                      plugins={[<TimePicker position="bottom" hideSeconds={true} hideAMPM={true} />]}
                      style={{
                        width: '100%',
                        height: '36px',
                        borderRadius: '10px',
                        marginBottom: '10px',
                      }}
                    >
                    </DatePicker>
                </div>
                <div className={cx('field-container')}>
                    <div className={cx('field-name')}>
                        <span>Nhập thời gian kết thúc</span>
                    </div>
                    <DatePicker
                      disableDayPicker
                      value={endTimeValue}
                      onChange={handleEndTimeChange}
                      format="HH:mm"
                      plugins={[<TimePicker position="bottom" hideSeconds={true} hideAMPM={true} />]}
                      style={{
                        width: '100%',
                        height: '36px',
                        borderRadius: '10px',
                        marginBottom: '10px',
                      }}
                    >
                    </DatePicker>
                </div>
                <div className={cx('field-container')}>
                    <div className={cx('field-name')}>
                        <span>Nhập giới hạn số lượng</span>
                    </div>
                    <input type="number" className={cx('field-input')} value={appointmentLimit} onChange={(e)=>{setAppointmentLimit(e.target.value)}}></input>
                </div>
                {
                  type === "add" ? (
                    <Button submitTwo onClick={handleSubmitActiveHour}>
                      Thêm giờ khám
                    </Button>
                  ) : (
                    <Button submitTwo onClick={handleUpdateActiveHour} disabled={isDisabled}>
                      Sửa giờ khám
                    </Button>
                  )
                }
                
            </div>
          </div>
        </div>
      )}
    </>
  );
}
